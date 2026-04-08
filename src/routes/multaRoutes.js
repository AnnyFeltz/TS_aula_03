const { Router } = require('express');
const { criar, listar, buscarId, atualizar, deletar } = require('../controllers/multaController');

const router = Router();

router.post('/criar', criar); 
router.get('/', listar); 
router.get('/:id', buscarId); 
router.patch('/atualizar/:id', atualizar); 
router.delete('/deletar/:id', deletar); 

module.exports = router;