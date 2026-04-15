const { Router } = require('express');
const EmprestimoController = require('../controllers/emprestimoController');

const router = Router();

router.post('/criar', EmprestimoController.criar); 
router.get('/', EmprestimoController.listar);
router.get('/:id', EmprestimoController.buscarId);
router.patch('/devolver/:id', EmprestimoController.devolver);
router.patch('/atualizar/:id', EmprestimoController.atualizar);
router.delete('/deletar/:id', EmprestimoController.deletar);
router.get('/usuario/:usuario_id', EmprestimoController.buscarPorUsuario);

module.exports = router;    