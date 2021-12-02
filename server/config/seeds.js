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
        { name: 'Sprinkled'},
        { name: 'Cream Filled'},
        { name: 'Bars'},
        { name: 'Speciality'}
    ]);

    console.log('categories seeded');

    await Product.deleteMany();

    const products = await Product.insertMany([
        {
            name: 'Maple Bar',
            description: "This is our delicious maple bar. We know you're gonna love it.",
            image: 'Maplebar.jpg',
            category: categories[7]._id,
            price: 3.99,
            quantity: 12,
            reviews: []
        },
        {
            name: 'Chocolate Maple Bar',
            description: `This is our classic maple bar with a chocolate glaze dribbled on top \n.
            Need we say more?`,
            image: 'Chocmaple.jpg',
            category: categories[7]._id,
            price: 3.99,
            quantity: 12,
            reviews: []
        },
        {
            name: 'Maple Bar with Bacon 😍',
            description: `This is our delicious maple bar but this time...we added bacon! Our bacon is sourced from a local farm with healthy pigs.`,
            image: 'Baconmaple.jpg',
            category: categories[7]._id,
            price: 4.99,
            quantity: 12,
            reviews: [{
                reviewAuthor:'Troy',
                reviewText: 'As a HUGE bacon guy, this donut is my absolute favorite',
                reviewDate: '12/01/2020',
            },
            {
                reviewAuthor:'Emma',
                reviewText: 'I saw it on Instagram and knew I had to try it. This donut did not disappoint',
                reviewDate: '10/13/2021',
            }]
        },
        {
            name: 'Glazed',
            description: "Your classic glazed donut. We just made it better 😛",
            image: 'Glaze.jpg',
            category: categories[3].id,
            price: 2.99,
            quantity: 12,
            reviews: []
        },
        {
            name: 'Jelly',
            description: "Our take on the classic jelly donut. Fun fact, The first record of a jelly donut appeared in the Polish translation (Kuchmistrzostwo) of a German cookbook published in 1532! \n While most donut shops tend to rely on fluorescent red, sickly sweet jelly, at Homemade Donuts we use a homemade strawberry compote. You'll taste the difference.",
            image: 'Jelly.jpg',
            category: categories[4]._id,
            price: 3.99,
            quantity: 12,
            reviews: []
        },
        {
            name: 'Chocolate',
            description: "Our delicious cake donut topped with our homemade chocolate glaze. Your favorite donut revisted.",
            image: 'Chocolate.jpg',
            category: categories[3]._id,
            price: 2.99,
            quantity: 12,
            reviews: []
        },
        {
            name: 'Chocolate Sprinkle',
            description: "Our delicious cake donut topped with our homemade chocolate glaze and Sprinkles ©️ brand rainbow sprinkles.",
            image: 'Chocsprinkle.jpg',
            category: categories[5]._id,
            price: 3.99,
            quantity: 12,
            reviews: []
        },
        {
            name: 'Rainbow Sprinkle',
            description: "Our delicious cake donut topped with our homemade glaze and Sprinkles ©️ brand rainbow sprinkles.",
            image: 'Rainbowsprinkle.jpg',
            category: categories[5]._id,
            price: 3.99,
            quantity: 12,
            reviews: []
        },
        {
            name: 'Cinnamon',
            description: "Our classic cake donut topped with butter and rolled in cinnamon sugar. The perfect anytime donut. \n This flavor truly doesn't get enough credit!",
            image: 'Cinnamon.jpg',
            category: categories[1]._id,
            price: 3.99,
            quantity: 12,
            reviews: []
        },
        {
            name: 'Powder',
            description: "Our classic cake donut topped with powdered sugar! For traditionalists.",
            image: 'Powder.jpg',
            category: categories[2]._id,
            price: 2.99,
            quantity: 12,
            reviews: []
        },
        {
            name: 'Boston Cream',
            description: `Our take on the northeastern classic. This donut was made out of inspiration from the Boston cream pie which was, in turn, created by chef M. Sanzian at Boston’s Parker House Hotel in 1856.\n
            A lot cheaper than a flight to Boston and just as authentic.`,
            image: 'Bostoncreme.jpg',
            category: categories[6]._id,
            price: 4.99,
            quantity: 12,
            reviews: [{
                reviewAuthor:'Stephanie',
                reviewText: 'Better than the pie!',
                reviewDate: '08/01/2019',
            },
            {
                reviewAuthor:'Emma',
                reviewText: `Honestly I prefer Dunkin's Boston Cream but I love supporting Hometown Donuts`,
                reviewDate: '04/16/2018',
            }]
        },
        {
            name: 'Lemon',
            description: `Our classic cake donut with our homemade lemon glaze \n. Try something new—this one is worth it.`,
            image: 'Lemon.jpg',
            category: categories[3]._id,
            price: 4.99,
            quantity: 12,
            reviews: []
        },
        {
            name: 'Apple Cider',
            description: `It’s a cider maker’s tradition to use some of the freshly pressed juice to make lightly tangy, apple-scented donuts like these. \n
            The cider adds more than flavor, though; its acidity makes the donuts tenderer. \n
            Try out this England Favorite today!
            (We made our own cider for this, so it's priced accordingly)`,
            image: 'Applecider.jpg',
            category: categories[1]._id,
            price: 4.99,
            quantity: 12,
            reviews: []
        },
        {
            name: 'Coconut',
            description: `Our classic cake donut topped with a coconut glaze and coconut flakes. Mmm.`,
            image: 'Coconut.jpg',
            category: categories[3]._id,
            price: 3.99,
            quantity: 12,
            reviews: []
        },
        {
            name: 'Apple Fritter',
            description: `Can you tell we like apples around here? Our take on the classic apple fritter; the glaze is made from our homemade apple cider (and its priced accordingly).`,
            image: 'Fritter.jpg',
            category: categories[7]._id,
            price: 4.99,
            quantity: 12,
            reviews: []
        },
        {
            name: 'Old Fashioned',
            description: `Your grandpa's favorite donut. Buy him one today!`,
            image: 'Oldfashioned.jpg',
            category: categories[3]._id,
            price: 4.99,
            quantity: 12,
            reviews: []
        },
        {
            name: 'Rainbow 🏳️‍🌈',
            description: `Our classic cake donut with homemade rainbow glazes. Glaze coloring made from organic extracts. \n
            A pride month favorite that has become one of our staples! ❤️ `,
            image: 'Rainbow.jpg',
            category: categories[8]._id,
            price: 5.99,
            quantity: 12,
            reviews: [{
                reviewAuthor:'Emma',
                reviewText: 'All I can say is YASS',
                reviewDate: '12/01/2021',
            },
            {
                reviewAuthor:'Troy',
                reviewText: 'Love is Love and this donut is delicious!',
                reviewDate: '03/20/2018',
            },
            {
                reviewAuthor:'Stephanie',
                reviewText: 'SO GOOD 😍',
                reviewDate: '02/19/2017',
            }]
        },
        {
            name: 'Unicorn 🦄',
            description: `Our best selling product and most-liked Instagram post.\n
            All icing and glazes are made in-house. Even the ears are made from icing! \n
            This was designed by one of our team members, Sarah, who has been a pastry chef for 12 years!`,
            image: 'Unicorn.jpg',
            category: categories[8]._id,
            price: 6.99,
            quantity: 12,
            reviews: []
        },
        
        
]);

console.log('Products Seeded');

await User.deleteMany();

await User.create({
    firstName: 'Stephanie',
    lastName: 'Heins',
    email: 'stephh@yahoo.com',
    password: '123456',
    orders: [
        {
            products: [products[0]._id, products[1]._id]
        }
    ]
});

await User.create({
    firstName: 'Emma',
    lastName: 'Graham',
    email: 'egraham@yahoo.com',
    password: '123456',
    orders: [
        {
            products: [products[1]._id, products[4]._id]
        }
    ]
});

await User.create({
    firstName: 'Troy',
    lastName: 'Atkinson',
    email: 'troyatkinson@yahoo.com',
    password: '123456',
    orders: [
        {
            products: [products[3]._id, products[2]._id]
        }
    ]
});

console.log('Users Seeded');




process.exit();


});