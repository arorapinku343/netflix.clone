const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || '');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/create-checkout-session', auth(), async (req,res)=>{
  try{
    const domain = process.env.FRONTEND_URL || 'http://localhost:3000';
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [{ price_data: { currency: 'usd', product_data: { name: 'Subscription' }, unit_amount: 499 }, quantity: 1 }],
      success_url: `${domain}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${domain}/cancel`
    });
    res.send({ url: session.url });
  }catch(err){ res.status(500).send({ message: 'Stripe error', error: err.message }) }
});

module.exports = router;
