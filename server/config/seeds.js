const db = require('./connection');
const { User, Donut, Type, Review } = require('../models');


db.once('open', async() => {
    await Type.deleteMany();

    const types = await Type.insertMany([
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

    await Donut.deleteMany();

    const donuts = await Donut.insertMany([
        {
            name: 'Maple Bar',
            description: 'This is a maple bar',
            image: '',
            type: types[8]._id,
            price: 2.99,
            quantity: 12,
            reviews: []
        },
        {
            name: 'Glazed Donut',
            description: "This is a cop's favorite donut",
            image: '',
            type: types[3].id,
            price: 1.99,
            quantity: 12,
            reviews: []
        },
        {
            name: 'Strawberry Filled Donut',
            description: 'A donut with delicious strawberry jelly filling',
            image: '',
            type: types[4]._id,
            price: 3.99,
            quantity: 12,
            reviews: []
        },
        {
            name: 'Chocolate Sprinkle Donut',
            description: 'A basic donut with chocolate frosting and sprinkles',
            image: '',
            type: types[6]._id,
            price: 2.99,
            quantity: 12,
            reviews: []
        },
        {
            name: 'Matcha Mochi',
            description: 'Classic Mochi Donut',
            image: '',
            type: types[5]._id,
            price: 5.99,
            quantity: 12,
            reviews: []
        }
]);

console.log('donuts seeded');

await User.deleteMany();

await User.create({
    firstName: 'teste',
    lastName: 'testtest',
    email: 'test@tester.com',
    password: '123456',
    orders: [
        {
            donuts: [donuts[0]._id, donuts[1]._id]
        }
    ]
});

await User.create({
    firstName: 'Dough',
    lastName: 'Nuts',
    email: 'doeyjoey@donuts.com',
    password: '123456',
    orders: [
        {
            donuts: [donuts[1]._id, donuts[4]._id]
        }
    ]
});

await User.create({
    firstName: 'Jough',
    lastName: 'Nuts',
    email: 'joeydoey@donuts.com',
    password: '123456',
    orders: [
        {
            donuts: [donuts[3]._id, donuts[2]._id]
        }
    ]
});

console.log('users seeded');

process.exit();


});