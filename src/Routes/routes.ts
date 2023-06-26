import express, { Request, Response, Router } from 'express';
import { userRegistration } from '../Controller/userController';
import { userlogin } from '../Controller/userController';

const router = Router();

router.post('/registerUser', async (req: Request, res: Response) => { res.status(200).send(await userRegistration(req, res)) })

router.post('/userLogin', async (req: Request, res: Response) => { res.status(200).send(await userlogin(req, res)) })


export default router;