require('./db/mongoose.js')

const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const express = require('express')
const bodyParser = require('body-parser')

// Const vars

const app = express()
const port = process.env.port || 3000

// Middlewares 

// app.use((req,res,next) => {
//     res.status(503).send("Web site in maintenance")
// })

app.use(bodyParser.json())
app.use(userRouter)
app.use(taskRouter)


app.listen(port, () => {
    console.log("Server up on port ",port)
})