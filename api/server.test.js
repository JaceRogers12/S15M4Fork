const server = require("./server.js");
const request = require("supertest");
const db = require("../data/db-config.js");

describe("server.js", () => {
    const Treecko = {name: "Treecko", type: "Grass"};
    const Torchic = {name: "Torchic", type: "Fire"};
    const Mudkip = {name: "Mudkip", type: "Water"};
    const Spinda = {name: "Spinda", type: "Normal"};
    const Grovyle = {name: "Grovyle", type: "Grass"};
    beforeAll(async () => {
        await db.migrate.rollback();
        await db.migrate.latest();
    })
    beforeEach(async () => {
        await db.seed.run();
    })
    test("[0] sanity", () => {
        expect(true).toBeTruthy();
    })
    test("[0] environment is testing", () => {
        expect(process.env.NODE_ENV).toBe("testing");
    })
    describe(`GET("/api/pokemon")`, () => {
        test("[1] returns all the pokemon", async () => {
            const response = await request(server).get("/api/pokemon");
            expect(response.body).toHaveLength(3);
            expect(response.body[0]).toMatchObject(Treecko);
            expect(response.body[1]).toMatchObject(Torchic);
            expect(response.body[2]).toMatchObject(Mudkip);
        })
        test("[2] returns correct 200 OK status code", async () => {
            const response = await request(server).get("/api/pokemon");
            expect(response.status).toBe(200);
        })
    })
    describe(`POST("/api/pokemon")`, () => {
        test("[3] returns correct 201 CREATED status code", async () => {
            const response = await request(server).post("/api/pokemon").send(Grovyle);
            expect(response.status).toBe(201);
        })
        test("[4] returns newly created pokemon", async () => {
            const response1 = await request(server).post("/api/pokemon").send(Grovyle);
            expect(response1.body).toMatchObject(Grovyle);
            const response2 = await request(server).post("/api/pokemon").send({name: "Spinda"});
            expect(response2.body).toMatchObject(Spinda);
        })
        test("[5] adds pokemon to the database", async () => {
            await request(server).post("/api/pokemon").send(Grovyle);
            expect(await db("pokemon")).toHaveLength(4);
            await request(server).post("/api/pokemon").send(Spinda);
            expect(await db("pokemon")).toHaveLength(5);
        })
    })
    describe(`DELETE("/api/pokemon/:id")`, () => {
        test("[6] returns correct 200 OK status code", async () => {
            const response = await request(server).delete("/api/pokemon/1")
            expect(response.status).toBe(200);
        })
        test("[7] returns the deleted pokemon", async () => {
            const response1 = await request(server).delete("/api/pokemon/1")
            expect(response1.body).toMatchObject(Treecko);
            const response2 = await request(server).delete("/api/pokemon/2")
            expect(response2.body).toMatchObject(Torchic);
        })
        test("[8] removes pokemon from the database", async () => {
            await request(server).delete("/api/pokemon/1")
            expect(await db("pokemon")).toHaveLength(2);
            await request(server).delete("/api/pokemon/2")
            expect(await db("pokemon")).toHaveLength(1);
        })
    })
})