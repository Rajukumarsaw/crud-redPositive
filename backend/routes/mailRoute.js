const express=require('express');
const router=express.Router();

const sendMail=require('../controllers/mailController');

router.post('/send-email', sendMail);
module.exports=router;