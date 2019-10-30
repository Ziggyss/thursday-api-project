const express = require("express");
const Users = require("./userDb");
const Posts = require("../posts/postDb");

const router = express.Router();

router.post("/", validateUser, (req, res) => {
  const newUser = req.body;
  Users.insert(newUser)
    .then(user => {
      res.status(200).json({
        message: "New user added successfully",
        user
      });
    })
    .catch(err => {
      res.status(500).json({
        message: "Uh oh. There was an error adding the user",
        error: err.message
      });
    });
});

router.post("/:id/posts", [validateUserId, validatePost], (req, res) => {
  const newPost = req.body;
  Posts.insert(newPost)
    .then(post => {
      res.status(200).json({
        message: "New post added",
        post
      });
    })
    .catch(err => {
      res.status(500).json({
        message: "Something went wrong when adding the new post",
        error: err.message
      });
    });
});

router.get("/", (req, res) => {
  Users.get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({
        message: err.message
      });
    });
});

router.get("/:id", validateUserId, (req, res) => {
  const user = req.user;
  res.status(200).json(user);
});

router.get("/:id/posts", validateUserId, (req, res) => {
  const { id } = req.params;
  Users.getUserPosts(id)
    .then(posts => {
      if (posts.length > 0) {
        res.status(200).json(posts);
      } else {
        res.json({
          message: "There are no posts yet."
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        message: err.message
      });
    });
});

router.delete("/:id", validateUserId, (req, res) => {
  Users.remove(req.user.id)
    .then(() => {
      res.status(200).json({ message: "The user has been deleted" });
    })
    .catch(error => {
      res.status(500).json({
        message: `Error removing the user: ${error.message}`
      });
    });
});

router.put("/:id", validateUserId, (req, res) => {
  const { id } = req.params;
  const newUser = req.body;
  Users.update(id, updatedUser)
    .then(user => {
      res.status(200).json({
        message: `You successfully updated ${updatedUser.name}`,
        user
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Error updating the user: " + error.message
      });
    });
});

//custom middleware

function validateUserId(req, res, next) {
  const { id } = req.params;
  Users.getById(id)
    .then(user => {
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(400).json({
          message: "Invalid user id"
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        message: err.message
      });
    });
}

function validateUser(req, res, next) {
  if (!Object.keys(req.body).length) {
    res.status(400).json({ message: "missing user data" });
  } else if (!req.body.name) {
    res.status(400).json({
      message: "missing required name field"
    });
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  if (!Object.keys(req.body).length) {
    res.status(400).json({ message: "missing post data" });
  } else if (!req.body.text) {
    res.status(400).json({
      message: "missing required text field"
    });
  } else {
    next();
  }
}

module.exports = router;
