const { Comment } = require('../models');

const commentData = [{
        comment_text: "Nice post!",
        user_id: 1,
        post_id: 1
    },
    {
        comment_text: "Awesome!",
        user_id: 2,
        post_id: 2
    },
    {
        comment_text: "Right more!",
        user_id: 3,
        post_id: 3
    }
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;