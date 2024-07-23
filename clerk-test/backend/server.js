const { ClerkExpressRequireAuth, ClerkExpressWithAuth } = require('@clerk/clerk-sdk-node');
const cors = require('cors')
const express = require('express')
require('dotenv').config()

const port = process.env.PORT || 3000;
const app = express();
app.use(express.json())
app.use(cors());

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
