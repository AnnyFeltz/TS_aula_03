const { Router } = require('express');
const { criar, listar, buscarId, buscarUsuario, buscarEmprestimo, valorDaMulta, atualizar, quitar, deletar } = require('../controllers/multaController');

const router = Router();

router.post('/criar', criar); 
router.get('/', listar); 
router.get('/usuario/:usuario_id', buscarUsuario);
router.get('/emprestimo/:emprestimo_id', buscarEmprestimo);
router.get('/valor/:id', valorDaMulta);
router.get('/:id', buscarId); 
router.patch('/atualizar/:id', atualizar); 
router.patch('/quitar/:id', quitar);
router.delete('/deletar/:id', deletar); 

module.exports = router;