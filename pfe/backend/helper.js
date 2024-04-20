import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from './models/user.js';

const JWT_SECRET = 'dWmalAS5rvdzizu545';
const generateToken = (user) => {
    return jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1d' });
};

const login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      const token = generateToken(user);
  
      return res.status(200).json({
        token,
        user: {
          _id: user._id,
          email: user.email,
          name: user.name,
          role: user.role
        }
      });
    } catch (error) {
      console.error('Error during login:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  export { login };