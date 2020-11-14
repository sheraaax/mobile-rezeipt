const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/database');
const Customer = require('../models/Customer');

const router = express.Router();

router.post('/signup', async (req, res) => {

  // Create a Customer
  const customer = {
    email: req.body.email,
    password: req.body.password,
  };
  const email = customer.email;
  console.log(customer);

  // Save Customer to database
  await Customer.create(customer)
    .then(data => {
      const token = jwt.sign({ email }, 'MY_SECRET_KEY');
      res.send({token});
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if ( !email || !password ) {
    return res.status(422).send({error: 'Must provide email and password!'});
  }

  const customer = await Customer.findOne({ where: {email} });
  const hashedPassword = customer.password;

  const comparePassword = await bcrypt.compare(password, hashedPassword);

  if(!customer) {
    return res.status(422).send({error: 'Invalid email or password!'});
  }

  if(!comparePassword) {
    return res.status(422).send({ error: 'Invalid email or password!'});
  }

  const token = jwt.sign({ email }, 'MY_SECRET_KEY');
  return res.status(200).send({ token });


 });

module.exports = router;
