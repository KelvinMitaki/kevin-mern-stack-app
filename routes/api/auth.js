const route = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../../model/User");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../../middleware/auth");
route.post("/", (req, res) => {
  const { email, password } = req.body;

  //check if all fields are filled
  if (!email || !password) {
    return res.status(400).json({ msg: "Please fill in all fields" });
  }

  //check if user already exists
  User.findOne({ email: email }).then(user => {
    if (!user) {
      return res.status(400).json({ msg: "User doesnot exist" });
    }

    //compare passwords
    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch) {
        return res.status(400).json({ msg: "The password is incorrect" });
      } else {
        jwt.sign(
          { id: user.id },
          config.get("jwtSecret"),
          { expiresIn: 3600 },
          (err, token) => {
            if (err) throw err;
            res.json({
              token: token,
              user: {
                id: user.id,
                name: user.name,
                email: user.email
              }
            });
          }
        );
      }
    });
  });
});

route.get("/user", auth, (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then(user => res.json(user));
});

module.exports = route;
