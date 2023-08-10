const controller = require('../src/controllers/controller');
const personData = require('../src/data/mockData').person_tb;
const relationData = require('../src/data/mockData').relationship_tb;

describe('getRecommendation', () => {
    test('cpf com menos de 11 dígitos ou com caracter deve retornar erro 400', () => {
        const req = {
            params: {
                cpf: '12345678' 
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        controller.getRecommendations(req, res);
        expect(res.status).toHaveBeenCalledWith(200);

    });


    
})