const { Router } = require('express');
const { criar,atualizar,buscarId } = require('../controllers/livroController');

const router = Router();

router.post('/criar', criar); //Anny
router.get('/:id', buscarId); //Anny
router.patch('/atualizar/:id', atualizar); //Yasmim
//router.delete('/deletar/:id', deletar); //Yasmim
//roter.get('/', todos); //Anny

module.exports = router;