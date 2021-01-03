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
    const sales = await Sales.findAll({ where: { customerId }, include: [Customer], order: [['created_at', 'DESC']] });

    res.send(sales);
});

router.put('/sales/:id', async(req,res) => {
    const salesId = req.params.id;

    let find = await Sales.findOne({
        where: {
            id: salesId}
        });
        console.log(find);
    
    if(find){ 
        await Sales.update( {customerId: req.body.customerId}, { where: {id: salesId }})
        .then(function(rowsUpdated) {
            res.json(rowsUpdated)
            //res.status(200).send({ status });
          })
          .catch(err => {
            res.status(500).send({ error: 'Error updating Sales with id=' + salesId});
    })};

    return res.status(422).send({ error: 'Invalid QR Code. Please try again!'});

});

module.exports = router;