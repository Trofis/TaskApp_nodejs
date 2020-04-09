const mongoose = require("mongoose")

const mongodb_url = process.env.MONGODB_URL
mongoose.connect(mongodb_url, {
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
    useFindAndModify: false
})




/*
const me = new User({
    name : "Thomas",
    email: "thomas.mendesm@gmail.com",
    password : "1234567"
})*/



/*
me.save().then(() => {
    console.log(me)
}).catch((error) => {
    console.log("Error !", error)
})*/
/*
const me2 = new User({
    name : "Thomas",
    email: "thomas.mendesmgmail.com"
})

me2.save().then(() => {
    console.log(me)
}).catch((error) => {
    console.log("Error !", error)
})*/

/*
const task1 = new Task({
    description: "Second task"
})

task1.save().then(() => {
    console.log(task1)
}).catch((error) => {
    console.log("Error !", error)
})*/