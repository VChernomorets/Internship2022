const { Router } = require('express');
const { body, param } = require('express-validator');
const UserComponent = require('./index');

const router = Router();

router.get('/', UserComponent.findAll);

router.post(
    '/',
    body('email').isEmail(),
    body('firstName').isLength({ min: 3, max: 32 }),
    body('lastName').isLength({ min: 3, max: 32 }),
    UserComponent.create,
);

router.delete(
    '/:id',
    param('id').matches(/^[0-9a-fA-F]{24}$/),
    UserComponent.deleteById,
);

router.put(
    '/:id',
    param('id').matches(/^[0-9a-fA-F]{24}$/),
    UserComponent.update,
);

router.get(
    '/:id',
    param('id').matches(/^[0-9a-fA-F]{24}$/),
    UserComponent.find,
);

module.exports = router;
