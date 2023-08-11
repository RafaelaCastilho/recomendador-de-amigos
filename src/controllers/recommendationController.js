// Importa os dados mockados e a função de validação
const personData = require('../data/mockData').person_tb;
const relationData = require('../data/mockData').relationship_tb;
const isNumeric = require('../utils/validation');

// Retorna uma lista de recomendação de amigos baseado em amigos de amigos
exports.getRecommendations = function (req, res) {
    try {
        const cpf = req.params.cpf;
        const person = personData.find(person => person.cpf === cpf);

        // Verifica se o CPF passado não contém 11 dígitos numéricos
        if (!isNumeric(cpf) || cpf.length !== 11) {
            return res.status(400).json({ message: "O CPF deve conter apenas números e exatamente 11 dígitos." });
        }
        // Verifica se a pessoa não está cadastrada
        if (!person) {
            return res.status(404).json({ message: "Usuário não encontrado. " });
        }

        // Caso as validações sejam falsas cria uma lista de amigos do usuário
        let friends = [];
        for (let relation of relationData) {
            if (relation.cpf1 === cpf) {
                friends.push(relation.cpf2);
            } else if (relation.cpf2 === cpf) {
                friends.push(relation.cpf1);
            }
        }

        // Verifica os amigos dos amigos e, então, quantas vezes cada possível conexão apareceu
        let friendCounts = {};
        friends.forEach(friend => {
            for (let relation of relationData) {

                if ((relation.cpf1 === friend || relation.cpf2 === friend) && friend !== cpf) {
                    const friendCPF = (relation.cpf1 === friend) ? relation.cpf2 : relation.cpf1;
                    friendCounts[friendCPF] = (friendCounts[friendCPF] || 0) + 1;
                }
            }

        });

        // Ordena os amigos recomendados de acordo com quantos relacionamentos em comum o usuário tem
        const sortedFriends = Object.keys(friendCounts).sort((a, b) => friendCounts[b] - friendCounts[a]).filter(friend => friend !== cpf);
        return res.status(200).json(sortedFriends);

    } catch (err) {
        return console.log(err);
    }
};
