import mongoose, { Document, Schema } from 'mongoose';
import validator from 'validator';
import userRoles from '../utils/userRoles';

interface IAvatar {
    url: string;
    cloudinary_id: string;
}

export interface IUser extends Document {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
    token?: string;
    role: string;
    avatar: IAvatar[];
}

const userSchema: Schema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Full name is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        validate: [validator.isEmail, 'Field must be a valid email address'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters'],
    },
    confirmPassword: {
        type: String,
        required: [true, 'Confirm password is required'],
        validate: {
            validator: function (this: IUser, el: string): boolean {
                return el === this.password;
            },
            message: 'Passwords must match',
        },
    },
    token: {
        type: String,
    },
    role: {
        type: String,
        enum: [userRoles.STUDENT, userRoles.ADMIN, userRoles.INSTRUCTOR],
        default: userRoles.STUDENT,
    },
    avatar: [
        {
            url: {
                type: String,
                required: true,
            },
            cloudinary_id: {
                type: String,
                required: true,
            },
        },
    ],
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
