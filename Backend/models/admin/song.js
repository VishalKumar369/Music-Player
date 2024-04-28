const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
    song: {
        type: String,
        required: true,
    },
    singer: {
        type: String,
        required: true,
    },
    musicDirector: {
        type: String,
        required: true,
    },
    releaseDate: {
        type: String,
        required: true,
    },
    albumName: {
        type: String,
        required: true,
    },
    songFile:{
        type:String,
        required:true,
    },
    visible: {
        type: Boolean,
        default: true,
    },
});

const Song = mongoose.model("Song", songSchema);

module.exports = { Song };
