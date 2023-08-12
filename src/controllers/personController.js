// Imposta dados mockados e a função de validação
const personData = require('../data/mockData').person_tb;
const isNumeric = require('../utils/validation');

// Cadastra um novo usuário
exports.postPerson = function (req, res) {
        const {cpf} = req.body;
        const person = personData.find(person => person.cpf === cpf);

        // Verifica se a pessoa já está cadastrada
        if (person) {
            return res.status(400).json({ message: "CPF já cadastrado. " });
        }
        //Verifica se o CPF passado não contém 11 dígitos numéricos
        if (!isNumeric(cpf) || cpf.length !== 11) {
            return res.status(400).json({ message: "O CPF deve conter apenas números e exatamente 11 dígitos." });
        }

        // Caso as validações sejam falsas cadastra a nova pessoa
        personData.push(req.body);
        return res.status(200).json({ message: "Cadastro concluído com sucesso. " });
};

// Retorna um usuário de acordo com o CPF informado
exports.getPerson = function (req, res) {
        const {cpf} = req.params;
        const person = personData.find(person => person.cpf == cpf);

        // Verifica se o usuário não está cadastrado
        if (!person) {
            return res.status(404).json({ message: "Usuário não encontrado. " });
        }

        // Caso a validaçõa deja falsa, retorna o cadastro do usuário em questão
        return res.status(200).json(person);
};