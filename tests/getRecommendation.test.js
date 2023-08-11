const request = require('supertest');
const app = require('../app');

const router = require('../src/routes/index');

describe('Person API', ()=> {
    describe('Busca de person', () => {
        test('Se o CPF estiver cadastrado retorna 200', async () => {
            const response = await request(app).get('/person/12345678900');
            expect(response.status).toBe(200);
        });
    
        test('Se o CPF não estiver cadastrado retorna 404', async () => {
            const response = await request(app).get('/person/1234567890');
            expect(response.status).toBe(404);
        });
    
    });
    
    describe('Cadastro de person', () => {
        test('Se o CPF conter 11 dígitos numéricos e não estiver cadastrado retorna 200', async () => {
            const response = await request(app).post('/person').send({ "cpf": `${12346578900}`, "name": "Liv linda" });
            expect(response.status).toBe(200);
        });
    
        test('Se o CPF for diferente de 11 dígitos retorna 400', async () => {
            const response = await request(app).post('/person').send({ "cpf": `${1234657890}`, "name": "Liv linda" });
            expect(response.status).toBe(400);
        });
    
        test('Se o CPF conter algum caractere retorna 400', async () => {
            const response = await request(app).post('/person').send({ "cpf": "123457891a", "name": "Liv linda" });
            expect(response.status).toBe(400);
        });
    
        test('Se o CPF já estiver cadastrado retorna 400', async () => {
            const response = await request(app).post('/person').send({ "cpf": `${12345678900}`, "name": "Liv linda" });
            expect(response.status).toBe(400);
        });
    });
});

describe('Cadastro de relationship', () => {

    test('Se os dois usuários existirem e ainda não houver um relacionamento retorna 200', async () => {
        const response = await request(app).post('/relationship').send({ "cpf1": "12340000000", "cpf2": "12345678000" });
        expect(response.status).toBe(200);
    });

    test('Se o um dos usuários não existir retorna 404', async () => {
        const response = await request(app).post('/relationship').send({ "cpf1": "1234567890", "cpf2": "12345678000" });
        expect(response.status).toBe(404);
    });

    test('Se o relacionamento já existir retorna 400', async () => {
        const response = await request(app).post('/relationship').send({ "cpf1": "12345678900", "cpf2": "12345678000" });
        expect(response.status).toBe(400);
    });

});

describe('Recomendação de amigos', () => {
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
    test('Deve excluir todos os registros', async () => {
        const response = await request(app).delete('/clean');
        expect(response.status).toBe(200);
    });

});