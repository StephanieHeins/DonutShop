const { AuthenticationError } = require('apollo-server-express');
const { User, Donut, Type, Order, Review } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
  Query: {
    types: async () => {
      return await Type.find();
    },
    donuts: async (parent, { type, name }) => {
      const params = {};

      if (type) {
        params.type = type;
      }

      if (name) {
        params.name = {
          $regex: name
        };
      }

      return await Donut.find(params).populate('type');
    },
    donut: async (parent, { _id }) => {
      return await Donut.findById(_id).populate('type');
    },
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'orders.donuts',
          populate: 'type'
        });

        user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

        return user;
      }

      throw new AuthenticationError('Not logged in');
    },
    order: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'orders.donuts',
          populate: 'type'
        });

        return user.orders.id(_id);
      }

      throw new AuthenticationError('Not logged in');
    },
    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      const order = new Order({ products: args.products });
      const line_items = [];

      const { products } = await order.populate('donuts').execPopulate();

      for (let i = 0; i < products.length; i++) {
        const product = await stripe.products.create({
          name: products[i].name,
          description: products[i].description,
          images: [`${url}/images/${products[i].image}`]
        });

        const price = await stripe.prices.create({
          product: product.id,
          unit_amount: products[i].price * 100,
          currency: 'usd',
        });

        line_items.push({
          price: price.id,
          quantity: 1
        });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`
      });

      return { session: session.id };
    }
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    addOrder: async (parent, { products }, context) => {
      console.log(context);
      if (context.user) {
        const order = new Order({ products });

        await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });

        return order;
      }

      throw new AuthenticationError('Not logged in');
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, { new: true });
      }

      throw new AuthenticationError('Not logged in');
    },
    updateDonut: async (parent, { _id, quantity }) => {
      const decrement = Math.abs(quantity) * -1;

      return await Donut.findByIdAndUpdate(_id, { $inc: { quantity: decrement } }, { new: true });
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    addReview: async (parent, {donutId, reviewText}, context) =>{
      if (context.user){
        const review = await Review.create({
          reviewText,
          reviewAuthor: context.user.email,
        });

        await Donut.findOneAndUpdate(
          {_id: donutId},
          { $addToSet: { reviews: review._id} }
        );  
        return review;
    };
  },
    deleteReview: async (parent, {donutId, reviewId}, context) => {
      if (context.user){
        const review = await Review.findOneAndDelete({
          _id: reviewId,
          reviewAuthor: context.user.email,
        });

      await Donut.findOneAndUpdate(
        {_id: donutId},
        { $pull: { reviews: review._id}}
      );  

      return review;
    ;}
  },

  },
};

module.exports = resolvers;
