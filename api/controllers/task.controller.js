const router = require('express').Router();
const authenticate = require('./auth');
const {Task} = require('../models/task.model');
const { List } = require('../models/list.model');

//** -----------TASKS----------- */

//Get all tasks in a spedific list
router.get('/lists/:listId/tasks', (req, res) => {
    Task.find({
        _listId: req.params.listId
    }).then((tasks) => {
        res.send(tasks)
    })
})

//Get a task
router.get('/lists/:listId/tasks/:taskId', async (req, res) => {
    const task = await List.findById(req.params.taskId)
    if(task) {
        res.status(200).send(task)
    } else {
        res.status(400).send(e)
    }
    // Task.findById(
    //     req.params.taskId
    // ).then((task) => {
    //     res.status(200).send({
    //         success:true,
    //         data:task
    //     })
    // }).catch(e => {
    //     res.status(400).send(e)
    // })
})

//Create a new task in a spedific list
router.post('/lists/:listId/tasks', (req, res) => {
    let newTask = new Task({
        title: req.body.title,
        _listId: req.params.listId
    })
    newTask.save().then((newTask) => {
        res.send(newTask)
    })
})

//Update task
router.patch('/lists/:listId/tasks/:taskId', (req, res) => {
    Task.findOneAndUpdate({
        _id: req.params.taskId,
        _listId: req.params.listId
    }, { $set: req.body }).then(() => {
        res.status(200).send({ message: 'Updated successfully' })
    })
})
//Delete task
router.delete('/lists/:listId/tasks/:taskId', (req, res) => {
    Task.findOneAndRemove({
        _id: req.params.taskId,
        _listId: req.params.listId
    }).then(() => {
        res.status(200)
    })
})

module.exports =router;