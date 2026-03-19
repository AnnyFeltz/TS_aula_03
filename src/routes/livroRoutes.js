const { Router } = require('express');
const { criar } = require('../controllers/livroController');
const { buscarId } = require('../controllers/livroController');

const router = Router();

<<<<<<< HEAD
router.post('/criar', criar); //Anny
router.get('/:id', buscarId); //Anny
router.patch('/atualizar/:id', atualizar); //Yasmim
//router.delete('/deletar/:id', deletar); //Yasmim
//roter.get('/', todos); //Anny
=======
router.post('/criar', criar);
router.get('/:id', buscarId);

>>>>>>> 3430c52f9fd3489737cd4c6d2c5850a004b5dd6e

module.exports = router;