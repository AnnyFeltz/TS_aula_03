const { Router } = require('express');
const EmprestimoController = require('../controllers/emprestimoController');

const router = Router();

router.post('/criar', EmprestimoController.criar); 
router.get('/', EmprestimoController.listar);
router.get('/:id', EmprestimoController.buscarPorId);
router.put('/:id/devolver', EmprestimoController.devolver); 
router.delete('/:id', EmprestimoController.excluir);
router.get('/usuario/:usuario_id', EmprestimoController.listarPorUsuario);

module.exports = router;