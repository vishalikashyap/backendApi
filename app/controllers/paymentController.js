const paypal = require('@paypal/checkout-server-sdk');
const client = require('../utils/paypalClient'); // We'll create this next

exports.createOrder = async (req, res) => {
  const { amount } = req.body;
  const request = new paypal.orders.OrdersCreateRequest();
  request.prefer('return=representation');
  request.requestBody({
    intent: 'CAPTURE',
    purchase_units: [{
      amount: {
        currency_code: 'USD',
        value: amount.toString(),
      },
    }],
  });

  try {
    const order = await client.execute(request);
    res.json({ orderID: order.result.id });
  } catch (err) {
    console.error('Create Order Error:', err);
    res.status(500).json({ error: 'Failed to create order' });
  }
};

exports.captureOrder = async (req, res) => {
  const { orderID } = req.body;
  const request = new paypal.orders.OrdersCaptureRequest(orderID);
  request.requestBody({});

  try {
    const capture = await client.execute(request);
    res.json(capture.result);
  } catch (err) {
    console.error('Capture Order Error:', err);
    res.status(500).json({ error: 'Failed to capture order' });
  }
};
