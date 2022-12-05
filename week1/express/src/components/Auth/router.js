const { Router } = require('express');
const schemas = require('./validation');
const validationMiddleware = require('../../config/validationMiddleware');
const authMiddleware = require('../../config/authMiddleware');
const UserComponent = require('./index');

const router = Router();

router.post(
    '/register',
    validationMiddleware(schemas.register, 'body'),
    UserComponent.register,
);

router.get(
    '/login',
    validationMiddleware(schemas.login, 'body'),
    UserComponent.login,
);

router.get(
    '/refresh',
    UserComponent.refresh,
);

router.get(
    '/logout',
    authMiddleware,
    UserComponent.logout,
);
router.get(
    '/account',
    authMiddleware,
    UserComponent.getProfile,
);

module.exports = router;
