require('../src/db/mongoose')
const User = require('../src/models/User')


//Promise chaining
/*
User.findByIdAndUpdate('5e8721bddb2f8a43afef12c3', {age : 1}).then((user) => {
    console.log(user)
    return User.countDocuments({ age:1 })
}).then((result) => {
    console.log(result)
}).catch((e) => { console.log(e)})*/

//Asyn/await


const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, {age})
    const count = await User.countDocuments({age})
    return count
}

updateAgeAndCount('5e8721bddb2f8a43afef12c3', 2).then((count) => {
    console.log(count)
}).catch((e) => {console.log(e)})


