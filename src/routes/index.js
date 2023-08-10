const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');

router.post('/person', controller.postPerson);
router.get('/person/:cpf', controller.getPerson);
router.post('/relationship', controller.postRelation);
router.delete('/clean', controller.delete);
router.get('/recommendations/:cpf', controller.getRecommendations);

module.exports = router;