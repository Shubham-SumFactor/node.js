import express, { Request, Response, Router } from 'express';
import { userRegistration } from '../Controller/userController';
import { userlogin, refreshToken, getAllUser} from '../Controller/userController';
import { verifyToken } from '../util/service';

const router = Router();

// router.post('/registerUser', async (req: Request, res: Response) => { res.status(200).send(await userRegistration(req, res)) })

router.post('/registerUser', async (req: Request, res: Response) => {
    const { f_name, l_name, email, password} = req.body;

    if (!f_name || !l_name || !email || !password) {
        return res.status(400).send('Please fill in all fields.');
      }
         try {
        const result = await userRegistration(req, res);
        return res.status(200).send(result);
      } catch (error) {
        return res.status(500).send(' Error');
      }
    })

router.post('/userLogin', async (req: Request, res: Response) => { res.status(200).send(await userlogin(req, res)) })

router.get('/getAllUser', verifyToken, async (req: Request, res: Response) => { res.status(200).send(await getAllUser(req, res)) })

router.post('/refreshToken', async (req: Request, res: Response) => { res.status(200).send(await refreshToken(req, res)) })

router.get('/registerPage', async (req: Request, res: Response) => { res.render('register.ejs', { pageName: "Register User" }) })

export default router;