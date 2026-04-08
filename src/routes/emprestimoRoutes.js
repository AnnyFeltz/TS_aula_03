const { Router } = require('express');
const EmprestimoController = require('../controllers/emprestimoController');

const router = Router();

router.post('/criar', EmprestimoController.criar); 
router.get('/', EmprestimoController.listar);
router.get('/buscar/:id', EmprestimoController.buscarPorId);
router.put('/devolver/:id', EmprestimoController.devolver); 
router.delete('/deletar/:id', EmprestimoController.deletar);
router.get('/usuario/:usuario_id', EmprestimoController.listarPorUsuario);

module.exports = router;