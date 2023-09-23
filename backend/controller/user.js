const express = require('express');
const path = require('path');
const router = express.Router();
const { upload } = require('../multer');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ErrorHandler = require('../utils/ErrorHandler');
const User = require('../model/user')
const fs = require('fs');

const jwt = require('jsonwebtoken');
const sendToken = require("../utils/sendJwtToken");
const sendMail = require("../utils/sendMail");
const {isAuthenticated} = require("../middleware/auth");


router.put('/create-user', upload.single('profile'), async (req,res,next)=>{
   try {
       const {name, email, password} = req.body;
       const userEmail = await User.findOne({email});

       if (typeof password === 'undefined' || password == null || password ===""){
           return next (new ErrorHandler('Password field be not be empty',400))
       }
       if (password.trim().length <5){
           return next(new ErrorHandler('password is too short',400))
       }
       if (typeof name == 'undefined' || name == null){
           return next(new ErrorHandler('Please fill your name and continue',400))
       }
       if (typeof email =='undefined' || email ==null){
           return next(new ErrorHandler('Please input your email',400))
       }
           if (userEmail) {
               const filename = req.file.filename;
               const filePath = `uploads/${ filename }`;
               fs.unlink ( filePath , ( err ) => {
                   if ( err ) {
                       console.log ( err );
                       res.status ( 500 ).json ( { message : "Error deleting file" } );
                   }
               } );
               return next(new ErrorHandler("user already exists", 400));
           }
           const filename = req.file.filename;
           const fileUrl = path.join(filename);

       const user = {
           name : name,
           email: email,
           password: password,
           avatar: fileUrl,
       };
       const activationToken = createActivationToken ( user );
       const activationUrl = `http://localhost:3000/activation/${ activationToken }`;
       try {
           await sendMail ( {
               email : user.email ,
               subject : "Activate your account" ,
               message : `Hello ${ user.name }, please click on the link to activate your account: ${ activationUrl }` ,
           } );
       res.status(201).json({
           success: true,
           message:`Dear ${user.name} your account was successfully created `
       })
       } catch ( error ) {
           return next ( new ErrorHandler ( error.message , 500 ) );
       }
   }catch (error) {
       console.log(error)

       return next(new ErrorHandler(error.message,500))
   }
})
//create activationToken function
const createActivationToken = ( user ) => {
    return jwt.sign ( user , process.env.ACTIVATION_SECRET , {
        expiresIn : "5m" ,
    } );
};

router.post (
    "/activation" ,
    catchAsyncErrors ( async ( req , res , next ) => {
        try {
            const { activation_token } = req.body;
            const newUser = jwt.verify (
                activation_token ,
                process.env.ACTIVATION_SECRET
            );
            if ( ! newUser ) {
                return next ( new ErrorHandler ( "invalid token" , 400 ) );
            }
            const { name , email , password , avatar } = newUser;
            let user = await User.findOne ( { email } );

            if ( user ) {
                return next ( new ErrorHandler ( "user already exists" , 400 ) );
            }
            user = await User.create ( {
                name ,
                email ,
                avatar ,
                password ,
            } );
            sendToken ( user , 201 , res );
            await sendMail ( {
                email : user.email ,
                subject : "Account Activation" ,
                message : `Hello ${ user.name }, Congratulation your Account activation was successful!` ,
            } );
        } catch ( error ) {
            return next ( new ErrorHandler ( error.message , 500 ) );
        }
    } )
);
router.post('/login-user',catchAsyncErrors(async (req,res,next)=>{
    try {
        const {email , password} = req.body;

        if (typeof email ==='undefined' || email == null || email ===''){
            return next(new ErrorHandler('Please input your email',400))
        }
        if (typeof password === 'undefined' || password == null || password ===""){
            return next (new ErrorHandler('Password field be not be empty',400))
        }
        if (!email || !password ){
            return next(new ErrorHandler('Incorrect email and password'));
        }
        const user = await  User.findOne({email}).select("+password");
        if (!user){
            return next(new ErrorHandler("user doesn't exist ", 400))
        }
        const isPasswordValid = await user.comparePassword( password );
        if (!isPasswordValid){
            return next(new ErrorHandler('Incorrect email and password'))
        }
        sendToken(user,201, res);
        await sendMail({
            email: user.email,
            subject: "login Notification",
            message: `Hello ${user.name}, you just login`
        })
    }catch (error) {
        return next(new ErrorHandler(error.message,500))
    }
})
);

router.get (
    "/get-user" ,
    isAuthenticated ,
    catchAsyncErrors ( async ( req , res , next ) => {
        try {
            const user = await User.findById ( req.user.id );
            if ( ! user ) {
                return next ( new ErrorHandler ( "User doesn't exist" , 400 ) );
            }
            res.status ( 200 ).json ( {
                success : true ,
                user ,
            } );

        } catch ( error ) {
            return next ( new ErrorHandler ( error.message , 500 ) );
        }
    } )
);

//LogOut

router.get (
    "/logout" ,
    catchAsyncErrors ( async ( req , res , next ) => {
        try {
            res.cookie ( "token" , null , {
                expires : new Date ( Date.now () ) ,
                httpOnly : true ,
            } );
            res.status ( 201 ).json ( {
                success : true ,
                message : "Log out successful!" ,
            } );
        } catch ( error ) {
            return next ( new ErrorHandler ( error.message , 500 ) );
        }
    } )
);

module.exports = router;