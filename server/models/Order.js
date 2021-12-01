const mongoose = require('mongoose');

const { Schema, model } = require('mongoose');

const orderSchema = new Schema({
  purchaseDate: {
    type: Date,
    default: Date.now
  },
  donuts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Donuts'
    }
  ]
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
