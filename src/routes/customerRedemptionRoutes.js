const express = require('express');
const db = require('../config/database');
const requireAuth = require('../middlewares/requireAuth');
const Redemption = require('../models/redemption');
const Customer = require('../models/customer');
const   CustomerRedemption = require('../models/customer_redemption');

const router = express.Router();

router.use(requireAuth);

Customer.hasMany(CustomerRedemption);
CustomerRedemption.belongsTo(Redemption);


router.get('/customerRedemption', async (req, res) => {
    try{
        const customerId = req.customer.id;
        const customer_redemption = await CustomerRedemption.findAll({ where: { customerId }});
        res.send(customer_redemption);
    }
    catch(error){
        console.log(error)
    }
});

module.exports = router;