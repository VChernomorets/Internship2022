const { Router } = require('express');
const schemas = require('./validation');
const validationMiddleware = require('../../config/validationMiddleware');
const authMiddleware = require('../../config/authMiddleware');
const TaskComponent = require('./index');

const router = Router();

router.post(
    '/',
    authMiddleware,
    validationMiddleware(schemas.create, 'body'),
    TaskComponent.create,
);

router.patch(
    '/:id',
    authMiddleware,
    validationMiddleware(schemas.paramsId, 'params'),
    validationMiddleware(schemas.update, 'body'),
    TaskComponent.update,
);

router.get(
    '/',
    authMiddleware,
    validationMiddleware(schemas.find, 'query'),
    TaskComponent.find,
);

router.get(
    '/all',
    authMiddleware,
    TaskComponent.findAll,
);

module.exports = router;
