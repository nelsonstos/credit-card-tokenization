import { Request, Response } from 'express';
import CreditCardService from '../services/credit-card.service';
import { StatusCodes } from 'http-status-codes'
import { generateResponse } from '../utils/response.utils';

class CreditCardController {

    async createToken(req: Request, res: Response) {
        const creditCard = req.body;
        const token = await CreditCardService.createToken(creditCard);
        const response = generateResponse(StatusCodes.CREATED, { token }, "Credit Card tokenization successfully completed" );
        return res.status(StatusCodes.CREATED ).json(response);
    }

    async getToken(req: Request, res: Response) {
        const token = req.params.tokenId;
        const creditCard = await CreditCardService.getToken(token);
        const response = generateResponse(StatusCodes.OK, { creditCard }, "Credit Card decoded successfull" );
        return res.status(StatusCodes.OK).json(response);
    }
    
}

export default new CreditCardController