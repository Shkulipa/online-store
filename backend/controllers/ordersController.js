const {Orders, OrderDevice, Device, Brand, Type} = require('./../models/models');
const ApiError = require('../error/apiError');
const jwt = require('jsonwebtoken');

class OrdersController {
    async create(req, res) {
        const auth = req.headers.authorization || "";
        const {mobile, basket} = req.body;

        try {
            let parseDevices = [];
            for (let key of basket) {
                parseDevices.push(key.id)
            }

            const isDeviceInDB = await Device.findAndCountAll({
                where: {id: parseDevices},
                attributes: ["id"]
            });

            if(isDeviceInDB.count === parseDevices.length) { //if all devices was found in DB
                const row = {mobile};
                if(auth) {
                    const token = auth.split(' ')[1];
                    const {id} = jwt.verify(token, process.env.SECRET_KEY);
                    row.userId = id;
                }

                await Orders.create(row).then(order => {
                    const {id} = order.get();
                    parseDevices.forEach( async (deviceId, i) =>  {

                        await OrderDevice.create({
                            orderId: id,
                            deviceId,
                            count: basket[i].count
                        });
                    });
                });
            } else { //send msg about devices that didnt found in DB
                const notFoundIdDevices = [];
                const arrDevices = []; //found id
                isDeviceInDB.rows.forEach(item => arrDevices.push(item.id));
                parseDevices.forEach(deviceId => {
                    if(!arrDevices.includes(deviceId)) {
                        notFoundIdDevices.push(deviceId);
                    }
                });
                return ApiError.badRequest(res.json(`Some Devices of id(${notFoundIdDevices.join(', ')}) not exist in DB`));
            }

            return res.json("Thank you for you order! We will contact you shortly");
        } catch (e) {
            return res.json(e);
        }
    }

    async updateOrder(req, res) {
        try {
            const { complete, id } = req.body;

            await Orders.findOne({where:{id}})
                .then( async data => {
                    if(data) {
                        await Orders.update({complete}, {where:{id}} ).then(() => {
                            return res.json("Order updated");
                        })
                    } else {
                        return res.json("This order doesn't exist in DB");
                    }
                })
        } catch (e) {
            return res.json("Updated didn't complete because was error: " + e);
        }

    }

    async deleteOrder(req, res) {
        try {
            const { id } = req.body;

            await Orders.findOne({where:{id}})
                .then( async data => {
                    if(data) {
                        await Orders.destroy({where:{id}}).then(() => {
                            return res.json("Order deleted");
                        })
                    } else {
                        return res.json("This order doesn't exist in DB");
                    }
                })
        } catch (e) {
            return res.json("Delete didn't complete because was error: " + e);
        }
    }

    async getAll(req, res) {
        let {limit, page, complete} = req.query;
        page = page || 1;
        limit = limit || 7;
        let offset = page * limit - limit;
        let devices;
        if(complete === "not-completed") {
            devices = await Orders.findAndCountAll({where:{complete: false}, limit, offset});
        } else if(complete === "completed") {
            devices = await Orders.findAndCountAll({where:{complete: true}, limit, offset});
        } else {
            devices = await Orders.findAndCountAll({limit, offset});
        }

        return res.json(devices);
    }

    async getOne(req, res) {
        const {id} = req.params;
        const order = {};
        try {
            let devices;
            let infoDevices = [];
            await Orders.findOne({where:{id}}).then(async data => {
                order.descr = data;
                devices = await OrderDevice.findAll({
                    attributes: ["deviceId", "count"],
                    where:{orderId: data.id},
                });

                for (let device of devices) {
                    await Device.findOne({
                        attributes: ["name", "img", "price"],
                        where: {id: device.deviceId},
                        include: [
                            {
                                attributes: ["name"],
                                model: Type
                            },
                            {
                                attributes: ["name"],
                                model: Brand
                            },
                        ]
                    }).then(async item => {
                        let newObj = {
                            descr: item,
                            count: device.count
                        }
                        infoDevices.push(newObj);
                    });
                }
                order.devices = infoDevices;

                return res.json(order);
            }).catch(() => {
                return res.json("Order doesn't exist in data base");
            });

        } catch (e) {
            return res.json("Delete didn't complete because was error: " + e);
        }
    }
}

module.exports = new OrdersController();
