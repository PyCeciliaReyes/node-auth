import { Response, Request, NextFunction } from "express"
import { AuthRepository, CustomError, RegisterUserDto } from "../../domain";
import { JwtAdapter } from "../../config";


export class AuthController {
    //DI
    constructor(
        private readonly authRepository: AuthRepository,
    ) {}

    private handleError = ( error: unknown, res: Response) => {
      if ( error instanceof CustomError) {
        return res.status(error.statusCode).json({ error: error.message });
      }
      console.log(error);
      return res.status(500).json({ error: 'Internal server error' });
    }

    registerUser = (req: Request, res: Response, next: NextFunction): void => {
        const [error, registerUserDto] = RegisterUserDto.create(req.body);
      
        if (error) {
          res.status(400).json({ error });
          return; // Garantiza que no se ejecuten más instrucciones
        }
      
        this.authRepository
          .register(registerUserDto!)
          .then( async (user) => { 
            res.json({
              user,
              token: await JwtAdapter.generateToken({email: user.email})
            })
          })
          .catch( error => this.handleError( error, res));  // Delegamos el manejo de errores inesperados al middleware de Express
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