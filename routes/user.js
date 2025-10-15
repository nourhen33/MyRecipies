const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const isAuth = require("../middleware/passport");
const {
  loginRules,
  registerRules,
  validation,
} = require("../middleware/validator");




// register
userRouter.post("/register", registerRules(), validation, async (req, res) => {
  const { name, lastname,email, password } = req.body;
  try {
    const newuser = new User(req.body);
    // check if the email exist
   const searchedUser = await User.findOne({ email });
    if (searchedUser) {
      return res.status(400).send({ msg: "email already exist" });
    }
    //  hash password
    const salt = 10;
    const genSalt = await bcrypt.genSalt(salt);
    const hashedPassword = await bcrypt.hash(password, genSalt);
    newuser.password = hashedPassword;
    
    // generate a token
      const payload = {
      _id: newuser._id,
      name: newuser.name,
    };
    const token = await jwt.sign(payload, process.env.SecretOrkey, {
     expiresIn: 86400,
    });
    // save the user
    let result = await newuser.save();
    
    res.send({ user: result, msg: "user is added", token });
  } catch (error) {
    console.log(error);
     res.status(500).send({ msg: "Server error" });
  }
});

//login
userRouter.post("/login", loginRules(), validation, async (req, res) => {
  const { email, password } = req.body;
  try {
    // find if user exist
     const searchedUser = await User.findOne({ email });
    // if the email not exist
    if (!searchedUser) {
      return res.status(400).send({ msg: "Bad Credential" });
    }
    // password are equals
    const match = await bcrypt.compare(password, searchedUser.password);
    if (!match) {
      return res.status(400).send({ msg: "Bad Credential" });
    }
     
  
    // cree un token
     const payload = {
      _id: searchedUser._id,
    };
    const token = await jwt.sign(payload, process.env.SecretOrkey, {
      expiresIn: 86400,
    });
      console.log(token);
        //save user
    res.send({ user: searchedUser, msg: "Success", token: `Bearer ${token}` });
  } catch (error) {
    console.log(error);
  }
});
//get current user
userRouter.get("/current", isAuth(), (req, res) => {
  res.status(200).send({ user: req.user });
});




//get all users
userRouter.get("/", async (req, res) => {
  try {
    let result = await User.find();
    res.send({ users: result, msg: "all users" });
  } catch (error) {
    console.log(error);
  }
});

//get user by id
userRouter.get("/:id", async (req, res) => {
  try {
    let result = await User.findOne(req.params.id);
    res.send({ user: result, msg: "User By Id" });
  } catch (error) {
    console.log(error);
  }
});

//update user

userRouter.put("/:id", async (req, res) => {
  try {
    const { password, ...otherUpdates } = req.body;

    // Hash password if it's provided
    if (password) {
      const salt = await bcrypt.genSalt(10);
      otherUpdates.password = await bcrypt.hash(password, salt);
    }

    let result = await User.findByIdAndUpdate(
      req.params.id,
      { $set: otherUpdates },
      { new: true }
    );

    if (!result) {
      return res.status(404).send({ msg: "User not found" });
    }

    res.send({ msg: "User is updated", user: result });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

//delete user
userRouter.delete("/:id", async (req, res) => {
  try {
    const result = await User.findByIdAndDelete(req.params.id);
    res.send("user deleted");
  } catch (error) {
    console.log(error);
  }
});


module.exports = userRouter;
