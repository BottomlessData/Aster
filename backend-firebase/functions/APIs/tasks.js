const { db } = require('../util/admin');
const { firebaseConfig } = require('../util/config');
const { initializeApp } = require('firebase/app');

initializeApp(firebaseConfig);

const getTaskDescription = (task) => {
    let data = task.data()
    return {
        id: task.id,
        name: data.name,
        description: data.description,
        total_price: data.total_price,
        number_of_labelers: data.number_of_labelers,
    }
}

exports.getSingleTask =  async (req, res) => {
    db.collection('tasks')
        .doc(req.params.task_id)
        .get()
        .then(doc => {
            if (!doc.exists || doc === undefined) {
                // throw new Error('No such task!')
                res.send("Task does not exist")
            } else {
                res.send(JSON.stringify(getTaskDescription(doc)))
            }
        })
        .catch(err => {
            console.log('Error getting document', err)
            res.send(JSON.stringify(err))
        })
}

exports.getAllTasks = async (req, res) => {
    db.collection('tasks')
        .get()
        .then(snapshot => {
            const tasks = []
            snapshot.forEach(doc => {
                tasks.push(getTaskDescription(doc))
            })
            res.send(JSON.stringify(tasks))
        })
        .catch(err => {
            console.log('Error getting documents', err)
            res.send(JSON.stringify(err))
        })
}

exports.getUserTask = async (req, res) => {
    db.collection('tasks')
        .doc(req.params.task_id)
        .get()
        .then(doc => {
            let d = doc.data().dataset
            // TODO FIXME this is returning all data for now!
            res.send(JSON.stringify(d))
        }).catch(err => {
            console.log('Error getting document', err)
            res.send(JSON.stringify(err))
        })
}

// Create a task
exports.createTask = async (req, res) => {
    let data = req.body

    let name, description, total_price, number_of_labelers, labels;

    // Validate data
    try {
        // alphanumeric name and description
        name = data.name.match("^[0-9a-zA-Z]+")[0]
        description = data.name.match("^[0-9a-zA-Z]+")[0]
        total_price = Number(data.total_price)
        if (isNaN(total_price)) {
            throw new Error('Total price is not a number')
        }

        number_of_labelers = parseInt(data.number_of_labelers)
        if (isNaN(number_of_labelers)) {
            throw new Error('Number of labels is not an integer')
        }

        labels = data.labels
        // check if labels is an array of strings
        if (!Array.isArray(labels)) {
            throw new Error('Labels is not an array')
        }
        labels.forEach(label => {
            if (typeof label !== 'string') {
                throw new Error('Labels is not an array of strings')
            }
        })

        let task = {
            name: name,
            description: description,
            total_price: total_price,
            number_of_labelers: number_of_labelers,
            labels: labels
        }

        // Submit the data to the database
        db.collection('tasks')
            .add(task)
            .then(doc => {
                console.log(`Task added with ID: ${doc.id}`)
                res.send(JSON.stringify(doc.id))
            })

    } catch (err) {
        console.log(err)
        res.send(JSON.stringify(err))
        return
    }
}

// 
exports.uploadTaskData = async (req, res) => {
    let data = req.body.data

    // Validate the given data is an array of strings
    try {
        if (!Array.isArray(data)) {
            throw new Error(`Data is not an array, but ${data}`)
        }

        data.forEach(label => {
            if (typeof label !== 'string') {
                throw new Error('Data is not an array of strings')
            }
        })

        // Transform data into an ordered sequence with indexes
        let data_with_indexes = {}
        data.forEach((label, index) => {
            data_with_indexes[index] = label
        })


        // Validate task exists
        task = db.collection('tasks')
            .doc(req.params.task_id)
            .get()
            .then(snapshot => {
                if (!snapshot.exists) {
                    throw new Error('Task does not exist')
                }

                // Submit the data to the database
                db.collection('tasks')
                    .doc(req.params.task_id)
                    .update({
                        dataset: data_with_indexes,
                    }).then(() => {
                        res.send(JSON.stringify('Data submitted'))
                    })
            })
    } catch (err) {
        console.log(err)
        res.send(JSON.stringify(err))
        return
    }
}

exports.userSubmitLabeledData = async (req, res) => {
    // Validate input, should be a map with index number : String
    let data = req.body.data
    console.log(data)


    let reviewer = req.body.reviewer
    console.log(reviewer)
    // TODO add validations here

    // Validate task exists
    task = db.collection('tasks')
        .doc(req.params.task_id)
        .get()
        .then(snapshot => {
            if (!snapshot.exists) {
                throw new Error('Task does not exist')
            }

            // Validate if the given indices exist
            let entries = snapshot.data().dataset

            // TODO is checking the last one enough? Or is this safer?
            Object.keys(data).forEach(index => {
                if (!entries[index]) {
                    throw new Error(`Index ${index} does not exist`)
                }
            })

            // Validate if the used labels exist
            let reviewer_labels = new Set(Object.values(data))
            let task_labels = new Set(Object.values(snapshot.data().labels))

            reviewer_labels.forEach(label => {
                if (!task_labels.has(label)) {
                    throw new Error(`Label ${label} does not exist`)
                }
            })

            // Inside collection tasks, in the document task_id, under the submissions label, create a new document with the id reviewer and add this data as the value
            console.log("Reviewer: ", reviewer)
            db.collection('tasks')
                .doc(req.params.task_id)
                .collection('submissions')
                .doc(String(reviewer))
                .set(
                    { "answers": data }
                ).then(() => {
                    res.send(JSON.stringify('Data submitted'))
                })

        }).catch(err => {
            console.log(err)
            res.send(JSON.stringify(err))
            return
        })
}
