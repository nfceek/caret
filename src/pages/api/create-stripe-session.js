const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function CreateStripeSession(req, res) {
  const { item } = req.body;
  console.log('create session ' + JSON.stringify(item))
  const redirectURL =
    //process.env.NODE_ENV === 'development' && 'http://localhost:3000';
    process.env.NODE_ENV === 'production' && 'https://caret.cloud';
  const transformedItem = {
    price_data: {
      currency: 'usd',
      product_data: {
        images: [item.image],
        name: item.name,
      },
      unit_amount: item.price * 100,
    },
    description: item.description,
    quantity: item.quantity,
  };

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [transformedItem],
    mode: 'payment',
    success_url: redirectURL + '/complete?status=success&caret=' + item.caret,
    cancel_url: redirectURL + '/complete?status=fail&caret=' + item.caret,
    //cancel_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
    metadata: {
      images: item.image,
    },
  });

  res.json({ id: session.id });
}

export default CreateStripeSession;