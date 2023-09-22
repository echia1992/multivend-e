
const sendToken = (customer, statusCode, res) => {
    const token = customer.getJwtToken();

    const options = {
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        httpOnly: true,
    };

    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        customer,
        token,
    });
};
module.exports = sendToken;