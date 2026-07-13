import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { User } from '../models/user.model';

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({ message: 'No token provided' });
            return;
        }
        const token = authHeader.split(' ')[1];
        if (!token) {
            res.status(401).json({ message: 'Not authenticated' });
            return;
        }
        const tokenPayload: JwtPayload | string = jwt.verify(token, process.env.TOKEN_SECRET as string);
        if (typeof tokenPayload === 'string') {
            throw new Error('Invalid token payload');
        }
        const user = await User.findById(tokenPayload.userId).select('-password');
        if (!user) {
            res.status(401).json({ message: 'User not found' });
            return;
        }
        req.user = user;
        next();
    } catch (error) {
        if ((error as Error).name === 'JsonWebTokenError') {
            res.status(401).json({ message: 'Invalid token' });
            return;
        }
        res.status(500).json({ message: 'Error authenticating user' });
    }
};
