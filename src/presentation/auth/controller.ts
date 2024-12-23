import { Response, Request, NextFunction } from "express"
import { AuthRepository, RegisterUserDto } from "../../domain";


export class AuthController {
    //DI
    constructor(
        private readonly authRepository: AuthRepository,
    ) {}

    registerUser = (req: Request, res: Response, next: NextFunction): void => {
        const [error, registerUserDto] = RegisterUserDto.create(req.body);
      
        if (error) {
          res.status(400).json({ error });
          return; // Garantiza que no se ejecuten más instrucciones
        }
      
        this.authRepository
          .register(registerUserDto!)
          .then((user) => {
            res.json(user);
          })
          .catch((err) => {
            next(err); // Delegamos el manejo de errores inesperados al middleware de Express
          });
      };


    // registerUser = (req: Request, res: Response) => {
    //     const [ error, registerUserDto ] = RegisterUserDto.create(req.body);
    //     if (error) return res.status(400).json({error});
        
    //     this.authRepository.register(registerUserDto!)
    //         .then( user => res.json(user))
    //         .catch( error => res.status(500).json(error))
    // }
    // registerUser = ( req: Request, res: Response ) => {
    //     res.json('registerUser controller')
    // }

    loginUser = ( req: Request, res: Response ) => {
        res.json('loginUser controller')
    }
}