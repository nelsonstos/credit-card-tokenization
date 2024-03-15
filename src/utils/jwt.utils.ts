import jwt from 'jsonwebtoken';
import crypto from 'crypto';

class JwtUtils {

    private secret: string;

    constructor(secret: string) {
        this.secret = secret;
    }

    generateToken(data: any){
        return jwt.sign(data, this.secret, {
            expiresIn: 3600,
            algorithm: 'HS256'
        });
    }

    verifyToken(token: string){
        return jwt.verify(token, this.secret);
    }

    generateUniqueId(){
        const buffer = crypto.randomBytes(16);
        const uniqueId = buffer.toString('hex')

        return uniqueId;
    }
    
}

export default JwtUtils;