const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// API endpoint to calculate total value of products
app.post('/api/products/total', (req, res) => {
    const products = req.body.products;

    // Validate input
    if (!Array.isArray(products)) {
        return res.status(400).json({ error: 'Products must be an array' });
    }

    let totalValue = 0;

    // Calculate total value
    for (const product of products) {
        const { name, price, quantity } = product;

        // Validate product properties
        if (typeof name !== 'string' || typeof price !== 'number' || typeof quantity !== 'number') {
            return res.status(400).json({ error: 'Invalid product object' });
        }

        totalValue += price * quantity; // Calculate total for this product
    }

    // Return the total value
    res.json({ totalValue });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
