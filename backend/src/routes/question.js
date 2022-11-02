const experss = require('express')
const route = experss.Router();
const authenMiddleware = require('../app/middlewares/authenMiddlewares')
const questionController = require('../app/controllers/QuestionController')

route.get('/get-question-test/:idLesson', authenMiddleware, questionController.getQuestionTest);
route.post('/add', authenMiddleware, questionController.add);
route.get('/delete/:idQuestion', authenMiddleware, questionController.delete);
route.get('/get-all/:idLesson', authenMiddleware, questionController.getAll);

module.exports = route