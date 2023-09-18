const ErrorHandler = require('../utils/ErrorHandler');

module.exports = (err, req, res, next)=>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "internal server Error";

// db error handler mongodb
    if (err.name === "CastError"){
        const  message  = `Resources not found with this Id.. invalid Id ${err.path}`;
        err = new ErrorHandler(message,400);
    }

    // duplicate error

if (err.code === 1100){
    const message = `Duplicate key ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message,400);
}
if (err.name ==="JsonWebTokenError"){
    const message = `Your Url is not valid please try again`
}
if (err.name === " TokenExpiredError"){
    const message = `Your Url is expired Please try again `
}
res.status(err.statusCode).json({
    success: false,
    message:err.message
});

};