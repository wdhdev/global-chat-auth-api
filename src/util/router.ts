import { Router, Request, Response } from "express";

const router = Router();
import routes from "./routes";

router.get("/github", async (req: Request, res: Response) => {
    routes.github.index(req, res);
})

router.get("/github/callback", async (req: Request, res: Response) => {
    routes.github.callback(req, res);
})

router.get("/github/linked", async (req: Request, res: Response) => {
    routes.github.linked(req, res);
})

export default router;
