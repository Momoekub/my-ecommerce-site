const express=require('express');
const router = express.Router();

router.post('/', (req,res) =>{
    const  {fname, lname , email, subject,message } =req.body;
    console.log('Content form submitted', {fname, lname , email, subject,message } );
    res.status(200).json({status:"Message Recieved"});

});

module.exports=router;