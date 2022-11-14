const { Router } = require('express');
const UserComponent = require('./index');

const router = Router();

router.get('/', UserComponent.findAll);

router.post('/', UserComponent.create);

router.delete('/:id', UserComponent.deleteById);

router.put('/:id', UserComponent.update);

module.exports = router;
