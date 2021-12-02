const { Schema, model } = require('mongoose');

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  price: {
    type: Number,
    required: true,
    min: 0.50
  },
  quantity: {
    type: Number,
    min: 0,
    default: 0
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  rating: {
    star: Number,
  },
  reviews: [
    {
      reviewText: {
        type: String,
        required: true,
        minlength: 1,
      },
      reviewAuthor: {
        type: String,
        required: true,
      },
      reviewDate: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    },
  ],
});

const Product = model('Product', productSchema);

module.exports = Product;
