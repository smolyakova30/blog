const { Post } = require('../models');

const postData = [{
        title: 'First Post',
        content: 'Post for first user.',
        user_id: 1

    },
    {
        title: 'Second Post',
        content: 'Post for second user.',
        user_id: 2
    },
    {
        title: 'Third Post',
        content: 'Post for third user.',
        user_id: 3
    }
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;