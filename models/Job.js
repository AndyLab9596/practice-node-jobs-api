const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, 'Please provide company name']
    },
    position: {
        type: String,
        required: [true, 'Please provide position']
    },
    status: {
        type: String,
        enum: ['pending', 'declined', 'interview'],
        default: 'pending'
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide user']
    }
}, { timestamps: true })

module.exports = mongoose.model('Job', JobSchema)