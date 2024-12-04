import redis from 'redis';
const express = require('express');
const app = express();

const redisClient = redis.createClient();

const listProducts = [
    { itemId: 1, itemName: 'Suitcase 250', price: 50, initialAvailableQuantity: 4 },
    { itemId: 2, itemName: 'Suitcase 450', price: 100, initialAvailableQuantity: 10 },
    { itemId: 3, itemName: 'Suitcase 650', price: 350, initialAvailableQuantity: 2 },
    { itemId: 4, itemName: 'Suitcase 1050', price: 550, initialAvailableQuantity: 5 },
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

const getAsync = promisify(redisClient.get).bind(redisClient);

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
	const ReservedStockQuantity = getCurrentReservedStockById(itemId);
	if (ReservedStockQuantity) {
		product["ReservedStockQuantity"] = product.initialAvailableQuantity - ReservedStockQuantity;
	}
	res.json(product);
});

app.get('/reserve_product/:itemId', (req, res) => {
	const product = getItemByitemId(itemId);
    if (!product) {
            res.json({"status":"Product not found"});
    }

    if (product.initialAvailableQuantity < 1) {
        res.json({ status: "Not enough stock available", itemId: itemId })
    }
    else {
        reserveStockById(itemId, 1) // Reserve one stock
        res.json({ status:"Reservation confirmed", itemId: itemId });
    }
})

app.listen(port, () => {
    console.log(`Server running at http://${hostitemName}:${port}/`);
});

redisClient.on('connect', () => {
	console.log('Redis client connected to the server');
});

redisClient.on('error', (err) => {
	console.log(`Redis client not connected to the server: ${err}`);
});
