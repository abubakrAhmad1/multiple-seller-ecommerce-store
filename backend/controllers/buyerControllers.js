const Buyer = require('../models/buyer');

exports.signIn = async (req, res) => {
    try {

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.signUp = async (req, res) => {
    try {
        const newBuyer = new Buyer(req.body);
        const savedUser = await newBuyer.save();
        res.json(savedUser);
        // res.json({msg: 'hello from server'});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
