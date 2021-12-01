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

const Order = model('Order', orderSchema);

module.exports = Order;
