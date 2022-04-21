const express = require('express');
const cors = require('cors')
const router = express.Router()
module.exports = router;
const TaskModel = require('../db/models/task.model');
const ListModel = require('../db/models/list.model');
const app = express();

app.use(cors())

// CORS handling
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Credentials', true);
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
        return res.status(200).json({});
    };
    next();
    console.log('Inside CORS...')
});

// Lists API
router.get('/all-lists', async (req, res, next) => {
    try {
        const data = await ListModel.find(); 
        return res.json(data);
    }
    catch (error) {
        if (res.status(400)) { res.status(400).json({message: error.message}) } else
        if (res.status(401)) { res.status(401).json({message: error.message}) } else 
        if (res.status(403)) { res.status(403).json({message: error.message}) } else 
        if (res.status(405)) { res.status(405).json({message: error.message}) } else 
        if (res.status(500)) { res.status(500).json({message: error.message}) }
    }
    //next();
})

router.post('/lists', async (req, res, next) => {
    const data = ListModel({ title: req.body.title });
    try {
        const savaData = await data.save(); res.status(200).json(savaData);
    }
    catch (error) {
        if (res.status(400)) { res.status(400).json({message: error.message}) } else
        if (res.status(401)) { res.status(401).json({message: error.message}) } else 
        if (res.status(403)) { res.status(403).json({message: error.message}) } else 
        if (res.status(405)) { res.status(405).json({message: error.message}) } else 
        if (res.status(500)) { res.status(500).json({message: error.message}) }
    }
    next();
})

router.patch('/lists/:id', async (req, res) => {
    try {
        await ListModel.findOneAndUpdate({ _id: req.params.id}, { $set: req.body }).then(() => { res.sendStatus(200) });
    }
    catch (error) {
        if (res.status(400)) { res.status(400).json({message: error.message}) } else
        if (res.status(401)) { res.status(401).json({message: error.message}) } else 
        if (res.status(403)) { res.status(403).json({message: error.message}) } else 
        if (res.status(405)) { res.status(405).json({message: error.message}) } else 
        if (res.status(500)) { res.status(500).json({message: error.message}) }
    }
})

router.delete('/lists/:id', async (req, res) => {
    try {
        await ListModel.findOneAndRemove({ _id: req.params.id}).then((removedList) => { res.send(removedList).status(200) });
    } catch (error) {
        if (res.status(400)) { res.status(400).json({message: error.message}) } else
        if (res.status(401)) { res.status(401).json({message: error.message}) } else 
        if (res.status(403)) { res.status(403).json({message: error.message}) } else 
        if (res.status(405)) { res.status(405).json({message: error.message}) } else 
        if (res.status(500)) { res.status(500).json({message: error.message}) }
    }
})
// Lists API

// Getting tasks under specific list
router.get('/all-lists/:listId/tasks', async (req, res) => {
    try {
        const taskData = await TaskModel.find({ _listId: req.params.listId }); res.json(taskData);
    }
    catch (error) {
        if (res.status(400)) { res.status(400).json({message: error.message}) } else
        if (res.status(401)) { res.status(401).json({message: error.message}) } else 
        if (res.status(403)) { res.status(403).json({message: error.message}) } else 
        if (res.status(405)) { res.status(405).json({message: error.message}) } else
        if (res.status(500)) { res.status(500).json({message: error.message}) }
    }
})

router.get('/lists/:listId/tasks', async (req, res) => {
    try {
        const taskData = await TaskModel.findOne({ _id: req.params.taskId, _listId: req.params.listId }); res.json(taskData);
    }
    catch (error) {
        if (res.status(400)) { res.status(400).json({message: error.message}) } else
        if (res.status(401)) { res.status(401).json({message: error.message}) } else 
        if (res.status(403)) { res.status(403).json({message: error.message}) } else 
        if (res.status(405)) { res.status(405).json({message: error.message}) } else
        if (res.status(500)) { res.status(500).json({message: error.message}) }
    }
})

router.post('/lists/:listId/tasks', async (req, res) => {
    const taskList = TaskModel({ title: req.body.title, _listId: req.params.listId });
    try {
        const savaData = await taskList.save(); res.status(200).json(savaData);
    }
    catch (error) {
        if (res.status(400)) { res.status(400).json({message: error.message}) } else 
        if (res.status(401)) { res.status(401).json({message: error.message}) } else
        if (res.status(403)) { res.status(403).json({message: error.message}) } else 
        if (res.status(405)) { res.status(405).json({message: error.message}) } else
        if (res.status(500)) { res.status(500).json({message: error.message}) }
    }
})

router.patch('/lists/:listId/tasks/:taskId', async (req, res) => {
    try {
        await TaskModel.findOneAndUpdate({ _id: req.params.taskId, _listId: req.params.listId }, { $set: req.body }).then(() => { res.sendStatus(200) });
    } catch (error) {
        if (res.status(400)) { res.status(400).json({message: error.message}) } else
        if (res.status(401)) { res.status(401).json({message: error.message}) } else 
        if (res.status(403)) { res.status(403).json({message: error.message}) } else 
        if (res.status(405)) { res.status(405).json({message: error.message}) } else 
        if (res.status(500)) { res.status(500).json({message: error.message}) }
    }
})

router.delete('/lists/:listId/tasks/:taskId', async (req, res) => {
    try {
        await TaskModel.findOneAndDelete({ _id: req.params.taskId, _listId: req.params.listId }).then((removedTask) => { res.send(removedTask).status(200) });
    } catch (error) {
        if (res.status(400)) { res.status(400).json({message: error.message}) } else
        if (res.status(401)) { res.status(401).json({message: error.message}) } else 
        if (res.status(403)) { res.status(403).json({message: error.message}) } else 
        if (res.status(405)) { res.status(405).json({message: error.message}) } else 
        if (res.status(500)) { res.status(500).json({message: error.message}) }
    }
})
// Getting tasks under specific list


