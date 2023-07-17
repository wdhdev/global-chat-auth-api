import { Request, Response } from "express";

import GitHubUser from "../models/GitHubUser";

export default async (req: Request, res: Response) => {
    const githubData = await GitHubUser.find();
    const githubUsers = [];

    for(const user of githubData) {
        githubUsers.push(user._id);
    }

    res.status(200).json({ github: githubUsers.length });
}
