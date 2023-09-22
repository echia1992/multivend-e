const mongoose = require('mongoose');
const shortId = require('shortid');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const unique = require('mongoose-unique-validator');
const validators = require('express-validator')

const userSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: shortId.generate
    },
    name: {
        type: String,
        require: [true, "enter your name!"],
        //unique:true
    },
    email: {
        type: String,
        require: [true, "Please enter your email"],
        unique: [true, 'email already exist with a different user'],
    },
    password: {
        type: String,
        require: [true, 'please password must not be empty'],

    },
    role: {
        type: String,
        default: 'user'
    },
    avatar: {
        type: String,
        // require: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    resetPassword: String,
    resetPasswordTime: Date,
});
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        next();
    }
    this.password = await bcrypt.has(this.password, 12);
})

userSchema.methods.getJwtToken = function () {
    return jwt.sign({id: this._id}, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES,
    });
};

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

module.exports = mongoose.model("User", userSchema);