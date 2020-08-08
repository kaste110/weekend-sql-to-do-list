const pg = require('pg'); //require postgres

const config = { //set the postgres database and where to listen
    database: 'weekend-to-do-app',
    host: 'localhost',
    port: 5432,
};

const pool = new pg.Pool(config); //set pool to be pooling from the database

pool.on("connect", () => {
    console.log("connected to postgres");
});

pool.on("error", (err) => {
    console.log("error connecting to postgres", err);
});

module.exports = pool; //set pool as an export to be used by the router 