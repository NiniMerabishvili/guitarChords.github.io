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
    add: async (req, res) => {
        try {
            const savedItem = await new UserModel(req.body).save();
            res.json(savedItem);
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
}