const express = require('express');
const router = express.Router()
module.exports = router;
const TaskModel = require('../db/models/task.model');

router.get('/tasks', async (req, res) => {
    // try {
    //     const data = await Model.TaskModel();
    //     res.json(data)
    // }
    // catch (error) {
    //     if (res.status(401)) {
    //         res.status(401).json({message: error.message})
    //     }
    //     else if (res.status(403)) {
    //         res.status(403).json({message: error.message})
    //     }
    //     else if (res.status(405)) {
    //         res.status(405).json({message: error.message})
    //     }
    // }
})

router.post('/lists', async (req, res) => {

    const data = TaskModel({
        title: req.body.title
    })

    try {
        const savaData = await data.save();
        res.status(200).json(savaData);
    }
    catch (error) {
        if (res.status(400)) {
            res.status(400).json({message: error.message})
        }
        else if (res.status(401)) {
            res.status(401).json({message: error.message})
        }
        else if (res.status(403)) {
            res.status(403).json({message: error.message})
        }
        else if (res.status(405)) {
            res.status(405).json({message: error.message})
        }
    }
})

router.patch('/lists/:id', async (req, res) => {

})

router.delete('/lists/:id', async (req, res) => {
    
})

