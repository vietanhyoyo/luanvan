const experss = require('express');
const route = experss.Router();

const authenMiddleware = require('../app/middlewares/authenMiddlewares')
const teacherController = require('../app/controllers/TeacherController')

route.get('/get-classes-in-charge-by-teacher', teacherController.getClassesBySubjectTeacher);
route.get('/get-teacher-information', teacherController.getTeacherInformation);
route.post('/get-teacher-by-subject', authenMiddleware, teacherController.getTeacherBySubject);
route.post('/update-teacher', authenMiddleware, teacherController.updateTeacher);
route.post('/get-teacher-by-id', authenMiddleware, teacherController.getTeacherById);
route.post('/delete-teacher', authenMiddleware, teacherController.deleteTeacher);
route.get('/get-teachers', authenMiddleware, teacherController.getAllTeacher);
route.post('/add-teacher', authenMiddleware, teacherController.addTeacher);

module.exports = route