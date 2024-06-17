const UserModel = require('../models/user');
module.exports = { 
    getAll: (req, res) => {
        UserModel.find({})
            .then(data => {
                res.json(data);
            })
            .catch(error => {
                res.status(500).json(error);
            });
    },
    // add: async (req, res) => {
    //     try {
    //         const savedItem = await new UserModel(req.body).save();
    //         res.json(savedItem);
            

    //     } catch (error) {
    //         res.status(500).json(error);
    //     }
    // },
    add: async (req, res) => {
        const { firstName, lastName, userName, email, password } = req.body;

        try {
            let role = 'customer'; // Default role

            if (email === 'admin@gmail.com' && password === 'admin1') {
                role = 'admin';
            }

            const newUser = new UserModel({
                firstName,
                lastName,
                userName,
                email,
                password,
                role // Assigning role during registration
            });

            const savedUser = await newUser.save();
            res.json(savedUser);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getOne: async (req, res) => {
        try {
            const item = await UserModel.findById(req.params.id);
            res.json(item);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    
    login: async (req, res) => {
        const { email, password } = req.body;

        try {
            const user = await UserModel.findOne({ email, password });

            if (!user) {
                return res.status(401).json({ message: 'Authentication failed. User not found.' });
            }

            let role = 'customer'; // Default role

            if (user.email === 'admin@gmail.com' && user.password === 'admin1') {
                role = 'admin';
            }

            res.json({ user, role }); // Send user object and role back to the client
        } catch (error) {
            res.status(500).json(error);
        }
    }
}