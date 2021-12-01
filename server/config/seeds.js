const db = require('./connection');
const { User, Product, Category, Review } = require('../models');


db.once('open', async() => {
    await Category.deleteMany();

    const categories = await Category.insertMany([
        { name: 'Holes'},
        { name: 'Sugar'},
        { name: 'Powder'},
        { name: 'Glazed'},
        { name: 'Jelly Filled'},
        { name: 'Mochi'},
        { name: 'Sprinkled'},
        { name: 'Cream Filled'},
        { name: 'Bars'}
    ]);

    console.log('categories seeded');

    await Product.deleteMany();

    const products = await Product.insertMany([
        {
            name: 'Maple Bar',
            description: 'This is a maple bar',
            image: '',
            category: categories[8]._id,
            price: 2.99,
            quantity: 12,
            reviews: []
        },
        {
            name: 'Glazed Product',
            description: "This is a cop's favorite product",
            image: '',
            category: categories[3].id,
            price: 1.99,
            quantity: 12,
            reviews: []
        },
        {
            name: 'Strawberry Filled Product',
            description: 'A product with delicious strawberry jelly filling',
            image: '',
            category: categories[4]._id,
            price: 3.99,
            quantity: 12,
            reviews: []
        },
        {
            name: 'Chocolate Sprinkle Product',
            description: 'A basic product with chocolate frosting and sprinkles',
            image: '',
            category: categories[6]._id,
            price: 2.99,
            quantity: 12,
            reviews: []
        },
        {
            name: 'Matcha Mochi',
            description: 'Classic Mochi Product',
            image: '',
            category: categories[5]._id,
            price: 5.99,
            quantity: 12,
            reviews: []
        }
]);

console.log('products seeded');

await User.deleteMany();

await User.create({
    firstName: 'teste',
    lastName: 'testtest',
    email: 'test@tester.com',
    password: '123456',
    orders: [
        {
            products: [products[0]._id, products[1]._id]
        }
    ]
});

await User.create({
    firstName: 'Dough',
    lastName: 'Nuts',
    email: 'doeyjoey@products.com',
    password: '123456',
    orders: [
        {
            products: [products[1]._id, products[4]._id]
        }
    ]
});

await User.create({
    firstName: 'Jough',
    lastName: 'Nuts',
    email: 'joeydoey@products.com',
    password: '123456',
    orders: [
        {
            products: [products[3]._id, products[2]._id]
        }
    ]
});

console.log('users seeded');

process.exit();


});