// base from module 14
const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// get all posts
router.get('/', withAuth, (req, res) => {
    Post.findAll({
            where: {
                user_id: req.session.user_id
            },
            attributes: [
                'id',
                'title',
                'content',
                'created_at'
            ],
            include: [{
                    model: Comment,
                    attributes: [
                        'id',
                        'comment_text',
                        'post_id',
                        'user_id',
                        'created_at'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        })
        .then(dbPostData => {
            const posts = dbPostData.map(post => post.get({ plain: true }));
            res.render('dashboard', { posts, loggedIn: true });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// get post by id
router.get('/edit/:id', withAuth, (req, res) => {
    Post.findOne({
            where: {
                id: req.params.id
            },
            attributes: [
                'id',
                'title',
                'content',
                'created_at'
            ],
            include: [{
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Comment,
                    attributes: [
                        'id',
                        'comment_text',
                        'post_id',
                        'user_id',
                        'created_at'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                }
            ]
        })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'We do not have post with this id' });
                return;
            }

            const post = dbPostData.get({ plain: true });
            res.render('edit-post', {
                 post,
                 loggedIn: true
                 });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
})

router.get('/delete/:id', withAuth, (req, res) => {
    Post.destroy({
    where: {
        id: req.params.id
    }
}).then(dbCommentData => {
    if (!dbCommentData) {
        res.status(404).json({ message: 'We do not have comment with this id' });
        return;
    }
    res.redirect('/dashboard')
}).catch(err => {
    console.log(err);
    res.status(500).json(err);
});
});

router.get('/new', (req, res) => {
    res.render('new-post');
});



module.exports = router