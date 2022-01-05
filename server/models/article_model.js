const mongoose = require('mongoose');
require('dotenv').config();

const articleSchema = mongoose.Schema({
    title: {
        type: String,
        maxLength: 100,
        required: [true, 'You need a title']
    },
    content: {
        type: String,
        required: [true, 'You need content']
    },
    excerpt: {
        type: String,
        required: [true, 'Please add an excerpt'],
        maxLength: 500
    },
    score: {
        type: Number,
        min: 0,
        max: 100
    },
    status: {
        type: String,
        required: true,
        enum: ['draft', 'public'],
        default: 'draft',
        index: true
    }
}, {
    timestamps: true
});

const Article = mongoose.model('Article', articleSchema);
module.exports = { Article }