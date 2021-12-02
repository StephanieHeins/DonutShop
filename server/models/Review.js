const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const Product = require('./Product')


const reviewSchema = new Schema({
    reviewAuthor: {
        type: String,
        required: true,
        trim: true,
    },
    reviewText: {
        type: String,
        minlength: 1,
        maxlength: 2000,
        trim: true,
    },
    reviewDate: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    },
});



const Review = model('Review', reviewSchema);

module.exports = Review;
