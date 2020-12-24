const express = require('express');
const db = require('../config/database');
const requireAuth = require('../middlewares/requireAuth');
const Redemption = require('../models/redemption');
const Customer = require('../models/customer');
const   CustomerRedemption = require('../models/customer_redemption');
const Stores = require('../models/stores');

const router = express.Router();

router.use(requireAuth);

Customer.hasMany(CustomerRedemption);
CustomerRedemption.belongsTo(Customer);
Redemption.hasMany(CustomerRedemption);
CustomerRedemption.belongsTo(Redemption);



router.get('/customerRedemption', async (req, res) => {
    try{
        const customerId = req.customer.id;
        const customer_redemption = await CustomerRedemption.findAll({ where: {customerId}, 
            include: [{
                model: Redemption,
                attributes: ['name','expirationDate','points','couponCode'],
            }],
            order: [
                ['id', 'DESC']]
            });
        res.send(customer_redemption);
    }
    catch(error){
        console.log(error)
    }
});

router.post('/customerRedemption', async(req, res) => {
        const {redemptionId,customerId} = req.body;
        try{
        let find = await CustomerRedemption.findOne({
            where: {
                redemptionId: redemptionId,
                customerId : customerId}
            });
            console.log(find);

        if(!find){ 
                const customer_redemption = new CustomerRedemption({ customerId, redemptionId});
                await customer_redemption.save();
                res.send(customer_redemption);
        }
        else {
            throw new Error('You have already redeemed this reward!');
        }}
        catch(error){
                console.log(error);
        }}
);

router.get('/customerRedemption/:id', async (req, res) => {
    try{
        const customerRedemptionId = req.params.id;
        console.log(customerRedemptionId);
        const customer_redemption = await CustomerRedemption.findByPk(customerRedemptionId);
        res.send(customer_redemption);
    }
    catch(error){
        console.log(error)
    }
});

module.exports = router;