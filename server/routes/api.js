express = require('express');
jwt = require('jsonwebtoken');
router = express.Router();
User = require('../models/user');

mongoose = require('mongoose');
db = 'mongodb+srv://mm:mm@auth.bhbr3ng.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(db, err=>{
    if(err){
        console.log('error!'+err);
    }
    else{
        console.log('Connected to MongoDb');
    }
})

function verifyToken(req,res,next){
    if(!req.headers.authorization){
        return res.status(401).send("Unauthorized request")
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token == 'null'){
        return res.status(401).send("Unauthorized request")
    }
    let payload = jwt.verify(token, 'secretKey')
    if(!payload){
        return res.status(401).send("Unauthorized request")
    }
    req.userId = payload.subject
    next()
}

router.get('/', (req,res)=>{
    res.send("From API route");
})

router.post('/register', (req,res)=>{
    userData = req.body;
    user = new User(userData);
    user.save((error, registeredUser)=>{
        if(error){
            console.log(error)
        }
        else{
            payload = {subject: registeredUser._id}
            token = jwt.sign(payload, 'secretKey')

            res.status(200).send({token})
        }
    })
})

router.post('/login', (req,res)=>{
    userData = req.body
    User.findOne({email: userData.email}, (error,user)=>{
        if(error){
            console.log(error);
        }
        else{
            if(!user){
                res.status(401).send("Invalid User");
            }
            else{
                if(user.password !== userData.password){
                    res.status(401).send("Invalid password");
                }
                else{
                    payload = {subject: user._id}
                    token = jwt.sign(payload,'secretKey')
                    res.status(200).send({token});
                }
            }
        }
    })
})

router.get('/events', (req,res)=>{
    events = [
        {
            "_id": "1",
            "name": "Auto Expo",
            "description": "lorem ispum",
            "date": "2022-09-01T18:25:43.511Z"
        },
        {
            "_id": "1",
            "name": "Auto Expo",
            "description": "lorem ispum",
            "date": "2022-09-01T18:25:43.511Z"
        },
        {
            "_id": "1",
            "name": "Auto Expo",
            "description": "lorem ispum",
            "date": "2022-09-01T18:25:43.511Z"
        },
        {
            "_id": "1",
            "name": "Auto Expo",
            "description": "lorem ispum",
            "date": "2022-09-01T18:25:43.511Z"
        },
    ]
    res.json(events);
})

router.get('/special', verifyToken, (req,res)=>{
    specialEvents = [
        {
            "_id": "1",
            "name": "Auto Expo",
            "description": "lorem ispum",
            "date": "2022-09-01T18:25:43.511Z"
        },
        {
            "_id": "1",
            "name": "Auto Expo",
            "description": "lorem ispum",
            "date": "2022-09-01T18:25:43.511Z"
        },
        {
            "_id": "1",
            "name": "Auto Expo",
            "description": "lorem ispum",
            "date": "2022-09-01T18:25:43.511Z"
        },
        {
            "_id": "1",
            "name": "Auto Expo",
            "description": "lorem ispum",
            "date": "2022-09-01T18:25:43.511Z"
        },
    ]
    res.json(specialEvents);
})

module.exports = router;