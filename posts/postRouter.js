const express = require('express');
const postDb = require('./postDb');

const router = express.Router();

router.get('/', (req, res) => {
    postDb.get()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json({
                error: "The post information could not be retrieved. " + err
            })
        })
});

router.get('/:id', [validatePostId], (req, res) => {
    res.json(req.post)
});

router.delete('/:id', [validatePostId], (req, res) => {
    const id = req.params.id;
    
    postDb.remove(id)
        .then(data => {
            res.status(200).json({
                message: `${data} post deleted`
            })
        })
        .catch(err => {
            res.status(500).json({
                error: "The post could not be removed " + err
            })
        })
});

router.put('/:id', [validatePostId], (req, res) => {
    const id = req.params.id;
    const user = req.body;

    postDb.update(id, user)
        .then(() => {
            postDb.getById(id).then(updatedPost => {
                res.status(200).json(updatedPost)
            })
        })
        .catch(() => {
                res.status(500).json({
                    error: "There was an error while saving the post to the database"
                })
            })
});

// custom middleware

function validatePostId(req, res, next) {
    const id = req.params.id;
    postDb.getById(id)
        .then(data => {
            if(data){
                req.post = data
                next()
            }
            else {
                res.status(400).json({
                    message: "invalid post id"
                })
            }
        })
        .catch( err => {
            res.status(500).json({
                error: "Post information could not be retrieved " + err
            })
        })
};

module.exports = router;