require('dotenv').config();
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || 'sk_test_your_key');
const app = express();

console.log('Server starting...');

app.use(express.json());

app.get('/', (req, res) => {
	    res.send('Server is running!');
});

app.post('/create-payment', async (req, res) => {
	    console.log('Received payment request');
	    try {
		            const paymentIntent = await stripe.paymentIntents.create({
				                amount: 2000,
				                currency: 'usd',
				                payment_method_types: ['card'],
				                payment_method: 'pm_card_visa',
				                confirm: true,
				            });
		            console.log('Payment intent created');
		            res.json({ success: true, paymentIntent });
		        } catch (error) {
				        console.error('Payment error:', error);
				        res.status(500).json({ success: false, error: error.message });
				    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	    console.log(`Server running on port ${PORT}`);
});

// Add error handling
process.on('uncaughtException', err => {
     console.error('Uncaught Exception:', err);
         process.exit(1);
         });
