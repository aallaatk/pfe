import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    country: { type: String },
    gsm: { type: String },
    birthDate: { type: Date },
    isGuider: { type: Boolean },
    cinFile: { type: String } 
});

// Hash the password before saving it to the database
userSchema.pre('save', async function(next) {
    try {
        if (!this.isModified('password')) return next();

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next();
    } catch (error) {
        return next(error);
    }
});

// compare passwords for user authentication
userSchema.methods.isValidPassword = async function(password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw new Error(error);
    }
};


userSchema.methods.generateAuthToken = function(jwtSecret) {
    const token = jwt.sign({ _id: this._id }, jwtSecret, { expiresIn: '1h' });
    return token;
};

const User = mongoose.model('User', userSchema, 'Users');

export default User;