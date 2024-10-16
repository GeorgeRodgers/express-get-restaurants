const Restaurant = require("./models/index")
const { seedRestaurant } = require("./seedData");
const db = require("./db/connection")
const request = require(`supertest`);
const app = require(`./src/app`);

beforeAll( async () => {
    await db.sync({force: true});
    await Restaurant.bulkCreate(seedRestaurant);
});

describe(`./restaurants GET request`, () => {
    test(`gets the correct response`, async () => {
        const response = await request(app).get(`/restaurants`);
        expect(response.statusCode).toBe(200);
        const responseData = JSON.parse(response.text);
        expect(responseData.length).toBe(seedRestaurant.length);
        expect(Array.isArray(responseData)).toBe(true);
        for (let i = 0; i < seedRestaurant.length; i++){
            expect(responseData[i].name).toEqual(seedRestaurant[i].name);
            expect(responseData[i].location).toEqual(seedRestaurant[i].location);
            expect(responseData[i].cuisine).toEqual(seedRestaurant[i].cuisine);
        };
    });
});

describe(`./restaurants/:id GET request`, () => {
    test(`gets the correct response`, async () => {
        for (let i = 0; i < seedRestaurant.length; i++){
            const response = await request(app).get(`/restaurants/${i + 1}`);
            expect(response.statusCode).toBe(200);
            const responseData = JSON.parse(response.text);
            expect(responseData.name).toEqual(seedRestaurant[i].name);
            expect(responseData.location).toEqual(seedRestaurant[i].location);
            expect(responseData.cuisine).toEqual(seedRestaurant[i].cuisine);
        };
    });
});

describe(`./restaurants/:id POST request`, () => {
    test(`gets the correct response`, async () => {
            const response = await request(app).post(`/restaurants`).send({"name": "createTestName", "location": "createTestLocation", "cuisine": "createTestCuisine"});;
            expect(response.statusCode).toBe(200);
            const responseData = JSON.parse(response.text);
            expect(responseData.id).toEqual(seedRestaurant.length + 1);
            expect(responseData.name).toEqual(`createTestName`);
            expect(responseData.location).toEqual(`createTestLocation`);
            expect(responseData.cuisine).toEqual(`createTestCuisine`);
    });
});

describe(`./restaurants/:id PUT request`, () => {
    test(`gets the correct response`, async () => {
        const response = await request(app).put(`/restaurants/1`).send({"name": "updateTestName", "location": "updateTestLocation", "cuisine": "updateTestCuisine"});
        expect(response.statusCode).toBe(200);
        const responseData = JSON.parse(response.text);
        expect(responseData.name).toEqual(`updateTestName`);
        expect(responseData.location).toEqual(`updateTestLocation`);
        expect(responseData.cuisine).toEqual(`updateTestCuisine`);
    });
});

describe(`./restaurants/:id DELETE request`, () => {
    test(`gets the correct response`, async () => {
        const response = await request(app).delete(`/restaurants/1`);
        expect(response.statusCode).toBe(200);
        const responseData = JSON.parse(response.text);
        expect(responseData.name).toEqual(`updateTestName`);
        expect(responseData.location).toEqual(`updateTestLocation`);
        expect(responseData.cuisine).toEqual(`updateTestCuisine`);
    });
});


afterAll( async () => {
    await db.sync({force: true});
    await Restaurant.bulkCreate(seedRestaurant);
});