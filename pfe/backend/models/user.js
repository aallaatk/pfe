import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    country: { type: String },
    gsm: { type: String },
    birthDate: { type: Date },
    isGuider: { type: Boolean },
    role: { type: String, enum: ['user', 'admin', 'guider'], default: 'user' }, // Updated enum to include 'guider'
    imageUrl: { type: String }
});

const User = mongoose.model('User', userSchema, 'Users');

export default User;
