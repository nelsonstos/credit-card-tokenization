import {NextFunction, Request, Response } from 'express';
import 'dotenv/config';
import { StatusCodes } from 'http-status-codes';


export default (req: Request, res: Response, next: NextFunction) => {

    const apiKey = req.headers['x-api-key'];

    if (!apiKey || apiKey !== process.env.API_KEY) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Unauthorized' });
    }

    return next();

}