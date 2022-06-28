import express from 'express';
import { Request, Response } from 'express';
import UserManager from '../database/user.db-queries';

const router = express.Router();

router.post('/add', async (req: Request, res: Response) => {
    const name = req.body.name;
    const user = await new UserManager().addUser(name);
    return res.send(user);
})

export { router };