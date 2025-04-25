const sellers = require("../models/seller");

exports.signUp = async (req, res) => {
  const newSeller = new sellers(req.body);
  const seller = await newSeller.save();
  res.json(seller);
};

exports.signIn = async (req, res) => {
  try {
    const { name, password } = req.body;

    const user = await sellers.findOne({ name });

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

exports.addProduct = async (req, res) => {
  // console.log(req.body);
  const { name } = req.body;
  const obj = {
    title: req.body.title,
    price: req.body.price,
    discription: req.body.discription,
    qty: req.body.qty,
    imageUrl: req.body.imageUrl,
  };

  try {
    console.log("enter in try");
    const user = await sellers.findOne({ name });

    user.products.push(obj);
    await user.save();
    console.log(user);
    if (!updatedSeller) {
      return res.status(404).json({ message: "Seller not found" });
    }
    console.log(updatedSeller);
    res.status(200).json(updatedSeller);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
