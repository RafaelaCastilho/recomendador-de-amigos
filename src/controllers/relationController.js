//Importa os dados mockados
const personData = require('../data/mockData').person_tb;
const relationData = require('../data/mockData').relationship_tb;

// Cria um relacionamento entre dois usuários cadastrados
exports.postRelation = function (req, res) {
        const { cpf1, cpf2 } = req.body;
        const person1 = personData.find(person => person.cpf === cpf1);
        const person2 = personData.find(person => person.cpf === cpf2);

        // Verifica se algum dos usuários não está cadastrado
        if (!person1 || !person2) {
           return res.status(404).json({ message: "Um ou ambos os usuários não foram encontrados. " });
        }

        const existingRelation = relationData.find(rel => (rel.cpf1 === cpf1 && rel.cpf2 === cpf2) || (rel.cpf1 === cpf2 && rel.cpf2 === cpf1));

        // Verifica se a relação já existe antes de criá-la
        if (!existingRelation) {
            relationData.push({ cpf1, cpf2 });
            return res.status(200).json({ message: "Relacionamento criado com sucesso." });
        } else {
            return res.status(400).json({ message: "O relacionamento já existe." });
        }
};