import { UserEntity } from "../entities/user.entity";
import { RegisterUserDto } from "../dtos/auth/register-user.dto";
import { LoginUserDto } from "../dtos/auth/login-user.dto";


export abstract class AuthDataSource {
    //todo
    abstract login( loginUserDto: LoginUserDto ) : Promise<UserEntity>;

    abstract register( registerUserDto: RegisterUserDto ) : Promise<UserEntity>;
}