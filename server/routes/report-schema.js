const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let reportSchema = new Schema({
    city: {
        type: String
    },
    location: {
        type: String
    },
    details: {
        type: String
    },
}, {
        collection: 'reports'
    })

module.exports = mongoose.model('report', reportSchema)