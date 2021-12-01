const { Schema, model } = require('mongoose');

const donutSchema = new Schema({
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
  type: {
    type: Schema.Types.ObjectId,
    ref: 'Type',
    required: true
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Review',
    },
  ],
});

const Donut = model('Donut', donutSchema);

module.exports = Donut;
