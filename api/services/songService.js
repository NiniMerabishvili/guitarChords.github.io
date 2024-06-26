const SongModel = require('../models/song');

module.exports = {
    getAll: (req, res) => {
        SongModel.find({ status: 1 })
            .then(data => {
                res.json(data);
            })
            .catch(error => {
                res.status(500).json(error);
            });
    },
    getAll2: (req, res) => {
        SongModel.find({ status: 0 })
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
    },
    getStatus: async (req, res) => {
        try {
            const status = req.body.status;
            res.json(status);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    updateStatus: async (req, res) => {
        try {
            const { id } = req.params;
            const { status } = req.body;
            const song = await SongModel.findByIdAndUpdate(id, { status }, { new: true });
            if (!song) {
                return res.status(404).json({ message: "Song not found" });
            }
            res.json(song);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    deleteSong: async (req, res) => {
        try {
            await SongModel.deleteOne({ _id: req.params.id });
            res.json({ success: true });
        } catch (error) {
            res.status(500).json(error);
        }
    }
}