const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Category {
    _id: ID
    name: String
  }

  type Donut {
    _id: ID
    name: String
    description: String
    image: String
    quantity: Int
    price: Float
    category: Category
    reviews: [Review]
  }

  type Order {
    _id: ID
    purchaseDate: String
    donuts: [Donut]
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    reviews: [Review]
    orders: [Order]
  }

  type Review {
    _id: ID
    reviewAuthor: String
    reviewText: String
    createdAt: String
  }

  type Checkout {
    session: ID
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    types: [Category]
    reviews(donut: ID, name: String): [Review]
    donuts(type: ID, name: String): [Donut]
    donut(_id: ID!): Donut
    user: User
    order(_id: ID!): Order
    checkout(donuts: [ID]!): Checkout
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    addOrder(products: [ID]!): Order
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    updateDonut(_id: ID!, quantity: Int!): Donut
    login(email: String!, password: String!): Auth
    addReview(donutId: ID!, reviewText: String): Review
    deleteReview(donutId: ID!, reviewId: ID!): Review
  }
`;

module.exports = typeDefs;
