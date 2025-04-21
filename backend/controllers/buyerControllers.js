const Buyer = require("../models/buyer");

exports.signIn = async (req, res) => {
  try {
    const { name, password } = req.body;

    const user = await Buyer.findOne({ name });

    if (user && user.password === password) {
      console.log("USER FOUND..!!!", user);
      res.json(user);
    } else {
      console.log("USER NOT FOUND..!!!");
      res.status(401).json({ msg: "No user found or incorrect password" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.signUp = async (req, res) => {
  try {
    const newBuyer = new Buyer(req.body);
    const savedUser = await newBuyer.save();
    res.json(savedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
