const express = require('express');
const db = require('../config/database');
const requireAuth = require('../middlewares/requireAuth');
const Sales = require('../models/sales');
const Customer = require('../models/customer');

const router = express.Router();

router.use(requireAuth);

Sales.belongsTo(Customer);
Customer.hasMany(Sales);

router.get('/sales', async (req, res) => {

    // for now, manually insert 'customerId' column 
    // and then put the customerId of the customer in the 'sales' table 

    const customerId = req.customer.id;
    console.log(customerId);
    const sales = await Sales.findAll({ where: { customerId }, include: [Customer] });

    res.send(sales);
});

module.exports = router;