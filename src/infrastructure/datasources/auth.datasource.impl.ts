import { BcryptAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";
import { AuthDataSource, CustomError, RegisterUserDto, UserEntity } from "../../domain";

type HashFunction = (password: string) => string;
type CompareFunction = (password: string, hashed: string) => boolean;
export class AuthDataSourceImpl implements AuthDataSource{

    constructor(
        private readonly hashPassword: HashFunction = BcryptAdapter.hash,
        private readonly comparePassword: CompareFunction = BcryptAdapter.compare,
    ){}

    async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        const { name, email, password } = registerUserDto;

        try {
            //1. verificar si el correo existe
            const exists =await UserModel.findOne({email});
            if (exists) throw CustomError.badRequest('User already exists');
            const user= await UserModel.create({
                name: name,
                email: email,
                password: this.hashPassword(password),
            });

            //2. hashear la contraseña:

            await user.save();

            //3. mapear la respuesta a nuestra entidad
            //todo falata mapper

            return new UserEntity(
                user.id, 
                name,
                email,
                user.password,
                user.roles,
            )



        } catch (error) {
            console.error('Error during user registration:', error);
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalServer('An unexpected error occurred during user registration');
        }
    }

}