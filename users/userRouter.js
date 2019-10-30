const express = require('express');
const db = require('./userDb');

const router = express.Router();

router.post('/', (req, res) => {

});

router.post('/:id/posts', (req, res) => {

});

router.get('/', (req, res) => {
    db.get()
        .then( users => {
            res.json(users)
        })
        .catch(err => {
            res.status(500).json({
                error: "The post information could not be retrieved. " + err
            })
        })
});

router.get('/:id', [validateUserId], (req, res) => {
    res.status(200).json(req.user)
});

router.get('/:id/posts', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

//custom middleware

function validateUserId(req, res, next) {
    const id = req.params.id;

    db.getById(id)
        .then(user => {
            if(user){
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
                error: "The post information could not be retrieved. " + err
            })
        })
}

function validateUser(req, res, next) {

};

function validatePost(req, res, next) {

};

module.exports = router;
