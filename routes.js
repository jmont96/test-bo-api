const express = require('express');

const router = express.Router()
const UserModel = require('./model');
var jwt = require('jsonwebtoken');


//Post Method
router.post('/debit', async (req, res) => {
    try {
        const {userId, amount} = req.body
        if (!userId || !amount) {
            throw new Error('No user Id or amount')
        }
        const userDoc = await UserModel.findOne({userId})
        userDoc.balance = userDoc.balance - amount;
        userDoc.save()
        res.json(userDoc)
    } catch (e) {
        console.error(e)
    }
})

router.post('/credit', async (req, res) => {
    try {
        const {userId, amount} = req.body
        if (!userId) {
            throw new Error('No user Id')
        }
        const userDoc = await UserModel.findOne({userId})
        userDoc.balance = userDoc.balance + amount;
        userDoc.save()
        res.json(userDoc)
    } catch (e) {
        console.error(e)
    }
})


//Get by ID Method
router.get('/balance/:userId', async (req, res) => {
    try {
        const {userId} = req.params
        if (!userId) {
            throw new Error('No user Id')
        }
        const userDoc = await UserModel.findOne({userId})
        res.json(userDoc.balance)
    } catch (e) {
        console.error(e)
    }
})

//Get by ID Method
router.get('/user/:userId', async (req, res) => {
    try {
        const {userId} = req.params
        if (!userId) {
            throw new Error('No user Id')
        }
        const userDoc = await UserModel.findOne({userId})
        if (!userDoc) {
            throw new Error('No user doc found')
        }
        res.json(userDoc)
    } catch (e) {
        console.error(e)
    }
})

//Get by ID Method
router.get('/token/:id', async (req, res) => {
    try {
        const {id} = req.params
        if (!id) {
            throw new Error('No user Id')
        }
        const userDoc = await UserModel.findById(id)
        if (!userDoc) {
            throw new Error('No user doc found')
        }
        const token = jwt.sign({
            email: userDoc.email,
            userId: userDoc.userId,
            username: userDoc.username,
            picture: userDoc.picture
        }, 'betOpenly');

        res.json({token})
    } catch (e) {
        console.error(e)
    }
})


module.exports = router;
