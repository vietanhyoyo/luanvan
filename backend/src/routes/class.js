const experss = require('express')
const route = experss.Router();
const authenMiddleware = require('../app/middlewares/authenMiddlewares')
const classController = require('../app/controllers/ClassController')

route.get('/get-homeroom-class-by-teacher', classController.getHomeroomClassByTeacher)
route.get('/get-class-object-of-student', classController.getClassObjectOfStudent);
route.get('/get-class-of-student', classController.getClassOfStudent);
route.get('/get-homeroom-teacher-by-class/:classID', authenMiddleware, classController.getHomeroomTeacherOfClass );
route.post('/get-class-by-id', authenMiddleware, classController.getClassById);
route.get('/now-class-list', authenMiddleware, classController.getClassListByNewYear);
route.post('/change-class', authenMiddleware, classController.changeClass);
route.post('/delete-class', authenMiddleware, classController.deleteClass);
route.post('/class-list-by-year', authenMiddleware, classController.getClassListByYear);
route.post('/add-new-class', authenMiddleware, classController.addClass);
route.post('/delete-school-year', authenMiddleware, classController.deleteSchoolYear);
route.post('/add-school-year', authenMiddleware, classController.addSchoolYear);
route.get('/school-year', authenMiddleware, classController.getSchoolYear);

module.exports = route