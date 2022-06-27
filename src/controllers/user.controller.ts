import express from 'express';
import { Request, Response } from 'express';
import { addUser } from '../shared/user.db-queries';

const router = express.Router();

router.post('/add', async (req: Request, res: Response) => {
    const name = req.body.name;
    const user = await addUser(name);
    return res.send(user);
})

export { router };