require('./models/Customer');
require('./models/sales');
const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const salesRoutes = require('./routes/salesRoutes');
const requireAuth = require('./middlewares/requireAuth');

const app = express();

app.use(bodyParser.json());

const db = require('./config/database');

db.authenticate()
.then( () => console.log('Database connected'))
.catch(error => console.log('Database is not connected ' + error))

app.use(authRoutes);
app.use(salesRoutes);

app.get('/', requireAuth, (req, res) => {
  res.send(`Your email: ${req.customer.email}`);
});

app.listen(3000, () => {
  console.log('Listening on port 3000')
});
