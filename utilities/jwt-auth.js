'use strict';



const jwt = require("jsonwebtoken");
module.exports = async (req, res, next) => {
    try {
        req.jwt_data = await jwt.verify(req.token, process.env.JWT_KEY);
        next();
    } catch (err) {
        return res.status(409).json({
            error: "Something went wrong!"
        });
    }
};
