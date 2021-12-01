const { Schema, model } = require('mongoose');

const orderSchema = new Schema({
  purchaseDate: {
    type: Date,
    default: Date.now
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Products'
    }
  ]
});

const Order = model('Order', orderSchema);

module.exports = Order;
