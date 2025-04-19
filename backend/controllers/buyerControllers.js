const Product = require('../models/buyer');

exports.addProduct = async (req, res) => {
    try {
        // const product = new Product(req.body);
        // await product.save();
        // res.status(201).json(product);
        console.log(req.body.name);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getProducts = async (req, res) => {
    try {
        // const products = await Product.find();
        // res.json(products);
        res.json({msg: 'hello from server'});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
