import { AuthDataSource, CustomError, RegisterUserDto, UserEntity } from "../../domain";



export class AuthDataSourceImpl implements AuthDataSource{
    async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        const { name, email, password } = registerUserDto;

        try {
            //1. verificar si el correo existe
            

            //2. hashear la contraseña

            //3. mapear la respuesta a nuestra entidad

            return new UserEntity(
                '1', 
                name,
                email,
                password,
                ['ADMIN_ROLE'],
            )



        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalServer();
        }
    }

}