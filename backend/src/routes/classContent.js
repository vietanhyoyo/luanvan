const experss = require('express')
const route = experss.Router();
const authenMiddleware = require('../app/middlewares/authenMiddlewares')
const classContentController = require('../app/controllers/ClassContentController')

route.post('/delete-class-content', authenMiddleware, classContentController.deleteClassContent);
route.post('/update-class-content', authenMiddleware, classContentController.updateClassContent)
route.post('/get-by-id', authenMiddleware, classContentController.getById);
route.post('/get-by-class', authenMiddleware, classContentController.getClassContentList);
route.post('/add', classContentController.addClassContent);
route.get('/home', classContentController.home);

module.exports = route