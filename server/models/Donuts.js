const mongoose = require('mongoose');

const { Schema } = mongoose;

const donutsSchema = new Schema({
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
  }
});

const Donuts = mongoose.model('Donut', donutsSchema);

module.exports = Donuts;
