/** @format */
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const Customer = require("../model/user");
//const Shop = require("../model/shop");

exports.isAuthenticated = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return next(new ErrorHandler("Please login to continue", 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.customer = await Customer.findById(decoded.id);

    next();
});

exports.isSeller = catchAsyncErrors(async (req, res, next) => {
    const { seller_token } = req.cookies;
    if (!seller_token) {
        return next(new ErrorHandler("Please login to continue", 401));
    }

    const decoded = jwt.verify(seller_token, process.env.JWT_SECRET_KEY);

    req.seller = await Shop.findById(decoded.id);

    next();
});

exports.isAdmin = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.customer.role)) {
            return next(
                new ErrorHandler(`${req.customer.role} can not access this resources!`)
            );
        }
        next();
    };
};
