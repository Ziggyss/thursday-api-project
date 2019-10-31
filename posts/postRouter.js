const express = require("express");
const Posts = require("./postDb");

const router = express.Router();

router.get("/", (req, res) => {
  Posts.get()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res.status(500).json({
        message: err.message
      });
    });
});

router.get("/:id", validatePostId, (req, res) => {
  const post = req.post;
  res.status(200).json(post);
});

router.delete("/:id", validatePostId, (req, res) => {
  Posts.remove(req.post.id)
    .then(() => {
      res
        .status(200)
        .json({ message: "The post has been successfully deleted" });
    })
    .catch(error => {
      res.status(500).json({
        message: `Error removing the post: ${error.message}`
      });
    });
});

router.put("/:id", validatePostId, (req, res) => {
  const { id } = req.params;
  const updatedPost = req.body;
  Posts.update(id, updatedPost)
    .then(post => {
      res.status(200).json({
        message: `You successfully updated your post`,
        post
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Error updating the post: " + error.message
      });
    });
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
}

module.exports = router;
