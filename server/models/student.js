const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    about: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: true,
    },
    preferences: {
        type: [],
        required: false
    },
    profilePhotoLink: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Student', studentSchema);