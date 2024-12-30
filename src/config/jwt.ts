import jwt from 'jsonwebtoken';
import { resolve } from 'path';

export class JwtAdapter {
    static async generateToken( payload : Object, duration: string = '2h' ) : Promise<string | null> {

        return new Promise( (resolve) =>{
            //TODO: generacion del seed
            jwt.sign( payload, 'SEED', { expiresIn: duration}, (err, token) => {
                if (err) return resolve(null);
                resolve(token!);
            });
        });
    }
}