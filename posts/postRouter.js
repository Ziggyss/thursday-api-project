const express = 'express';
const Posts = require('../posts/postDb');

const router = express.Router();

router.get('/', (req, res) => {


});

router.get('/:id', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

// custom middleware

function validatePostId(req, res, next) {
    const { id } = req.params;
    Posts.getById(id)
      .then(post => {
        if (post) {
          req.post = post;
          next();
        } else {
          res.status(400).json({
            message: "Invalid post id"
          });
        }
      })
      .catch(err => {
        res.status(500).json({
          message: err.message
        });
      });

};

module.exports = router;