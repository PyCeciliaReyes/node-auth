import mongoose, {Schema} from "mongoose";

//son las reglas que se van a aplicar a los datos que se van a guardar en la base de datos
const userSchema = new Schema({
    
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },

    password: {
        type: String,
        required: [true, 'Password is required'],
    },

    img: {
        type: String,
        default: 'no-image.jpg'
    },

    roles: {
        type: [String],
        default: ['USER_ROLE'],
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    }
});

export const UserModel = mongoose.model('User', userSchema);