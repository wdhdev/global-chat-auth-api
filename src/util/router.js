const { Router } = require("express");

const router = Router();
const routes = require("./routes");

router.get("/github", async (req, res) => {
    routes.github.index(req, res, client);
})

router.get("/github/callback", async (req, res) => {
    routes.github.callback(req, res);
})

module.exports = router;
