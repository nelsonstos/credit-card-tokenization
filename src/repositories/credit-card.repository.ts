import 'dotenv/config';
 import redis from '../config/redis';

 
 class creditCardRepository {

    async saveToken(tokenId: any, token: any) {
      const time = Number(process.env.JWT_EXPERES_IN)
      await redis.set(`token:${tokenId}`, token, 'EX', time);
    }

    async getToken(tokenId: any) {
      return await redis.get(`token:${tokenId}`);
    }
 }

 export default new creditCardRepository