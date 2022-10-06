const experss = require('express');
const route = experss.Router();

const authenMiddleware = require('../app/middlewares/authenMiddlewares')
const studentController = require('../app/controllers/StudentController')

route.get('/get-information', studentController.getInformation);
route.post('/update-student', authenMiddleware, studentController.updateStudent);
route.post('/get-student-by-id', authenMiddleware, studentController.getStudentById);
route.post('/delete-student', authenMiddleware, studentController.deleteStudent);
route.post('/get-class-student', authenMiddleware, studentController.getStudentInClass);
route.post('/add-student', authenMiddleware, studentController.addStudent);

module.exports = route