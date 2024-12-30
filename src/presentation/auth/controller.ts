import { Response, Request, NextFunction } from "express"
import { AuthRepository, CustomError, LoginUser, LoginUserDto, RegisterUser, RegisterUserDto } from "../../domain";
import { JwtAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";


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

        new RegisterUser( this.authRepository)
          .execute(registerUserDto!)
          .then( data => res.json(data))
          .catch( error => this.handleError(error, res) );       
      };

    loginUser = ( req: Request, res: Response ) => {      
      const [error, loginUserDto] = LoginUserDto.login(req.body);
      
      if (error) {
        res.status(400).json({ error });
        return; // Garantiza que no se ejecuten más instrucciones
      }

      new LoginUser( this.authRepository)
        .execute(loginUserDto!)
        .then( data => res.json(data))
        .catch( error => this.handleError(error, res) );
    }

    getUsers = ( req: Request, res: Response ) => {
      UserModel.find()
      .then( users => {
        res.json({
          //users,
          user: req.body.user
        })
      })
      .catch(() => res.status(500).json({error: 'Internal server error'}))
  }
}