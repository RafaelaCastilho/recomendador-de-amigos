let personData = require('../data/mockData').person_tb;
let relationData = require('../data/mockData').relationship_tb;


function isNumeric(cpf) {
    return /^\d+$/.test(cpf);
}

exports.postPerson = function (req, res) {

    try {
        const cpf = req.body.cpf;

        const person = personData.find(person => person.cpf === cpf);

        if (person) {
            res.status(400).json({ message: "CPF já cadastrado. " });
        }
        if (!isNumeric(cpf) || cpf.length !== 11) {
            res.status(400).json({ message: "O CPF deve conter apenas números e exatamente 11 dígitos." });
        }

        personData.push(req.body);
        res.status(200).json({ message: "Cadastro concluído com sucesso. " });

    } catch (err) {
        console.log(err);
    }

};

exports.getPerson = function (req, res) {

    try {
        const cpf = req.params.cpf;
        const person = personData.find(person => person.cpf == cpf);

        if (!person) {
            res.status(404).json({ message: "Usuário não encontrado. " });
        }

        res.status(200).json(person);

    } catch (err) {
        console.log(err);
    }

};

exports.postRelation = function (req, res) {
    try {
        const cpf1 = req.body.cpf1;
        const cpf2 = req.body.cpf2;
        const person1 = personData.find(person => person.cpf == cpf1);
        const person2 = personData.find(person => person.cpf == cpf2);

        if (!person1 || !person2) {
            res.status(404).json({ message: "Um ou ambos os usuários não foram encontrados. " });
        }

        const existingRelation = relationData.find(rel => (rel.cpf1 === cpf1 && rel.cpf2 === cpf2) || (rel.cpf1 === cpf2 && rel.cpf2 === cpf1));

        if (!existingRelation) {
            relationData.push({ cpf1, cpf2 });
            res.status(200).json({ message: "Relacionamento criado com sucesso." });
        } else {
            res.status(400).json({ message: "O relacionamento já existe." });
        }

    } catch (err) {
        console.log(err);
    }
};

exports.delete = function (req, res) {
    personData = [];
    relationData = [];
    res.status(200).json({ message: "Todos os registros foram excluídos com sucesso." });

};

exports.getRecommendations = function (req, res) {
    try {
        const cpf = req.params.cpf;
        const person = personData.find(person => person.cpf == cpf);

        if (!isNumeric(cpf) || cpf.length !== 11) {
            res.status(400).json({ message: "O CPF deve conter apenas números e exatamente 11 dígitos." });
        }
        if (!person) {
            res.status(404).json({ message: "Usuário não encontrado. " });
        }

        let friends = [];
        for (let relation of relationData) {
            if (relation.cpf1 === cpf) {
                friends.push(relation.cpf2);
            } else if (relation.cpf2 === cpf) {
                friends.push(relation.cpf1);
            }
        }

        let friendCounts = {};
        friends.forEach(friend => {
            for (let relation of relationData) {

                if ((relation.cpf1 == friend || relation.cpf2 == friend) && friend != cpf) {
                    const friendCPF = (relation.cpf1 === friend) ? relation.cpf2 : relation.cpf1;
                    friendCounts[friendCPF] = (friendCounts[friendCPF] || 0) + 1;
                }
            }

        });
        const sortedFriends = Object.keys(friendCounts).sort((a, b) => friendCounts[b] - friendCounts[a]).filter(friend => friend !== cpf);
        res.status(200).json(sortedFriends);

    } catch (err) {
        console.log(err);
    }
};
