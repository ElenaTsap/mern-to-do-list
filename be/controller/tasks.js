const tasks = require('../model/tasks');
const logs = require('../model/logs');

exports.postTask =  async (req, res) => {
    const newTask = new tasks (req.body);

    await newTask.save((err, docs) => {
        console.log( err);
        if (err) {
            res.send(err)
        } else {
            res.send(docs)
            logs.findByIdAndUpdate(req.logId, {postData: JSON.stringify(docs)}, ()=>{})
        }
    })
}

//getting all data from DB
exports.getAll = (req, res) => {
    tasks.find({}, (err, docs) => {
        if (err) {
            res.status(500).send({status: 'failed', message: err})
        } else {
            res.send({status: 'success', message: 'All data fetched!', data: docs});
            console.log('now we fetched');
        }
    })
}

exports.deleteTask = (req, res) => {
    const id = req.params.taskId;

    tasks.findByIdAndDelete(id, (err, doc) => {
        if(err) {
            res.send({status: 'failed', message: err})
        } else {
            logs.findByIdAndUpdate(req.logId, {preData: JSON.stringify(doc)},() => {})
            res.send({
                status: 'success', 
                message: `${doc.name} is deleted from your tasks`,
                data: doc._id 
            })
        }
    })
}

exports.updateTask = (req, res) => {
    console.log(req.body);
    const task = {...req.body};

    tasks.findByIdAndUpdate(task._id, task, { upsert: true, new: false, runValidators: true }, (err, doc) => {
        console.log(err);
            if(err) {
                console.log(err);
                res.send({status: 'failed', message: err})
            } else {
                console.log('I am the doc', doc);
                logs.findByIdAndUpdate(req.logId, {preData: JSON.stringify(doc), postData: JSON.stringify(task)},() => {})
                res.send({status: 'success', message: 'task updated successfully'})
            }
    });

/*     const updatedTask = await task.findById(task._id);

    Object.keys(task).forEach(key => updatedTask[key] = task[key]);

    updatedTask.save((err, doc) => {
        if (err) {
            console.log(err);
            res.send({status: 'failed', message: err})
        } else {
            console.log(doc);
            res.send({status: 'success', message: 'task updated successfully'})
        }
    }) */
}