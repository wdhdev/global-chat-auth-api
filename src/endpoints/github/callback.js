const Sentry = require("@sentry/node");
const axios = require("axios");
const querystring = require("node:querystring");

const AuthToken = require("../../models/AuthToken");
const GitHubUser = require("../../models/GitHubUser");

module.exports = async (req, res) => {
    const code = req.query.code;
    const user = req.query.user;
    const token = req.query.token;

    if(!code) return res.status(400).json({ message: "No code specified.", code: "NO_CODE" });
    if(!user) return res.status(400).json({ message: "No user ID specified.", code: "NO_USER_ID" });
    if(!token) return res.status(400).json({ message: "No token specified.", code: "NO_TOKEN" });

    const tokenData = await AuthToken.findOne({ _id: token, user: user, service: "github" });

    if(!tokenData) return res.status(401).json({ message: "Invalid token specified.", code: "INVALID_TOKEN" });

    await tokenData.delete();

    const params = querystring.stringify({
        client_id: process.env.github_client_id,
        client_secret: process.env.github_client_secret,
        code: code,
        redirect_uri: `https://gc-auth.wdh.gg/github/callback?user=${user}&token=${token}`
    })

    try {
        const { data } = await axios.post("https://github.com/login/oauth/access_token", params, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })

        const accessToken = data.access_token;

        const { data: userData } = await axios.get("https://api.github.com/user", {
            headers: {
                Authorization: `token ${accessToken}`
            }
        })

        const { data: emailData } = await axios.get("https://api.github.com/user/emails", {
            headers: {
                Authorization: `token ${accessToken}`
            }
        })

        let userEmail = "";

        emailData.forEach(e => {
            if(e.primary) userEmail = e.email;
        })

        if(await GitHubUser.exists({ _id: user })) {
            await GitHubUser.findOneAndUpdate({ _id: user }, {
                id: userData.id,
                avatar_url: userData.avatar_url,
                username: userData.login,
                email: userEmail,
                token: accessToken,
                linked: Date.now(),
                lastUpdated: Date.now()
            })
        } else {
            new GitHubUser({
                _id: user,
                id: userData.id,
                avatar_url: userData.avatar_url,
                username: userData.login,
                email: userEmail,
                token: accessToken,
                linked: Date.now(),
                lastUpdated: Date.now()
            }).save()
        }

        res.render("github/success");
    } catch(err) {
        Sentry.captureException(err);
        console.error(err);

        res.render("github/error");
    }
}
