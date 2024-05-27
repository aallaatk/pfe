import express from 'express';
import bcrypt from 'bcrypt';
import { login } from '../helper.js';
import User from '../models/user.js';

const router = express.Router();

router.post('/signup', async (req, res) => {
    try {
        const { name, email, password, country, gsm, birthDate, imageUrl, isGuider } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            country,
            gsm,
            birthDate,
            isGuider, // Use the provided isGuider value
            role: isGuider ? 'guider' : 'user', // Set role based on isGuider
            imageUrl
        });

        await newUser.save();

        console.log('User registered:', newUser);

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        if (error.name === 'MongoError' && error.code === 11000) {
            res.status(400).json({ message: 'Email already in use' });
        } else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const { success, token, user, message } = await login(email, password);

    if (success) {
        return res.status(200).json({ token, user });
    } else {
        return res.status(401).json({ message });
    }
});
router.post('/login/user', async (req, res) => {
    const { email, password } = req.body;
    const { success, token, user, message } = await login(email, password);

    if (success) {
        return res.status(200).json({ token, user });
    } else {
        return res.status(401).json({ message });
    }
});
// Route for guider login
router.post('/login/guider', async (req, res) => {
    const { email, password } = req.body;
    const { success, token, user} = await login(email, password);

    if (success && user.role === 'guider') {
        return res.status(200).json({ token, user });
    } else {
        return res.status(401).json({ message: 'Unauthorized' });
    }
});

// Route for admin login
router.post('/login/admin', async (req, res) => {
    const { email, password } = req.body;
    const { success, token, user} = await login(email, password);

    if (success && user.role === 'admin') {
        return res.status(200).json({ token, user });
    } else {
        return res.status(401).json({ message: 'Unauthorized' });
    }
});
// Route to get a user by ID
router.get('/info/user/:id', async (req, res) => {
    const { id } = req.params; // Extract the user ID from the request parameters

    try {
        const user = await User.findById(id); // Find the user by their ID

        if (!user) {
            return res.status(404).json({ message: 'User not found' }); // If user is not found, return 404 error
        }

        res.status(200).json(user); // If user is found, return user data
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
// Route to get a guider by ID
router.get('/guiders/info/:id', async (req, res) => {
    const { id } = req.params; // Extract the guider ID from the request parameters

    try {
        const guider = await User.findById(id); // Find the guider by their ID

        if (!guider) {
            return res.status(404).json({ message: 'Guider not found' }); // If guider is not found, return 404 error
        }

        res.status(200).json(guider); // If guider is found, return guider data
    } catch (error) {
        console.error('Error fetching guider:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
//router to get all users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find({ isGuider: false }); // Fetch users where isGuider is false
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});router.get('/dashboard/users/chart', async (req, res) => {
    try {
      // Fetch users where isGuider is false
      const users = await User.find({ isGuider: false });
  
      // Group users by registration date and count new users per day
      const userCountsPerDay = users.reduce((acc, user) => {
        const registrationDate = new Date(user.createdAt).toDateString(); // Get registration date (ignore time)
        acc[registrationDate] = (acc[registrationDate] || 0) + 1; // Increment count for the day
        return acc;
      }, {});
  
      // Convert userCountsPerDay object into an array of objects suitable for Chart.js
      const chartData = {
        labels: Object.keys(userCountsPerDay).map(dateString => new Date(dateString)), // Convert labels to Date objects
        datasets: [
          {
            label: 'New Users per Day',
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: Object.values(userCountsPerDay)
          }
        ]
      };
  
      res.status(200).json(chartData);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });


//route to get all guiders
router.get('/guiders', async (req, res) => {
    try {
        const guiders = await User.find({ isGuider: true });
        res.status(200).json(guiders);
    } catch (error) {
        console.error('Error fetching guiders:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
//update guider by id
router.put('/guiders/update/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, country, gsm, birthDate, cinFile } = req.body;

    try {
        const guider = await User.findById(id);

        if (!guider) {
            return res.status(404).json({ message: 'Guider not found' });
        }

        // Ensure that the user is a guider before allowing update
        if (!guider.isGuider) {
            return res.status(403).json({ message: 'Not authorized to update this user' });
        }

        // Perform update operation
        const updatedGuider = await User.findByIdAndUpdate(
            id,
            {
                name,
                email,
                country,
                gsm,
                birthDate,
                cinFile: cinFile ? cinFile.path : null
            },
            { new: true }
        );

        res.status(200).json(updatedGuider);
    } catch (error) {
        console.error('Error updating guider:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
//deltee  guider by id
router.delete('/guiders/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const guider = await User.findById(id);

        if (!guider) {
            return res.status(404).json({ message: 'Guider not found' });
        }

        // Ensure that the user is a guider before allowing deletion
        if (!guider.isGuider) {
            return res.status(403).json({ message: 'Not authorized to delete this user' });
        }

        // Perform delete operation
        const deletedGuider = await User.findByIdAndDelete(id);

        if (!deletedGuider) {
            return res.status(404).json({ message: 'Failed to delete guider' });
        }

        res.status(200).json({ message: 'Guider deleted successfully' });
    } catch (error) {
        console.error('Error deleting guider:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


//update user by id
router.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, country, gsm, birthDate, cinFile } = req.body;

    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.isGuider) {
            return res.status(403).json({ message: 'Update not allowed for guiders' });
        }

        // Proceed with update if the user is not a guider
        const updatedUser = await User.findByIdAndUpdate(id, {
            name,
            email,
            country,
            gsm,
            birthDate,
            cinFile: cinFile ? cinFile.path : null
        }, { new: true });

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
//delete user by id
router.delete('/users/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.isGuider) {
            return res.status(403).json({ message: 'Delete not allowed for guiders' });
        }

        // Proceed with deletion if the user is not a guider
        await User.findByIdAndDelete(id);

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});






// Route to get user count
router.get('/stats/users/count', async (req, res) => {
    try {
        const userCount = await User.countDocuments({ isGuider: false });
        res.status(200).json({ userCount });
    } catch (error) {
        console.error('Error fetching user count:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Route to get guider count
router.get('/stats/guiders/count', async (req, res) => {
    try {
        const guiderCount = await User.countDocuments({ isGuider: true });
        res.status(200).json({ guiderCount });
    } catch (error) {
        console.error('Error fetching guider count:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Route to get new users per day
router.get('/stats/users/new-per-day', async (req, res) => {
    try {
        const users = await User.find({ isGuider: false });
        const userCountsPerDay = users.reduce((acc, user) => {
            const registrationDate = new Date(user.createdAt).toDateString();
            acc[registrationDate] = (acc[registrationDate] || 0) + 1;
            return acc;
        }, {});
        res.status(200).json(userCountsPerDay);
    } catch (error) {
        console.error('Error fetching new users per day:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Route to get new guiders per day
router.get('/stats/guiders/new-per-day', async (req, res) => {
    try {
        const guiders = await User.find({ isGuider: true });
        const guiderCountsPerDay = guiders.reduce((acc, guider) => {
            const registrationDate = new Date(guider.createdAt).toDateString();
            acc[registrationDate] = (acc[registrationDate] || 0) + 1;
            return acc;
        }, {});
        res.status(200).json(guiderCountsPerDay);
    } catch (error) {
        console.error('Error fetching new guiders per day:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


export default router;