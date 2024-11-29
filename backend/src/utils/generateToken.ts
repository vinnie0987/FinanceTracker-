import jwt from 'jsonwebtoken';
import { jwtConfig } from '../config/jwtConfig';
import { user } from '@prisma/client';

// This function generates a JWT token for a user
export const generateToken = (user: user): string => {
    const payload = {
        id: user.id,
        email: user.email,
    };

    // Sign and return the JWT token
    const token = jwt.sign(payload, jwtConfig.secret, {
        expiresIn: jwtConfig.expiresIn,  // Set token expiration time
    });

    return token;
};
