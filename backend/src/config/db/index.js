const mongoose = require('mongoose')
/**User name: tennv
 * Passwork: tennv123456
 * Kết nối tới compass: mongodb+srv://tennv:tennv123456@cluster0.vglkl.mongodb.net/test
 */
async function connect(){

    try {
        await mongoose.connect('mongodb://localhost:27017/edu_database');
        // await mongoose.connect('mongodb+srv://tennv:tennv123456@cluster0.vglkl.mongodb.net/csdl_taphoa?retryWrites=true&w=majority');
        console.log('Connect successfully')
    } catch (error) {
        console.log('Connect failure!!!')
    }
}

module.exports = { connect }