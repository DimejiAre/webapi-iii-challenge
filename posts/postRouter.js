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

router.get('/:id', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

// custom middleware

function validatePostId(req, res, next) {
    const id = req.params.id;
    postDb.getById(id)
        .then(data => {
            if(data){
                req.post = data
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