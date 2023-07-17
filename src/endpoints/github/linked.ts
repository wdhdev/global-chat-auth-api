import { Request, Response } from "express";

import GitHubUser from "../../models/GitHubUser";

export default async (req: Request, res: Response) => {
    const data = await GitHubUser.find();

    const users = [];

    for(const user of data) {
        users.push(user._id);
    }

    res.status(200).json(users);
}
