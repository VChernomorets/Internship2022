const { Router } = require('express');
const schemas = require('./validation');
const validationMiddleware = require('../../config/validationMiddleware');
const authMiddleware = require('../../config/authMiddleware');
const AuthComponent = require('./index');

const router = Router();

router.post(
    '/register',
    validationMiddleware(schemas.register, 'body'),
    AuthComponent.register,
);

router.get(
    '/login',
    validationMiddleware(schemas.login, 'body'),
    AuthComponent.login,
);

router.get(
    '/refresh',
    AuthComponent.refresh,
);

router.get(
    '/logout',
    authMiddleware,
    AuthComponent.logout,
);
router.get(
    '/account',
    authMiddleware,
    AuthComponent.getProfile,
);

module.exports = router;
