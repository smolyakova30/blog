const { User } = require('../models');

const userData = [{
        username: 'Maria',
        password: '12345'

    },
    {
        username: 'Tom',
        password: '12345'
    },
    {
        username: 'Bill',
        password: '12345'
    }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;