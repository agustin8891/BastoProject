const request = require('supertest');
const app = require('../app.js'); 
const mongoose = require('mongoose');

describe('GET /animals', () => {
    beforeAll(async() => {
        await mongoose.connect('mongodb://localhost/animal');
    });

    afterAll(async() => {
        await mongoose.disconnect();
    });
	test('should respond with a 200 status code', async () => {
		const response = await request(app).get('/animals').send();
        expect(response.statusCode).toBe(200);

	});

	test('should respond with an array', async () => {
		const response = await request(app).get('/animals').send();
		expect(response.body).toBeInstanceOf(Array);

	});
})

describe('POST /animals', () => {
    beforeAll(async() => {
        await mongoose.connect('mongodb://localhost/animal');
    });

    afterAll(async() => {
        await mongoose.disconnect();
    });

    const newAnimal ={
        idSenasa: "id10",
        establishment: "Establishment1",
        type: "Toro",
        weight: 500,
        birthDate: "02/02/2015", 
        race: "AZUL BELGA",
        pregnant: false,
        dueDate: "05/30/2022", 
        observations: "observation1",
        paddockName: "paddock1",
        typeDevice: "COLLAR",
        deviceNumber: 50,
    };

	describe("given a new animal", () => {		
	test('should respond with a 200 status code', async() => {
		const response = await request(app).post('/animals').send(newAnimal);
		expect(response.statusCode).toBe(200);
	});

	test('should have a content-type: application/json in header', async () => {
		const response = await request(app).post("/animals").send(newAnimal);
		expect(response.headers['content-type']).toEqual(expect.stringContaining("json")
		);
	})

	test('should respond with an animal ID', async () => {
		const response = await request(app).post("/animals").send(newAnimal);
			expect(response.body.idSenasa).toBeDefined();
	})
	


	})

	describe("when any field is missing", () => {
		test('should respond with a 400 status code', async () => {
			const fields = [
				{},
				{establishment: "Establishment1",
                type: "Toro",
                weight: 500},
                {  
                race: "AZUL BELGA",
                pregnant: false,
                dueDate: "05/30/2022", 
                observations: "observation1",
                deviceNumber: 50},
                {    idSenasa: "id10",
                establishment: "Establishment1",               
                weight: 500,
                paddockName: "paddock1",
                typeDevice: "COLLAR",
                deviceNumber: 50},
                {    idSenasa: "id10",
                establishment: "Establishment1",
                type: "Toro",
                weight: 500,
                race: "AZUL BELGA",             
                typeDevice: "COLLAR",
                deviceNumber: 50},
                {    idSenasa: "id10",
                establishment: "Establishment1",
                type: "Toro",                
                birthDate: "02/02/2015", 
                typeDevice: "COLLAR",
                deviceNumber: 50},
			];
			for (const body of fields){
				const response = await request(app).post('/animals').send(body);
				expect(response.statusCode).toBe(404);
			}
		})
	})

})