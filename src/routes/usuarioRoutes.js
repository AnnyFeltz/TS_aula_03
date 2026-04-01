const { Router } = require('express');
const { criar, listar, atualizar, buscarId, deletar } = require('../controllers/usuarioController');

const router = Router();

router.post('/criar', criar); //Anny
//mudar para ser só disponiveis
router.get('/', listar); //Anny
router.get('/:id', buscarId); //Anny
router.patch('/atualizar/:id', atualizar); //Yasmim
router.delete('/deletar/:id', deletar); //Yasmim

module.exports = router;