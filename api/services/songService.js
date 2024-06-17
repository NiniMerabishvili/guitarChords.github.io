const SongModel = require('../models/song');
module.exports = { 
    // add: async (req, res) => {
    //     const { title, lyrics, chords } = req.body;

    //     try {
    //         const newSong = new Song({
    //             title,
    //             lyrics,
    //             chords // Store uploaded lyrics
    //         });

    //         const savedSong = await newSong.save();
    //         res.json(savedSong);
    //     } catch (error) {
    //         res.status(500).json(error);
    //     }
    // },
    add: async (req, res) => {
        try {
            const savedItem = await new SongModel(req.body).save();
            res.json(savedItem);
            

        } catch (error) {
            res.status(500).json(error);
        }
    }
}