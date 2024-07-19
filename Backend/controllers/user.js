const { User, userValidate } = require("../models/user")
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const user = await User.findOne({ username: req.body.username });
        if (user) {
            return res.status(409).send({ message: 'User already exists!' });
        }
    
        req.body.password = hashedPassword;

        await new User(req.body).save();
        res.status(201).send({ message: "User created successfully!" });
      } catch (err) {
        res.status(500).json({msg: "Internal Server Error:", err});
      }
}

const loginUser = async (req, res) => {
    try {
        let user = await User.findOne({ username: req.body.username });
        if (!user) {
        return res.status(401).send({ message: `User does not exist` });
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
        return res.status(401).send({ message: 'Invalid password' });
        }
        
        res.status(200).send({ data: user, message: `Logged in successfully!` });
    } catch (err) {
        console.log("error: ", err);
        res.status(500).send({ message: 'Internal Server Error' });
  }
}

const changePassword = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username});
    if (!user) {
        return res.status(404).send({ message: "User not found" });
    }
    user.password = await bcrypt.hash(req.body.password, 10);

    await user.save();
    res.send({ message: "User password changed successfully", user });
  } catch (error) {
    res.status(500).json({ message: 'Error changing password of job' });
  }
}

const userProfile = async (req, res) => {
  const username = req.params.username;

  try {
    const user = await User.find({username: username});
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json("No such User");
    }
  } catch (error) {
    res.status(500).json(error);
  }
}

const updateInventory = async (req, res) => {

}

module.exports = { registerUser, loginUser, changePassword, userProfile, updateInventory };