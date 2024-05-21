const db =  require("../../data/db-config.js");
const Pokemon = require("./pokemon-model.js");

describe("pokemon-model file", () => {
    const Treecko = {name: "Treecko", type: "Grass"};
    const Torchic = {name: "Torchic", type: "Fire"};
    const Mudkip = {name: "Mudkip", type: "Water"};
    const Zigzagoon = {name: "Zigzagoon", type: "Normal"};
    const Torkoal = {name: "Torkoal", type: "Fire"}
    beforeAll(async () => {
        await db.migrate.rollback();
        await db.migrate.latest();
    })
    beforeEach(async () => {
        await db.seed.run();
    })
    test("[0] sanity", () => {
        expect(true).not.toBeFalsy();
    })
    test("[0] environment is testing", () => {
        expect(process.env.NODE_ENV).toBe("testing")
    })
    describe("getAll", () => {
        test("[1] returns an array with the correct contents", async () => {
            let records = await Pokemon.getAll();
            expect(records).toHaveLength(3);
            expect(records[0]).toMatchObject(Treecko);
            expect(records[1]).toMatchObject(Torchic);
            expect(records[2]).toMatchObject(Mudkip);
        })
    })
    describe("getById", () => {
        test("[2] returns the correct object", async () => {
            let record1 = await Pokemon.getById(1);
            expect(record1).toMatchObject(Treecko);
            let record2 = await Pokemon.getById(2);
            expect(record2).toMatchObject(Torchic);
            let record3 = await Pokemon.getById(3);
            expect(record3).toMatchObject(Mudkip);
        })
    })
    describe("insert", () => {
        test("[3] returns the correct pokemon", async () => {
            let newRecord1 = await Pokemon.insert({name: "Zigzagoon"});
            expect(newRecord1).toMatchObject(Zigzagoon);
            let newRecord2 = await Pokemon.insert(Torkoal);
            expect(newRecord2).toMatchObject(Torkoal);
        })
        test("[4] adds pokemon to the database", async () => {
            await Pokemon.insert({name: "Zigzagoon"});
            expect(await db("pokemon")).toHaveLength(4);
            await Pokemon.insert(Torkoal);
            expect(await db("pokemon")).toHaveLength(5);
        })
    })
    describe("remove", () => {
        test("[5] returns the correct pokemon", async () => {
            let deletedRecord1 = await Pokemon.remove(1);
            expect(deletedRecord1).toMatchObject(Treecko);
            let deletedRecord2 = await Pokemon.remove(2);
            expect(deletedRecord2).toMatchObject(Torchic);
        })
        test("[6] deletes the pokemon from the database", async () => {
            await Pokemon.remove(1);
            expect(await db("pokemon")).toHaveLength(2);
            await Pokemon.remove(2);
            expect(await db("pokemon")).toHaveLength(1);
        })
    })
})