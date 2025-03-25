const express = require('express')
const dbHandler = require('./dbHandler')
require('dotenv').config()

const server = express()

server.use(express.json())
server.use(express.static('public'))

dbHandler.table.sync({alter: true})
dbHandler.table2.sync({alter: true})

const JWT = require('jsonwebtoken')

function Auth() {
    return (req,res,next) => {
        const authHeader = req.headers.Authorization
        //Bearer token
        if(!authHeader.startsWith('Bearer')){
            res.json({'message':'Hibás/nem létező token'})
        }
        else{
            const encryptedToken = authHeader.split(' ')[1]
            try {
                const token = JWT.verify(encryptedToken,process.env.SECRETKEY)
                res.json({'message':'siker'})
            } catch (error) {
                res.json({'message':error})
            }
        }
        res.end()
    }
}

server.get('/profil', Auth(), async (req,res) => {
    res.json({'message':'ez egy nagyon titkos hely'})
    res.end()
})

server.get("/profiles", async (req, res) => {
    res.json(await dbHandler.table.findAll({
        attributes: ["username"]
    })).end()
})

server.get("/names", async (req, res) => {
    res.json(await dbHandler.table2.findAll({
        attributes: ["name"]
    })).end()
})

server.get("/ages", async (req, res) => {
    res.json(await dbHandler.table2.findAll({
        attributes: ["age"]
    })).end()
})

server.post('/register', async (req,res) => {
    const oneUser = await dbHandler.table.findOne({
        where:{
            username:req.body.registerUsername
        }
    })
    if(oneUser){
        res.status(401).json({'message':'Már létezik ilyen felhasználó'})
    }
    else{
        await dbHandler.table.create({
            username: req.body.registerUsername,
            password: req.body.registerPassword
        })
        res.json({'message':'Sikeres regisztráció'})
    }
    res.end()
})

server.post('/create', async (req,res) => {
    const oneUser = await dbHandler.table2.findOne({
        where:{
            name:req.body.name
        }
    })
    if(oneUser){
        res.status(401).json({'message':'Már létezik ilyen'})
    }
    else{
        await dbHandler.table2.create({
            name: req.body.name,
            age: req.body.age
        })
        res.json({'message':'Siker'})
    }
    res.end()
})

server.delete("/delete", async (req, res) =>{
    const oneUser = await dbHandler.table2.findOne({
        where:{
            name:req.body.name
        }
    })
    if(oneUser){
        await oneUser.destroy()
        req.json({"message":"Destroyed"})
    }
    else{
        res.json({"message":"Not found"})
    }
    res.end()
})

server.post('/login', async (req,res) => {
    const oneUser = await dbHandler.table.findOne({
        where:{
            username:req.body.loginUsername,
            password:req.body.loginPassword
        }
    })
    if(oneUser){
        const token = JWT.sign({'username': oneUser.username},process.env.SECRETKEY,{expiresIn: '1h'})
        res.json({'token':token,'message':'sikeres bejelentkezés'})
    }
    else{
        res.json({'message':'sikertelen bejelentkezés'})
    }
    res.end()
})

server.listen(3000,() => {console.log('A szerver fut a 3000-es porton');})