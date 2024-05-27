// Payment endpoint
import express from 'express';
import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51PKPiKRwQL00CT5o2pM4fO7eMPJ7tnjecnCQg7kWljIrlt2CqzkcbWy9bvzIY3D8wZVgxXfg8wffMueLPmbyYlzO00m3FN3mJu');
const router = express();

router.post('/create-checkout-session', async (req, res) => {
    try {
        const { amount } = req.body;

        // Create a payment intent with Stripe
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'Total Payment',
                        },
                        unit_amount: amount,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: 'http://localhost:5173/user/success', // Update this URL to your success page
            cancel_url: 'http://localhost:5173/user/cancel',   // Update this URL to your cancel page
        });

        // Respond with the session ID
        res.json({ id: session.id });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).json({ error: 'Could not create checkout session' });
    }
});
  export default router;    