// Server packages 
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

// Dotenv package to use an environment variable file
require('dotenv').config();

// Import the Solana web3.js package
const { Connection, PublicKey, LAMPORTS_PER_SOL } = require('@solana/web3.js');

// Env variables, taken from the .env file.
const PORT = process.env.PORT || 5000
const SOLANA_RPC_URL = process.env.SOLANA_RPC_URL

// Create a new Express app
const app = express();

// Set the JSON parser middleware to parse the body of incoming requests
app.use(express.json());

// Rate limiting, limit the amount of request a user can send within a spesific amount of time.
// With this set up the user can only make 100 request max every 10 minutes.
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes in ms.
    max: 100 // 100 request max.
})

app.use(limiter)
app.set('trust proxy', 1)

// Set static folder, this allows our server to pick up the html file in the src folder.
app.use(express.static('src'))

// Define a route that accepts POST requests to query the balance of a Solana address
app.post('/balance', async (req, res) => {
    // Get the Solana address from the request body
    const {
        address
    } = req.body;

    // Create a new Solana connection
    const connection = new Connection(SOLANA_RPC_URL);

    try {
        // Query the balance of the Solana address using the connection
        const publicKey = new PublicKey(address);
        const balance = await connection.getBalance(publicKey);
        const balanceInSOL = balance / LAMPORTS_PER_SOL;

        // Send the balance back in the response
        res.send({
            balance: balanceInSOL.toString()
        });
    } catch (error) {
        // If there was an error, send a 500 Internal Server Error response
        res.status(500).send({
            error: error.message
        });
    }
});

// Enable cors
app.use(cors());

// Start the Express app on port 5000
app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});