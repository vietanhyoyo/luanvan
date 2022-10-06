const experss = require('express')
const route = experss.Router();
const authenMiddleware = require('../app/middlewares/authenMiddlewares')
const gradeController = require('../app/controllers/GradeController')

route.post('/set-subjects', authenMiddleware, gradeController.setSubjectGrade);
route.get('/get-all', authenMiddleware, gradeController.getAll);

module.exports = route