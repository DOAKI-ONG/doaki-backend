import jsonwebtoken from 'jsonwebtoken';
import { Request, Response } from 'express';

export default class UserController {

    static loginUser(req: Request, res: Response) {
        const {email, password} = req.body;
        jsonwebtoken
        res.send('User logged in');
    }
    static registerUser(req: Request, res: Response) {
        // Logic for user registration
        res.send('User registered');
    }
}