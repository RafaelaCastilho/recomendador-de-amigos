// Importa os dados mockados
let personData = require('../data/mockData').person_tb;
let relationData = require('../data/mockData').relationship_tb;

// Deleta os dados mockado de pessoas e relacionamentos
exports.delete = function (req, res) {
    personData = [];
    relationData = [];
    return res.status(200).json({ message: "Todos os registros foram excluídos com sucesso." });
};