import redis form 'redis';
const express = require('express');
const app = express();

const redisClient = redis.createClient();

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

function reserveStockById(itemId, stock){
    redisClient.set(itemId, stock, redis.print)
}

const getAsync = promisify(redisClient.get).bind(client);

async function getCurrentReservedStockById(itemId) {
    try {
	    const value = await getAsync(itemId);
	    return value;
    } catch(err) {
	    console.log(err);
    }
}

const port = 1245;
const hostitemName = '127.0.0.1';

app.get('/list_products', (req, res) => {
    res.json(listProducts);
});

app.get('/list_products/:itemId', (req, res) => {
	const product = getItemByitemId(itemId);
	if (!product) {
		res.json({"status":"Product not found"});
	}
	const productCurrentAvailability = getCurrentReservedStockById(itemId);
	if (productCurrentAvailability) {
		product["currentQuantity"] = productCurrentAvailability;
	}
	res.json(product);
});

app.get('/reserve_product/:itemId, (req, res) => {
	const product = getItemByitemId(itemId);
        if (!product) {
                res.json({"status":"Product not found"});
        }

	if (product.

app.listen(port, () => {
    console.log(`Server running at http://${hostitemName}:${port}/`);
});

redisClient.on('connect', () => {
	console.log('Redis client connected to the server');
});

redisClient.on('error', (err) => {
	console.log(`Redis client not connected to the server: ${err}`);
});
