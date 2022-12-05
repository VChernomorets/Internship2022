const { Router } = require('express');
const schemas = require('./validation');
const validationMiddleware = require('../../config/validationMiddleware');
const UserComponent = require('./index');

const router = Router();

router.get('/', UserComponent.findAll);

router.delete(
    '/:id',
    validationMiddleware(schemas.paramsId, 'params'),
    UserComponent.deleteById,
);

router.put(
    '/:id',
    validationMiddleware(schemas.paramsId, 'params'),
    validationMiddleware(schemas.update, 'params'),
    UserComponent.update,
);

router.get(
    '/find/:id',
    validationMiddleware(schemas.paramsId, 'params'),
    UserComponent.find,
);

module.exports = router;
