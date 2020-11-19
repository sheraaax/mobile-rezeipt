const express = require('express');
const db = require('../config/database');
const requireAuth = require('../middlewares/requireAuth');
const Redemption = require('../models/redemption');

const router = express.Router();

router.use(requireAuth);

router.get('/redemption', async (req, res) => {
    try{
        const redemption = await Redemption.findAll();
        res.send(redemption);
    }
    catch(error){
        console.log(error)
    }
    
});

module.exports = router;