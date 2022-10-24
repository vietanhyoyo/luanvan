const experss = require('express')
const route = experss.Router();
const authenMiddleware = require('../app/middlewares/authenMiddlewares')
const scheduleController = require('../app/controllers/scheduleController')

route.post('/get-schedule-lesson-by-class', authenMiddleware, scheduleController.getScheduleLessonByClass)
route.post('/get-schedule-lesson-by-teacher', authenMiddleware, scheduleController.getScheduleLessonByTeacher)
route.post('/get-schedule-lesson-by-number', authenMiddleware, scheduleController.getScheduleLessonByLessonNumber);
route.get('/get-schedule-of-user', authenMiddleware, scheduleController.getScheduleOfUser)
route.get('/get-all-schedule', authenMiddleware, scheduleController.getAllSchedule);
route.post('/update-schedule-lesson', authenMiddleware, scheduleController.updateScheduleLesson);
route.post('/get-schedule-lesson-weekday-class', authenMiddleware, scheduleController.getScheduleLessonByWeekdayAndClass);
route.post('/get-all-schedule-lesson', authenMiddleware, scheduleController.getAllScheduleLesson);
route.post('/delete-schedule', authenMiddleware, scheduleController.deleteScheduleById);
route.post('/add-schedule', authenMiddleware, scheduleController.addSchedule);

module.exports = route