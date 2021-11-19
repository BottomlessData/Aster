const functions = require("firebase-functions");
const app = require('express')();

const { 
    getSingleTask,
    getAllTasks,
    getUserTask,
    createTask,
    uploadTaskData,
    userSubmitLabeledData,
} = require('./APIs/tasks')


app.get('/task/:task_id', getSingleTask);
app.get('/tasks', getAllTasks);
app.get('/task/:task_id/:user_id', getUserTask);

app.post('/task', createTask);
app.post('/task/:task_id/data', uploadTaskData);
app.post('/task/:task_id/submit', userSubmitLabeledData);

exports.api = functions.https.onRequest(app);
