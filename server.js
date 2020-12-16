const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const products = require('./data/products');

dotenv.config()

const app = express();

app.use(cors());

app.get('/', (req, res) => {
    res.send(`It's working`);
});

app.get('/api/products', (req, res) => {
    res.json(products);
});

app.get('/api/product/:id', (req, res) => {
    const product = products.find(item => item._id === req.params.id)
    res.json(product)
});

app.listen(5000, () => {
    console.log('App listening on port 5000!');
});