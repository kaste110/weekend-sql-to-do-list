const express = require('express'); //establish express const
const bodyParser = require('body-parser'); //establish bodyParser const
const taskRouter = require('./routes/task.router.js'); //designate the router we want to use

const app = express();// set the app to be express
app.use(bodyParser.urlencoded({extended: true})); // make express use bodyParser
app.use('/tasks', taskRouter); //make express use information from the router
app.use(express.static('server/public'));

const PORT = process.env.PORT || 5000; // set the PORT we want to be listening on

app.listen(PORT, () => {
    console.log('listening on port', PORT);
}); //make express listen on the designated PORT