require('./models/Customer');
const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const requireAuth = require('./middlewares/requireAuth');

const app = express();

app.use(bodyParser.json());

const db = require('./config/database');

db.authenticate()
.then( () => console.log('Database connected'))
.catch(error => console.log('Database is not connected ' + error))


// const con = mysql.createConnection({
//   host: '127.0.0.1',
//   port: '3306',
//   user: 'root',
//   password: '[Peratha1998!]',
//   database: 'rezeipt',
//   multipleStatements: true
// });

// con.connect(function(error){
//   if(error) console.log('Error connecting to mysql', error);
//   else console.log('Connected to mysql');
// });

app.use(authRoutes);

app.get('/', requireAuth, (req, res) => {
  res.send(`Your email: ${req.customer.email}`);
});

app.listen(3000, () => {
  console.log('Listening on port 3000')
});
