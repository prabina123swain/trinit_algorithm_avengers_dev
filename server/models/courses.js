const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
    day: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        enum: [40, 60, 90],
        required: true
    }
});

const courseSchema = new mongoose.Schema({
    courseId: {
        type: String,
        required: true,
        unique: true
    },
    courseTitle: {
        type: String,
        required: true
    },
    courseImgUrl: {
        type: String,
        required: false
    },
    courseDetails: {
        type: String,
        required: true
    },
    author_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    authordetails: {},
    availableSlots: [slotSchema],
    bookedSlots: [slotSchema],
    enrolledUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    price: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('course', courseSchema);
