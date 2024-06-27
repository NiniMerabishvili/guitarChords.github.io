const bcrypt = require('bcrypt');
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

            if (!req.body.firstName || !req.body.lastName || !req.body.userName || !req.body.email || !req.body.password)
            {
                return res.status(400).json({
                    message: 'missed_required_fields'
                });
            }

            const emailExists = await UserModel.findOne({
                email: req.body.email
            });
            const userNameExists = await UserModel.findOne({
                userName: req.body.userName
            });

            if(emailExists) {
                return res.status(409).json({
                    message: 'User already exists'
                })
            }
            if(userNameExists) {
                return res.status(409).json({
                    message: 'User already exists'
                })
            }

            const hashPassword = bcrypt.hashSync(req.body.password, 10);
            const newUser = new UserModel({
                firstName,
                lastName,
                userName,
                email,
                password: hashPassword,
                role // Assigning role during registration
            });

            const savedUser = await newUser.save();
            res.json(savedUser);
            const token = jwt.sign({
                id: savedUser._id,
                email: savedUser.email
            }, process.env.SECRET_KEY);

            res.json({ token });
        } catch (error) {
            res.status(500).json(error);
        }
    },
   
    //     const { firstName, lastName, userName, email, password } = req.body;

    //     try {
    //         let role = 'customer'; // Default role

    //         if (email === 'admin@gmail.com' && password === 'admin1') {
    //             role = 'admin';
    //         }

            // if (!req.body.firstName || !req.body.lastName || !req.body.userName || !req.body.email || !req.body.password)
            // {
            //     return res.status(400).json({
            //         message: 'missed_required_fields'
            //     });
            // }

            // const emailExists = await UserModel.findOne({
            //     email: req.body.email
            // });
            // const userName = await UserModel.findOne({
            //     userName: req.body.userName
            // });

            // if(emailExists) {
            //     return res.status(409).json({
            //         message: 'User already exists'
            //     })
            // }
            // if(userName) {
            //     return res.status(409).json({
            //         message: 'User already exists'
            //     })
            // }
            // const hashPassword = bcrypt.hashSync(req.body.password, 10);

            // const newUser = await new UserModel({
            //     firstName,
            //     lastName,
            //     userName,
            //     email,
            //     password: hashPassword,
            //     role // Assigning role during registration
            // });
            // const savedUser = await newUser.save();
            // res.json(savedUser);
            // const token = jwt.sign({
            //     id: savedUser._id,
            //     email: savedUser.email
            // }, process.env.SECRET_KEY);

            // res.json({ token });

    //     } catch (error) {
    //         res.status(500).json(error);
    //     }
    // },
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
            const user = await UserModel.findOne({  email: req.body.email });

            if (!user) {
                return res.status(401).json({ message: 'Authentication failed. User not found.' });
            }

            if (bcrypt.compareSync(req.body.password, user.password)) {
                const token = jwt.sign({
                    id: user_id,
                    email: user.email
                }, process.env.SECRET_KEY);
                res.json({ token });
            }
            else {
                return res.status(404).json ({
                    message: 'uesr_not_found'
                });
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