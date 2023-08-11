//Importações
const express = require('express');
const router = express.Router();
const personController = require('../controllers/personController');
const recommendationController = require('../controllers/recommendationController');
const relationController = require('../controllers/relationController');
const deleleController = require('../controllers/delete');

// Rota para cadastrar uma nova pessoa
router.post('/person', personController.postPerson);

// Rota para buscar uma pessoa cadastrada
router.get('/person/:cpf', personController.getPerson);

// Rota para criar uma conexão
router.post('/relationship', relationController.postRelation);

// Rota para receber recomendações de amigos de amigos
router.get('/recommendations/:cpf', recommendationController.getRecommendations);

// Rota para deletar todos os dados
router.delete('/clean', deleleController.delete);

module.exports = router;