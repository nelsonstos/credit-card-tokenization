import { Router } from 'express';
import creditCardController from '../controllers/credit-card.controller';
import { creditCardSchema, validateCreditCard } from '../validators/credit-card.validator'

const router = Router();

router.post('/token', creditCardSchema(), validateCreditCard, creditCardController.createToken);
router.get('/token/:tokenId', creditCardController.getToken);

export default router;