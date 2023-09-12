import { Router, Request, Response } from "express";

const router = Router();
import routes from "./routes";

router.get("/github", async (req: Request, res: Response) => {
    routes.github.auth(req, res);
})

router.get("/github/callback", async (req: Request, res: Response) => {
    routes.github.callback(req, res);
})

router.get("/stats", async (req: Request, res: Response) => {
    routes.stats(req, res);
})

export default router;
