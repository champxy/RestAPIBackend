const Product = require('../models/product');

 exports.read = async (req, res) => {
    try {
        const id = req.params.id;
        const producted = await Product.findById(id).exec();
        res.send(producted);
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
};

exports.list = async (req, res) => {
    try {
        const producted = await Product.find({}).exec();
        res.send(producted);
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
}

exports.create = async (req, res) => {
    try {
        console.log(req.body);
        if (!req.body.name || !req.body.detail || !req.body.price) {
            return res.status(400).send('All fields are required');
        }else{
            const producted = await Product.create(req.body);
            res.send(producted);
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
}

exports.update = async (req, res) => {
    try { 
        const id = req.params.id;
        const update = await Product.findByIdAndUpdate (id, req.body, {new: true}).exec();
        res.send(update);
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
}

exports.remove = async (req, res) => {
    try {
        const id = req.params.id;
        const remove = await Product.findByIdAndDelete(id).exec();
        if (!remove) {
            return res.status(400).send('Product not found');
        }else{
            res.send('Product removed');
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
}