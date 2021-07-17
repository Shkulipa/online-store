const Router = require('express');
const router = new Router();
const deviceRouter = require('./deviceRouter');
const brandRouter = require('./brandRouter');
const typeRouter = require('./typeRouter');
const userRouter = require('./userRouter');
const basketRouter = require('./basketRouter');
const ratingRouter = require('./ratingRouter');
const ordersRouter = require('./ordersRouter');

router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/brand', brandRouter)
router.use('/device', deviceRouter)
router.use('/basket', basketRouter)
router.use('/rating', ratingRouter)
router.use('/orders', ordersRouter)

module.exports = router;
