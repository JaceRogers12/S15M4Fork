const common = {
    client: "sqlite3",
    useNullAsDefault: true,
    migrations: {
        directory: "./data/migration"
    },
    seeds: {
        directory: "./data/seed"
    }
};

module.exports = {
    development: {
        ...common,
        connection: {
            filename: "./data/pokemon.db3"
        } 
    },
    testing: {
        ...common,
        connection: {
            filename: "./data/testing.db3"
        }
    },
    production: {
        
    }
}