require('../src/db/mongoose')
const Task = require('../src/models/Task')

// Promise chaining 

/*
Task.findByIdAndRemove('5e872130a2be4b4309f03ddc').then((task) => {
    console.log(task)
    return Task.countDocuments({ completed:false })
}).then((result) => {
    console.log(result)
}).catch((e) => { console.log(e)})
*/

// Async/await

const removeTaskandCount = async (id) => {
    const task = await Task.findByIdAndRemove(id)
    const count = await Task.countDocuments({ completed:false })
    return count
}

removeTaskandCount('5e872146828852432f021de9').then((count) => {
    console.log(count)
}).catch((e) => console.log(e))