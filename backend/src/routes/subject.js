const experss = require('express');
const route = experss.Router();

const authenMiddleware = require('../app/middlewares/authenMiddlewares')
const subjectController = require('../app/controllers/SubjectController')

route.get('/get-by-teacher', subjectController.getSubjectsByTeacher);
route.post('/get-grade-subject', authenMiddleware, subjectController.getSubjectGrade);
route.get('/get-all', authenMiddleware, subjectController.getSubjects);

module.exports = route