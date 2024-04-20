import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    country: { type: String },
    gsm: { type: String },
    birthDate: { type: Date },
    isGuider: { type: Boolean },
    cinFile: { type: String },
    role: { type: String, enum: ['user', 'admin'], default: 'user' }
});

const User = mongoose.model('User', userSchema, 'Users');

export default User;
