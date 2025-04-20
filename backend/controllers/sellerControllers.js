const sellers = require('../models/seller');

exports.signUp = async(req ,res) => {
    const newSeller = new sellers(req.body);
    const seller = await newSeller.save();
    res.json(seller);
};

// exports.signIn = async(req, res)=>{
//     //code
// };