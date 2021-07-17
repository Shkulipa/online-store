const {Rating, Device} = require('./../models/models');

const jwt = require('jsonwebtoken');

module.exports = async function (req, res, next) {
    try {
        const {deviceId} = req.body;
        const token = req.headers.authorization.split(' ')[1];
        const user = jwt.verify(token, process.env.SECRET_KEY);
        const checkRating = await Rating.findOne({where: {deviceId, userId: user.id}});
        const checkDevices =  await Device.findOne({where: {id: deviceId}});

        if (!checkDevices) {
            return res.json("Product doesn't existing in data base");
        } else if(checkRating && checkDevices) {
            return res.json("You have left a rating for this product");
        }
        return next();
    } catch (e) {
        return res.status(401).json("Something going wrong in checkAddRatingMiddleware.js");
    }
};

