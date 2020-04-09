const express = require('express')
const router = new express.Router()
const User = require('../models/User')
const auth = require('../middlewares/auth')
const multer = require('multer')
const storage = multer.memoryStorage()
const sharp = require('sharp')
const { sendWelcomeEmail, sendCancelationEmail } = require('../emails/account')


// GET
/*
router.get('/users', auth, async (req,res) => {
    try{
        const users = await User.find({})
        res.send(users)
    }catch(e) {
        res.status(500).send(e)
    }
})*/

router.get('/users/:id/avatar', async(req, res) => {
    try{
        const user = await User.findById(req.params.id)

        if (!user || !user.avatar){
            throw new Error()
        }

        res.set('Content-type', 'image/png')
        res.send(user.avatar)
    }catch(e){
        res.status(404).send()
    }
})

router.get('/users/me', auth, async (req,res) => {
    res.send(req.user)
})
/*
router.get('/users/:id', async(req,res) => {
    const _id = req.params.id
    try{
        const user = await User.findById(_id)
        if (!user)
            return res.status(404).send()
        res.send(user)
    }catch(e){
        return res.status(500).send(e)
    }
})*/

// POST

router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try{
        await user.save()
        sendWelcomeEmail(user.email, user.name)
        const token = await user.generateAuthToken() 
        res.status(201).send({user,token})
    }catch(e){console.log(e);res.status(400).send(e)}
})

router.post('/users/login', async (req, res) => {
    console.log(req.body)
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({user, token})
    }catch(e){console.log(e);res.status(400).send(e)}
})

router.post('/users/logout',auth, async (req, res) => {
    try{
        console.log(req.user.tokens)
        console.log(req.token)
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })

        await req.user.save()

        res.send()
    }catch(e){
        console.log(e)
        res.status(500).send()
    }
})

router.post('/users/logoutAll',auth, async (req, res) => {
    try{
        req.user.tokens = []

        await req.user.save()

        res.send()
    }catch(e){
        console.log(e)
        res.status(500).send()
    }
})
/*
const upload = multer({
    dest:'avatars',
    limits:{
        fileSize : 100000
    },
    fileFilter(req, file, cb){
        if (!file.originalname.match(/\.(doc|docx)$/g)){
            return cb(new Error('Please update a Word doc'))
        }
        cb(undefined, true)
    }
})*/

const upload = multer({
    dest: 'avatars',
    storage,
    limits:{
        fileSize:1000000
    },  
    fileFilter(req,file,cb){
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/g))
            return cb(new Error('Please update a jpg, jpeg or png image'))
        cb(undefined, true)
    }
})

router.post('/users/me/avatar', auth, upload.single('avatar'),  async(req, res) => {
    const buffer = await sharp(req.file.buffer).resize({width:250, height:250}).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error:error.message })
})



// PATCH

router.patch('/users/me',auth, async(req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ["name", "age", "email", "password"]
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation)
        return res.status(404).send({error:'Invalid updates !'})

    //const _id = req.params.id
    //const _body = req.body
    try{
        //const user = await User.findOneAndUpdate(_id,  _body , { new:true, runValidators:true})
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    }catch(e){console.log(e); res.status(400).send(e)}
})

// DELETE

router.delete('/users/me', auth,async(req, res) => {
    try{
        /*const user = await User.findOneAndDelete(_id)
        if (!user)
            return res.status(404).send()*/
        await req.user.remove()
        sendCancelationEmail(req.user.email, req.user.name)

        res.send(req.user)
    }catch(e){ res.status(500).send(e)}
})

router.delete('/users/me/avatar', auth,  async(req, res) => {
    req.user.avatar = undefined
    await req.user.save()
    res.send()
})


module.exports = router