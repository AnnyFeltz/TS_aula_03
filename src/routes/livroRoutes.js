const { Router } = require('express');
const { criar, listar, atualizar, buscarId, deletar } = require('../controllers/livroController');

const router = Router();

router.post('/criar', criar); 
router.get('/', listar); 
router.get('/:id', buscarId); 
router.patch('/atualizar/:id', atualizar); 
router.delete('/deletar/:id', deletar); 

module.exports = router;