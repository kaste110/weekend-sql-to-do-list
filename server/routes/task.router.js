const express = require('express');//make router require express
const router = express.Router(); 

const pool = require('../modules/pool');//make any pool in this file pull from the pool.js file

router.post('/', (req, res) => {
    let newTask = req.body;
    console.log('adding new task', newTask);
    
    let queryText = `INSERT INTO "tasks" ("task", "complete") VALUES ($1, $2);`;

    pool.query(queryText, [newTask.task, newTask.complete])
        .then(result => {
            console.log(result);
            res.sendStatus(201);
        })
        .catch(error => {
            console.log('error in adding new task', error);
            res.sendStatus(500);
        });
});

router.get('/', (req, res) => {
    let queryText = `SELECT * FROM "tasks" ORDER BY "id" DESC;`
    pool.query(queryText).then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log('error in GET', error);
        res.sendStatus(500);
    });
})







module.exports = router; //establish router as the export to be used by other files