const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
    username: String,
    note: String,
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Note", NoteSchema);