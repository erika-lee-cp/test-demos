const { ClerkExpressRequireAuth, ClerkExpressWithAuth } = require('@clerk/clerk-sdk-node');
const cors = require('cors')
const express = require('express')
require('dotenv').config()
const { Webhook } = require('svix')

const bodyParser = require("body-parser");

const port = process.env.PORT || 3000;
const app = express();
app.use(cors());


// see https://docs.svix.com/receiving/verifying-payloads/how#nodejs-express
app.post(
  '/api/webhooks',
  bodyParser.raw({type: 'application/json'}), (req, res) => {
      // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
      const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET

      if (!WEBHOOK_SECRET) {
        throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
      }

      console.log(req.headers)
      const payload = req.body;
      const headers = req.headers;
  
      const wh = new Webhook(WEBHOOK_SECRET);
      let msg;
      try {
          msg = wh.verify(payload, headers);
      } catch (err) {
        console.log(err)
        res.status(400);
      }

      // Do something with the payload
      // For this guide, you simply log the payload to the console
      const { id } = msg.data;
      const eventType = msg.type;
      console.log(`Webhook with and ID of ${id} and type of ${eventType}`)
      console.log('Webhook body:', req.body)
      if (eventType === 'user.updated') {
        console.log('userId:', msg.data)
      }

      res.status(200)
  }
);

// this has to be defined after the webhook
// https://stackoverflow.com/questions/76281195/stripe-webhook-payload-must-be-provided-as-a-string-or-a-buffer
app.use(express.json());


// Use the strict middleware that raises an error when unauthenticated
app.get(
  '/protected-path',
  ClerkExpressWithAuth({
    // Add options here
    // See the Middleware options section for more details
  }),
  (req, res) => {
    console.log(req.auth);
    res.json(req.auth);
  }
);

app.get(
    '/ping',
    (req, res) => {
      console.log("ping")
      res.json({})
    }
  );

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(401).send('Unauthenticated!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
