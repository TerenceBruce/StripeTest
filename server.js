// This is your test secret API key.
const stripe = require('stripe')('sk_test_51Mc88OKvwrA3TKTQRz4jMoqdMgGMSEal5SIzyhanhVlPJQg6NwOHh71fW6w8lyWoyUOAhevbEn7jQuVvLkQcJwTc00hg7BVwhS');
const express = require('express');
const app = express();
app.use(express.static('public'));

const YOUR_DOMAIN = 'http://localhost:3001';

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: '{{PRICE_ID}}',
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}?success=true`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
    automatic_tax: {enabled: true},
  });

  res.redirect(303, session.url);
});

app.listen(3001, () => console.log('Running on port 3001'));