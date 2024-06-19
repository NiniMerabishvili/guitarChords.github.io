const SongModel = require('../models/song');

module.exports = {
    getAll: (req, res) => {
        SongModel.find({})
            .then(data => {
                res.json(data);
            })
            .catch(error => {
                res.status(500).json(error);
            });
    },
    getTitles: (req, res) => {
        SongModel.find({}, 'title')
            .then(data => {
                res.json(data);
            })
            .catch(error => {
                res.status(500).json(error);
            });
    },
    getOne: async (req, res) => {
        try {
            const item = await SongModel.findById(req.params.id);
            if (!item) {
                return res.status(404).json({ message: "Song not found" });
            }
            res.json(item);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    add: async (req, res) => {
        try {
            const { title, lyrics } = req.body;
            const newSong = new SongModel({ title, lyrics });
            const savedItem = await newSong.save();
            res.json(savedItem);

        } catch (error) {
            res.status(500).json(error);
        }
    }
}
