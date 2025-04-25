const sellers = require('../models/seller');

exports.signUp = async(req ,res) => {
    const newSeller = new sellers(req.body);
    const seller = await newSeller.save();
    res.json(seller);
};

exports.signIn = async (req,res) => {
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

exports.addProduct = async (req,res) => {
  
};