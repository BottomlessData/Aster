const express = require('express')
const CONFIG = require('./config.json')

const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
const serviceAccount = require('./key.json');

initializeApp({
    credential: cert(serviceAccount)
});


const db = getFirestore() // Firebase

const app = express()
const port = CONFIG.port

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.post('/task/create', (req, res) => {
    const docRef = db.collection('tasks').doc();

    docRef.set(req.body).then(r => {
        res.send(`Task created successfully`)
    }).catch(err => {
        res.send(`Couldn't create task. Err: ${err}`)
    })
})



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})