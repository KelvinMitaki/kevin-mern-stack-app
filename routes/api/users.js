const route = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../../model/User");
const jwt = require("jsonwebtoken");
const config = require("config");
route.post("/", (req, res) => {
  const { name, email, password } = req.body;

  //check if all fields are filled
  if (!name || !email || !password) {
    return res.status(400).json({ msg: "Please fill in all fields" });
  }

  //check if user already exists
  User.findOne({ email: email }).then(user => {
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }
    const newUser = new User({
      name,
      email,
      password
    });
    //generate salt
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        //hash the password
        newUser.password = hash;
        //save user
        newUser.save().then(user => {
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
        });
      });
    });
  });
});

module.exports = route;
