import CreditCardService from '../../src/services/credit-card.service';
import JwtUtils from '../../src/utils/jwt.utils';
import creditCardRepository from '../../src/repositories/credit-card.repository';
import CardUtils from '../../src/utils/card.utils';

// Mock de JwtUtils
jest.mock('../../src/utils/jwt.utils', () => ({
    __esModule: true,
    default: jest.fn().mockImplementation(() => ({
        generateUniqueId: jest.fn().mockReturnValue('uniqueTokenId'),
        generateToken: jest.fn().mockReturnValue('generatedToken'),
        verifyToken: jest.fn().mockReturnValue({/* Decoded Token */}),
    })),
}));

// Mock de creditCardRepository
jest.mock('../../src/repositories/credit-card.repository', () => ({
    __esModule: true,
    default: {
        saveToken: jest.fn().mockResolvedValue(undefined),
        getToken: jest.fn().mockResolvedValue('storedToken'),
    },
}));

// Mock de CardUtils
jest.mock('../../src/utils/card.utils', () => ({
    __esModule: true,
    removeCVV: jest.fn().mockImplementation((token: any) => token),
}));

describe('CreditCardService', () => {
    describe('createToken', () => {
        it('should create a new token', async () => {
            // Arrange
            const data = { 
                "card_number": "1458 8965 4785 4568",
                "cvv": "456",
                "expiration_month": "12",
                "expiration_year": "2025",
                "email": "tenantz100@gmail.com"
            };

            // Act
            const result = await CreditCardService.createToken(data);

            // Assert
            expect(result).toBe('uniqueTokenId');
            expect(JwtUtils).toHaveBeenCalled();
            expect(creditCardRepository.saveToken).toHaveBeenCalledWith('uniqueTokenId', 'generatedToken');
        });

        it('should handle errors when creating a token', async () => {
            // Arrange
            jest.spyOn(creditCardRepository, 'saveToken').mockRejectedValue(null);

            // Act
            const result = await CreditCardService.createToken({});

            // Assert
            expect(result).toBeNull();
        });
    });

    describe('getToken', () => {
       /* it('should get the token and decode it', async () => {
            // Arrange

            // Act
            const result = await CreditCardService.getToken('tokenId');

            // Assert
            expect(result).toEqual({});
            expect(creditCardRepository.getToken).toHaveBeenCalledWith('tokenId');
            expect(CardUtils.removeCVV).toHaveBeenCalled();
        });*/

        it('should handle error when token does not exist', async () => {
            // Arrange
            const myVariable: any = undefined;
            jest.spyOn(creditCardRepository, 'getToken').mockResolvedValue(myVariable);

            // Act
            const result = await CreditCardService.getToken('nonExistingTokenId');

            // Assert
            expect(result).toBeNull();
        });

        it('should handle errors when getting token', async () => {
            // Arrange
            jest.spyOn(creditCardRepository, 'getToken').mockRejectedValue(null);

            // Act
            const result = await CreditCardService.getToken('tokenId');

            // Assert
            expect(result).toBeNull()
        });
    });
});
