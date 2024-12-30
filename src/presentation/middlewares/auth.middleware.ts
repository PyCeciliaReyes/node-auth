import { Request, Response, NextFunction } from 'express';
import { JwtAdapter } from '../../config';
import { UserModel } from '../../data/mongodb';


export class AuthMiddleware {

    static validateJWT = async ( req: Request, res: Response, next: NextFunction) : Promise<void> => {
        const authorization = req.header('Authorization');

        if (!authorization) {
            res.status(401).json({ error: 'No token provided' })
        };
        
        if (!authorization?.startsWith('Bearer')) {
            res.status(401).json({ error: 'Invalid Bearer token' })
        }

        const token = authorization?.split(' ').at(1) || '';

        try {
            //todo: verificar el token
            const payload = await JwtAdapter.validateToken<{id: string}>(token);
            if(!payload) {
                res.status(401).json({ error: 'Invalid token' })
                return;
            }

            const user = await UserModel.findById(payload.id);
            if (!user) {
                res.status(401).json({ error: 'User not found - Invalid token' });
                return;
            }

            req.body.user = user;

            next();
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal server error' });
        }

    }
}