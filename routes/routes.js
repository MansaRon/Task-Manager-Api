const express = require('express');
const cors = require('cors')
const TaskModel = require('../db/models/task.model');
const ListModel = require('../db/models/list.model');
const UserModel = require('../db/models/user.model');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();
module.exports = router;
app.use(cors())
// Load middleware
app.use(bodyParser.json());

// CORS handling
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-refresh-token, _id");
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Expose-Headers', 'x-access-token, x-refresh-token');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-refresh-token, _id, Authorization');
        res.header('Access-Control-Allow-Methods', 'GET, POST, HEAD, OPTIONS, PUT, DELETE, PATCH');
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

router.put('/lists/:listId/tasks/:taskId', async (req, res) => {
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

// User Routes
// Sign Up
router.post('/users', (req, res) => {
    let body = req.body;
    let newUser = new UserModel(body);

    newUser.save().then(() => { return newUser.createSession()
    }).then((refreshToken) => { return newUser.generateAccessAuthToken(
    ).then((accessToken) => { return {accessToken, refreshToken}})
    }).then((authTokens) => { res.header('x-refresh-token', authTokens.refreshToken).header('x-access-token', authTokens.accessToken).send(newUser);
    }).catch((err) => { res.status(400).send(err) })
})
// Sign Up

// Login
router.post('/users/login', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    UserModel.findByCredentials(email, password).then((user) => {
        return user.createSession().then((refreshToken) => { return user.generateAccessAuthToken().then((accessToken) => { return { accessToken, refreshToken }});
    }).then((authTokens) => { res.header('x-refresh-token', authTokens.refreshToken).header('x-access-token', authTokens.accessToken).send(user) })
    }).catch((e) => { res.status(400).send(e) });
})
// Login

// User Routes

let verifySession = (req, res, next) => {
    let refreshToken = req.header('x-refresh-token');
    let _id = req.header('_id');

    UserModel.findByIdAndToken(_id, refreshToken).then((user) => {
        if (!user) {
            return Promise.reject({'error': 'User not found. MAke sure refresh token and ID are correct.'});
        }

        let isSessionValid = false;

        // If user is found, therefore session is valid
        req.user_id = user._id;
        req.refreshToken = refreshToken;
        req.userObject = user;

        user.sessions.forEach((session) => {
            if (session.token == refreshToken) {
                if (UserModel.hasRefreshTokenExpired(session.expires) == false) {
                    // Refersh token
                    isSessionValid = true;
                }
            }
        });

        if (isSessionValid) {
            // VAlid session
            next();
        } else {
            return Promise.reject({ 'error': 'Refersh token expired or invalid.' });
        }

    }).catch((err) => {
        res.status(401).send(err);
    })
}

// Gets Access Token
router.get('/users/me/access-token', verifySession, (req, res) => {
    req.userObject.generateAccessAuthToken().then((accessToken) => {
        res.header('x-access-token', accessToken).send({ accessToken });
    }).catch((err) => {
        res.status(400).send(err);
    })
})



