const express=require('express');
const router=express.Router();
const {getData, createData, editData, deleteData}=require('../controllers/dataControllers');


router.get('/getAllData',getData );
router.post('/createData',createData );
router.delete('/deleteData/:id',deleteData );
router.put('/editData/:id',editData );

module.exports=router;