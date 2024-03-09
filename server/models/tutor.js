const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
    day: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    }
});

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    slots: [slotSchema]
});

const tutorSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    languages: {
        type: [],
        required: true
    },
    phone: {
        type: String,
        required: false
    },
    profilePhotoLink: {
        type: String,
        required: false
    },
    bio: {
        type: String,
        required: true
    },
    courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]
});

module.exports = mongoose.model('Tutor', tutorSchema);
