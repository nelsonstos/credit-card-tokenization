import { body, validationResult  } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import luhn from 'luhn';

// Función asincrónica para validar el número de tarjeta de crédito utilizando el paquete luhn
function validateCreditCardNumber(cardNumber:any) {
    return new Promise((resolve, reject) => {
        // Eliminar espacios en blanco y guiones del número de tarjeta
        const sanitizedCardNumber = cardNumber.replace(/[\s-]/g, '');
        
        // Verificar si el número de tarjeta tiene solo dígitos y longitud entre 13 y 19
        if (!/^\d{13,16}$/.test(sanitizedCardNumber)) {
            return resolve(false);
        }
        
        // Aplicar el algoritmo de Luhn para validar el número de tarjeta
        const isValid = luhn.validate(sanitizedCardNumber);
        return resolve(isValid);
    });
}

 export function creditCardSchema () {
    const schema = [
        body('card_number').custom(async (value) => {
            const isValid = await validateCreditCardNumber(value);
            if (!isValid) {
                throw new Error('Invalid credit card number');
            }
            return true;
        }).withMessage('Invalid credit card number'),
        body('cvv').isLength({ min: 3, max: 4 }),
        body('expiration_month').isInt({ min: 1, max: 12 }),
        body('expiration_year').isInt({ min: 4}),
        body('email').isEmail().isLength({ min: 5, max: 100}).custom((value) => {
            // Verificar si el email contiene uno de los dominios permitidos
            const allowedDomains = ['gmail.com', 'hotmail.com', 'yahoo.es'];
            const domain = value.split('@')[1];
            if (!allowedDomains.includes(domain)) {
                throw new Error('Invalid email domain');
            }
            return true;
        }).withMessage('Invalid email domain')
    ];
    return schema;
}


export function validateCreditCard(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
    }
    next();
}

