const paypal = require('@paypal/checkout-server-sdk');
require('dotenv').config();

const environment = process.env.PAYPAL_MODE === 'sandbox'
  ? new paypal.core.SandboxEnvironment(process.env.PAYPAL_CLIENT_ID, process.env.PAYPAL_CLIENT_SECRET)
  : new paypal.core.LiveEnvironment(process.env.PAYPAL_CLIENT_ID, process.env.PAYPAL_CLIENT_SECRET);

const paypalClient = new paypal.core.PayPalHttpClient(environment);

module.exports = paypalClient;
