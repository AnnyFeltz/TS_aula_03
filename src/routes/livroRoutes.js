const { Router } = require('express');
const { criar } = require('../controllers/livroController');
const { buscarId } = require('../controllers/livroController');

const router = Router();

router.post('/criar', criar);
router.get('/:id', buscarId);


module.exports = router;