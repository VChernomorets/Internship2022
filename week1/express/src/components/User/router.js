const { Router } = require('express');
const schemas = require('./validation');
const validationMiddleware = require('../../config/validationMiddleware');
const authMiddleware = require('../../config/authMiddleware');
const UserComponent = require('./index');

const router = Router();

router.get('/', UserComponent.findAll);

router.post(
    '/auth/register',
    validationMiddleware(schemas.create, 'body'),
    UserComponent.create,
);

router.get(
    '/auth/sign-in',
    validationMiddleware(schemas.login, 'body'),
    UserComponent.login,
);

router.get(
    '/auth/refresh',
    authMiddleware,
    UserComponent.refresh,
);

router.get(
    '/auth/logout',
    authMiddleware,
    UserComponent.logout,
);
router.get(
    '/auth/account',
    authMiddleware,
    UserComponent.getProfile,
);
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
