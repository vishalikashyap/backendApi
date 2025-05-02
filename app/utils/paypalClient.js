const paypal = require('@paypal/checkout-server-sdk');

const clientId ="AYzDi8QGXpKU8bDJJBkhbyJSGzT_PtpPqg0xzD2Rm1782iASscIosTTgWHCNegy6Nx-vLvNWgngpxEQU";
const clientSecret = PAYPAL_CLIENT_SECRET="EHLZU3CCXQvNAHaHneavkaKUjkkVL9fSGEBD2Pa9rrT-GMZK-1jWtLuYCQtcPwlk4yvxmtvU_44K7I4D";

const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
const client = new paypal.core.PayPalHttpClient(environment);

module.exports = client;
