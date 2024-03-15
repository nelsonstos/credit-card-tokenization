import 'dotenv/config';
import JwtUtils from "../utils/jwt.utils"
import creditCardRepository from "../repositories/credit-card.repository";
import CardUtils from '../utils/card.utils';


const jwt = new JwtUtils(String(process.env.JWT_SECRET));

class CreditCardService {

    async createToken(data:any) {
        try {
            const tokenId = jwt.generateUniqueId();
            const token = jwt.generateToken(data);
            await creditCardRepository.saveToken(tokenId, token);
            return tokenId;
        } catch (error) {
            return error;
        }
    }

    async getToken(tokenId:string) {
        try {
            const token = await creditCardRepository.getToken(tokenId);
            if(!token) {
              return null;
            }
            const decodeToken = jwt.verifyToken(token);

            // Remove CVV from coded data
            const cardDataWithoutCVV = CardUtils.removeCVV(decodeToken);

            return cardDataWithoutCVV; 
        } catch (error) {
            return error;
        }
    }

}

export default new CreditCardService



