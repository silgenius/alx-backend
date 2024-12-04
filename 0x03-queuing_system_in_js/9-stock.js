const express = require('express');

const app = express();

const listProducts = [
    { itemId: 1, itemName: 'Suitcase 250', price: 50, stock: 4 },
    { itemId: 2, itemName: 'Suitcase 450', price: 100, stock: 10 },
    { itemId: 3, itemName: 'Suitcase 650', price: 350, stock: 2 },
    { itemId: 4, itemName: 'Suitcase 1050', price: 550, stock: 5 },
]

function getItemByitemId(id) {
    for (const product of listProducts) {
        if (product.itemId === id) {
            return product
        }
    }
}

const port = 1245;
const hostitemName = '127.0.0.1';

app.get('/list_products', (req, res) => {
    res.json(listProducts);
})

app.listen(port, () => {
    console.log(`Server running at http://${hostitemName}:${port}/`);
})