const { Schema, model } = require('mongoose');

const jobSchema = new Schema({
    company: {
        type: String,
        required: true,
    },
    jobTitle: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
    dateApplied: {
        type: Date,
        required: true,
    },
    contact: {
        type: String,
        required: false,
    },
    status: {
        type: String,
        required: false,
    },
    notes: {
        type: String,
        required: false,
    },
    lastUpdated: {
        type: Date,
        default: Date.now,
    },
});

const Job = model('Job', jobSchema);

module.exports= Job ;