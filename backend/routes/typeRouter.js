const Router = require('express');
const router = new Router();
const typeController = require('./../controllers/typeController');
const checkRole = require('../middleware/checkRoleMiddleware');

router
    .post('/', checkRole("ADMIN"), typeController.create)
    .get('/', typeController.getAll)
    .delete('/:id', checkRole("ADMIN"), typeController.delete);

module.exports = router;
