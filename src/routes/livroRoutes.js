const { Router } = require('express');
const { criar, listar, atualizar, buscarId, deletar } = require('../controllers/livroController');

const router = Router();

router.post('/criar', criar); //Anny
router.get('/', listar); //Anny
router.get('/:id', buscarId); //Anny
router.patch('/atualizar/:id', atualizar); //Yasmim
router.delete('/deletar/:id', deletar); //Yasmim

module.exports = router;