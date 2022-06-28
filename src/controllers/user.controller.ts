import express from 'express';
import { Request, Response } from 'express';
import UserManager from '../database/UserManager';

const router = express.Router();

const userManager = new UserManager();

router.post('/add', async (req: Request, res: Response) => {
    const name = req.body.name;
    const user = await userManager.addUser(name);
    return res.send(user);
})

export { router };