import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema({

    fullName: {
        type: String,
        required: [true, 'Please add a full name field'],
        trim: true,
    },

    username: {
        type: String,
        required: [true, 'Please add a name field'],
        unique: true,
    },

    email: {
        type: String,
        required: [true, 'Please add a email field'],
        unique: true,
    },

    password: {
        type: String,
        required: [true, 'Please add a password field'],
    },

    profilePicture: {
        type: String,
        default: '',
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    updatedAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

UserSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

export default mongoose.model('User', UserSchema);