const express = require('express');
const db = require('../config/database');
const requireAuth = require('../middlewares/requireAuth');
const Redemption = require('../models/redemption');
const Customer = require('../models/customer');
const   CustomerRedemption = require('../models/customer_redemption');

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
                attributes: ['name','description','expirationDate','points','couponCode'],
            }],
            order: [
                ['status', 'ASC']]
            });
            console.log(customer_redemption);
        res.send(customer_redemption);
    }
    catch(error){
        console.log(error)
    }
});

router.post('/customerRedemption', async(req, res) => {
        const {redemptionId,customerId} = req.body;
        
        let find = await CustomerRedemption.findOne({
            where: {
                redemptionId: redemptionId,
                customerId : customerId}
            });
            console.log(find);
        
        if(!find){ 
                const customer_redemption = new CustomerRedemption({ customerId, redemptionId});
                await customer_redemption.save();
                return res.status(200).send({ customer_redemption });
        }
        
        return res.status(422).send({ error: 'You have already redeemed this reward!'});
    
        }
        
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

router.put('/redeemStatus/:id', async (req, res) => {
    const customerRedemptionId = req.params.id;
    //const {status} = req.body.status;

    await CustomerRedemption.update( {status: req.body.status}, { where: {id: customerRedemptionId }})
    .then(function(rowsUpdated) {
        res.json(rowsUpdated)
        //res.status(200).send({ status });
      })
      .catch(err => {
        res.status(500).send({ error: 'Error updating CustomerRedemption with id=' +customerRedemptionId});
    });

});

module.exports = router;