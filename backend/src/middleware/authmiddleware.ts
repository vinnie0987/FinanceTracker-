import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload, Secret, VerifyErrors } from 'jsonwebtoken';
import { jwtConfig } from '../config/jwtConfig';
import { prisma } from '../prisma/prismaClient';
import { user } from '@prisma/client';




interface RequestWithUser extends Request {
    user?: user;
}

export const authMiddleware = (req: RequestWithUser, res: Response, next: NextFunction): void => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }

    jwt.verify(
        token,
        jwtConfig.secret as Secret,
        {},
        (err: VerifyErrors | null, decoded: string | JwtPayload | undefined) => {
            if (err) {
                res.status(401).json({ message: 'Invalid Token' });
                return;
            }

            if (typeof decoded === 'object' && decoded !== null) {
                req.user = decoded as user;
            } else {
                res.status(401).json({ message: 'Invalid Token Payload' });
                return;
            }

            next();
        }
    );
};