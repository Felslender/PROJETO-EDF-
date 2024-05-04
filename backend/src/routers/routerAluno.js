const express = require('express');
const router = express.Router();

const controller = require('../controllers/controllerAluno');
const middleware = require('../middlewares/middleware');



//router.get('/Alunos', middleware.verifyToken, middleware.AlunoRole, controller.getAll);



router.get('/InfoAluno', middleware.verifyToken, middleware.AlunoRole, controller.getAllInfoAluno);
router.get('/SuasCriancas', middleware.verifyToken, middleware.AlunoRole, controller.getAllCriancas);
router.get('/SuasTurmas', middleware.verifyToken, middleware.AlunoRole, controller.getAllTurmas);
router.get('/SuasTurmas/:idTurma/facilitadores', middleware.verifyToken, middleware.AlunoRole, controller.getAllFacilitadorTurma);
router.get('/SuasTurmas/:idTurma/SuasAulas', middleware.verifyToken, middleware.AlunoRole, middleware.verifyTurma, controller.getAllAulasTurma)
router.post('/CadastrarAluno', middleware.validateEmail, middleware.validateCPF, middleware.validatePassword, controller.createAluno);
router.post('/CadastrarCrianca',  middleware.verifyToken, middleware.AlunoRole, middleware.validateCPF, controller.createCrianca);


module.exports = router;


