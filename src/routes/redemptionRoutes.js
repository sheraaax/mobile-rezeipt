const express = require('express');
const db = require('../config/database');
const requireAuth = require('../middlewares/requireAuth');
const Redemption = require('../models/redemption');

const router = express.Router();
const   CustomerRedemption = require('../models/customer_redemption');

router.use(requireAuth);

router.get('/redemption', async (req, res) => {
    try{
        const redemption = await Redemption.findAll({order: [
            ['id', 'DESC']]});
        res.send(redemption);
    }
    catch(error){
        console.log(error)
    } 
});

module.exports = router;