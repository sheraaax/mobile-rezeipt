const jwt = require('jsonwebtoken');
const db = require('../config/database');
const Customer = require('../models/Customer');

module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    // authorization === 'Bearer kjhdfakjhf'

    if(!authorization) {
      return res.status(401).send({ error: '1. You must be logged in.' })
    }

    const token = authorization.replace('Bearer ', '');
    jwt.verify(token, 'MY_SECRET_KEY', async (err, payload) => {
      if (err) {
        return res.status(401).send({ error: '2. You must be logged in.' });
      }

      const { email } = payload;
      //const email = customer.email;
      const cust = await Customer.findOne({ where: {email} });
      //console.log("cust:", cust); //=undefined
      req.customer = cust;
      //console.log("req.customer:", req.customer); //=undefined
      next();

      // const { userId } = payload;
      //
      // const customer = await Customer.findByPk(userId);
      // req.customer = customer;
      // next();
    });
};
