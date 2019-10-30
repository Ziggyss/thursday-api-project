const express = require("express");
const Users = require("./userDb");

const router = express.Router();

router.post("/", (req, res) => {});

router.post("/:id/posts", validateUserId, (req, res) => {});

router.get("/", (req, res) => {
   Users.get()
   .then(users => {
       res.status(200).json(users)
   })
   .catch(err => {
       res.status(500).json({
           message: err.message
       })
   })
});

router.get("/:id", validateUserId, (req, res) => {

});

router.get("/:id/posts", validateUserId, (req, res) => {});

router.delete("/:id", validateUserId, (req, res) => {});

router.put("/:id", validateUserId, (req, res) => {});

//custom middleware

function validateUserId(req, res, next) {
  const { id } = req.params;
  if (id.match(/^[0-9]*$/gm) !== null) {
    //Thank you Samuel!
    next();
  } else {
    res.status(400).json({
      message: "Invalid user id",
    });
  }
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
