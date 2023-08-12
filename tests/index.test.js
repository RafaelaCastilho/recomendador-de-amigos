//Importa o módulo supertes e o app configurado com as rotas
const request = require('supertest');
const app = require('../app');

describe('Person API', ()=> {
    // Teste para a busca de pessoas
    describe('Busca de person', () => {
        test('Se o CPF estiver cadastrado retorna 200', async () => {
            const response = await request(app).get('/person/12345678900');
            expect(response.status).toBe(200);
        });

        test('Se o CPF não estiver cadastrado retorna 404', async () => {
            const response = await request(app).get('/person/12345678000');
            expect(response.status).toBe(404);
        });
    
    });
    
    // Teste para o cadastro de pessoas
    describe('Cadastro de person', () => {
        test('Se o CPF conter 11 dígitos numéricos e não estiver cadastrado retorna 200', async () => {
            const response = await request(app).post('/person').send({ "cpf": "12346578000", "name": "Livia" });
            expect(response.status).toBe(200);
        });
    
        test('Se o CPF for diferente de 11 dígitos retorna 400', async () => {
            const response = await request(app).post('/person').send({ "cpf": "1234657890", "name": "Livia" });
            expect(response.status).toBe(400);
        });
    
        test('Se o CPF conter algum caractere retorna 400', async () => {
            const response = await request(app).post('/person').send({ "cpf": "123457891a", "name": "Livia" });
            expect(response.status).toBe(400);
        });
    
        test('Se o CPF já estiver cadastrado retorna 400', async () => {
            const response = await request(app).post('/person').send({ "cpf": "12345678900", "name": "Rafaela" });
            expect(response.status).toBe(400);
        });
    });
});

describe('Cadastro de relationship', () => {
    // Teste para o cadastro de relacionamentos
    test('Se os dois usuários existirem e ainda não houver um relacionamento retorna 200', async () => {
        const response = await request(app).post('/relationship').send({ "cpf1": "12345678900", "cpf2": "12346578000" });
        expect(response.status).toBe(200);
    });

    test('Se o um dos usuários não existir retorna 404', async () => {
        const response = await request(app).post('/relationship').send({ "cpf1": "12345678901", "cpf2": "12345670000" });
        expect(response.status).toBe(404);
    });

    test('Se o relacionamento já existir retorna 400', async () => {
        const response = await request(app).post('/relationship').send({ "cpf1": "12345678900", "cpf2": "12345670000" });
        expect(response.status).toBe(400);
    });

});

describe('Recomendação de amigos', () => {
    // Teste para a recomendação de amigos
    test('Se o CPF estiver cadastrado retorna 200', async () => {
        const response = await request(app).get('/recommendations/12345678900');
        expect(response.status).toBe(200);
    });

    test('Se o CPF for diferente de 11 dígitos retorna 400', async () => {
        const response = await request(app).get('/recommendations/12345678');
        expect(response.status).toBe(400);
    });

    test('Se o CPF conter algum caractere retorna 400', async () => {
        const response = await request(app).get('/recommendations/123456791a');
        expect(response.status).toBe(400);
    });

    test('Se o CPF não estiver cadastrado retorna 404', async () => {
        const response = await request(app).get('/recommendations/12345678999');
        expect(response.status).toBe(404);
    });

});

describe('Exclusão de dados', () => {
    // Teste de exclusão de dados
    test('Deve excluir todos os registros', async () => {
        const response = await request(app).delete('/clean');
        expect(response.status).toBe(200);
    });

});