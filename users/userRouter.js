const express = require('express');
const userDb = require('./userDb');
const postDb = require('../posts/postDb');

const router = express.Router();

router.post('/', [validateUser], (req, res) => {
    const user = req.body;
    userDb.insert(user)
        .then(createdUser => {
            res.status(200).json(createdUser)
        })
        .catch(err => {
            res.status(500).json({
                error: "There was an error while saving the user to the database " + err
            })
        })
});

router.post('/:id/posts', [validateUserId, validatePost], (req, res) => {
    const post = req.body;

    postDb.insert(post)
        .then(createdPost => {
            res.status(200).json(createdPost)
        })
        .catch(err => {
            res.status(500).json({
                error: "There was an error while saving the user to the database " + err
            })
        })
});

router.get('/', (req, res) => {
    userDb.get()
        .then(users => {
            res.json(users)
        })
        .catch(err => {
            res.status(500).json({
                error: "The user information could not be retrieved. " + err
            })
        })
});

router.get('/:id', [validateUserId], (req, res) => {
    res.status(200).json(req.user)
});

router.get('/:id/posts', [validateUserId], (req, res) => {
    const id = req.params.id;

    userDb.getUserPosts(id)
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(err => {
            res.status(500).json({
                error: "The user information could not be retrieved. " + err
            })
        })
});

router.delete('/:id', [validateUserId], (req, res) => {
    const id = req.params.id;

    userDb.remove(id)
        .then(response => {
            res.status(200).json({
                message: `${response} user deleted`
            })
        })
        .catch(err => {
            res.status(500).json({
                error: "The user could not be removed " + err
            })
        })
});

router.put('/:id', [validateUserId, validateUser], (req, res) => {
    const id = req.params.id;
    const user = req.body;

    userDb.update(id, user)
        .then(() => {
            userDb.getById(id).then(updatedUser => {
                res.status(200).json(updatedUser)
            })
        })
        .catch(() => {
            res.status(500).json({
                error: "There was an error while saving the user to the database"
            })
        })
});

//custom middleware

function validateUserId(req, res, next) {
    const id = req.params.id;

    userDb.getById(id)
        .then(user => {
            if (user) {
                req.user = user
                next()
            } else {
                res.status(400).json({
                    message: "invalid user id"
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                error: "The user information could not be retrieved. " + err
            })
        })
}

function validateUser(req, res, next) {
    if (Object.keys(req.body).length > 0) {
        if (Object.keys(req.body).includes('name')) {
            next()
        } else {
            res.status(400).json({
                message: "missing required name field"
            })
        }
    }
    else {
        res.status(400).json({
            message: "missing user data"
        })
    }
}

function validatePost(req, res, next) {
    if (Object.keys(req.body).length > 0) {
        if (Object.keys(req.body).includes('text')) {
            next()
        } else {
            res.status(400).json({
                message: "missing required text field"
            })
        }
    } else {
        res.status(400).json({
            message: "missing post data"
        })
    }
}

module.exports = router;
