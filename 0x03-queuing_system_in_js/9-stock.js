const express = require('express');

const app = express();

const listProducts = [
    { Id: 1, name: 'Suitcase 250', price: 50, stock: 4 },
    { Id: 2, name: 'Suitcase 450', price: 100, stock: 10 },
    { Id: 3, name: 'Suitcase 650', price: 350, stock: 2 },
    { Id: 4, name: 'Suitcase 1050', price: 550, stock: 5 },
]

function getItemById(id) {
    for (const product of listProducts) {
        if (product.Id === id) {
            return product
        }
    }
}

const port = 1245;
const hostname = '127.0.0.1';

app.get('/list_products', (req, res) => {
    res.json(listProducts);
})

app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
})