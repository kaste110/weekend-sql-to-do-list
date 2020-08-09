const express = require('express');//make router require express
const router = express.Router(); 

const pool = require('../modules/pool');//make any pool in this file pull from the pool.js file

router.post('/', (req, res) => {
    let newTask = req.body;
    console.log('adding new task', newTask);
    
    let queryText = `INSERT INTO "tasks" ("taskInfo", "complete") VALUES ($1, $2);`;

    pool.query(queryText, [newTask.taskInfo, newTask.complete])
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

router.delete('/:id', (req, res) => {
    let taskId = req.params.id;
    console.log(`task with ID of ${taskId} will be deleted from database`);
    let queryText = `DELETE FROM "tasks" WHERE "id" = $1;`
    pool.query(queryText, [taskId]).then((response) => {
        console.log(response);
        res.sendStatus(200);
    }).catch((error) => {
        console.log('error in DELETE', error);
        res.sendStatus(500);
    });
});

router.put('/:id', (req, res) => {
    //let completeTask = req.body;
    let completeTaskId = req.params.id;
    console.log(`task with id of ${completeTaskId} is done and ready to be marked complete`);
    let queryText = `UPDATE "tasks" SET "complete" = $2 WHERE "id" = $1;`

    pool.query(queryText, [completeTaskId, req.body.complete]).then((response) => {
        console.log('task is complete!');
        res.sendStatus(200);
    }).catch((error) => {
        console.log('error, task cannot be completed', error);
        res.sendStatus(500);
    });
})






module.exports = router; //establish router as the export to be used by other files