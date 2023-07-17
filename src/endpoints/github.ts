import { Request, Response } from "express";
import querystring from "node:querystring";

import AuthToken from "../models/AuthToken";

export default async (req: Request, res: Response) => {
    const user = req.query.user;
    const token = req.query.token;

    if(!user) return res.status(400).json({ message: "No user ID specified.", code: "NO_USER_ID" });
    if(!token) return res.status(400).json({ message: "No token specified.", code: "NO_TOKEN" });

    const tokenData = await AuthToken.findOne({ _id: token, user: user, service: "github" });

    if(!tokenData) return res.status(401).json({ message: "Invalid token specified.", code: "INVALID_TOKEN" });

    const params = querystring.stringify({
        client_id: process.env.github_client_id,
        redirect_uri: `https://gc-auth.wdh.gg/github/callback?user=${user}&token=${token}`,
        scope: "read:user user:email repo:invite"
    })

    res.redirect(`https://github.com/login/oauth/authorize?${params}`);
}
