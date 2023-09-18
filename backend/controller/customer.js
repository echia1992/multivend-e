const express = require('express');
const path = require('path');
const router = express.Router();
const { upload } = require('../multer');
//const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ErrorHandler = require('../utils/ErrorHandler');
//const jwt = require('jsonwebtoken');
const Customer = require('../model/customer')
const fs = require('fs');
//const sendMail = require('../utils/sendMail');


router.put('/create-customer', upload.single('file'), async (req,res,next)=>{
   try {
       const {name, email, password} = req.body;
       const customerEmail = await Customer.findOne({email});

       if (typeof password === 'undefined' || password == null || password ===""){
           return next (new ErrorHandler('Password field be not be empty',400))
       }
       if (password.trim().length <5){
           return next(new ErrorHandler('password is too short',400))
       }
       if (typeof name == 'undefined' || name == null){
           return next(new ErrorHandler('Please fill your name and continue',400))
       }
       if (name.length <7 ){
           return next(new ErrorHandler('name too short',400))
       }
       if (typeof email =='undefined' || email ==null){
           return next(new ErrorHandler('Please input your email',400))
       }
           if (customerEmail) {
               const filename = req.file.filename;
               const filePath = `uploads/${filename}`;
               fs.unlink(filePath, (err) => {
                   if (err) {
                       console.log(err);
                       res.status(500).json({message: "Error deleting file"});
                   }
               });
               return next(new ErrorHandler("User already exists", 400));
           }

           const filename = req.file.filename;
           const fileUrl = path.join(filename);

       const customer = {
           name : name,
           email:email,
           password:password,
           avatar:fileUrl,
       }

       res.status(201).json({
           success: true,
           message:`Dear ${customer.name} your account was successfully created `
       })
       
   }catch (error) {
       console.log(error)

       return next(new ErrorHandler(error.message))
   }
})

module.exports = router;