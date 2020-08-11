const router = require('express').Router();
const authenticate = require('./auth')
const {List} = require('../models/list.model')
const {Task} = require('../models/task.model')

//** ---------------LIST--------------- */

//get all lists
router.get('/lists', authenticate, (req, res) => {
    List.find({
         _userId: req.user_id
    }).then((lists) => {
        res.send(lists);
    })
})

//create a list
router.post('/lists',authenticate, (req, res) => { 
    let title = req.body.title; 
    let newList = new List({
        title,
        _userId: req.user_id
    });
    newList.save().then((listDoc) => { 
        res.send(listDoc);
    }).catch((e) => {
        res.status(400).send(e);
    })
});
//get a list
router.get('/lists/:listId',authenticate,async(req,res) => {
    const list = await List.findById(req.params.listId)
    if(list) {
        res.status(200).send(list)
    } else {
        res.status(400).send(e)
    }
    // List.findById(req.params.listId).then(list => {
    //     res.status(200).send(list)
    // }).catch((e) => {
    //     res.status(400).send(e)
    // })
})

//update specified list
router.patch('/lists/:id', authenticate,(req, res) => { 
    List.findOneAndUpdate({
        _id: req.params.id,
        _userId: req.params.user_id
    }, { $set: req.body }).then(() => {
        res.status(200).send({ message: 'Updated successfully' })
    }).catch(e => {
        res.status(400).send(e)
    })
})

//Delete list by id
router.delete('/lists/:id', authenticate, (req, res) => { 
    List.findOneAndRemove({
        _id: req.params.id,
        _userId: req.user_id
    }).then((removedListDoc) => {
        res.send(removedListDoc);  
        deleteTasksFromList(removedListDoc._id);
    })
});

/* HELPER METHODS */
let deleteTasksFromList = (_listId) => {
    Task.deleteMany({
        _listId
    }).then(() => {
        console.log("Tasks from " + _listId + " were deleted!");
    })
}
router.options('/lists/options',(req,res)=> {
    console.log(res);
    
    res.send(res.headersSent)
})

module.exports = router;
