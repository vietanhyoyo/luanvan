const experss = require('express')
const route = experss.Router();
const authenMiddleware = require('../app/middlewares/authenMiddlewares')
const newsController = require('../app/controllers/NewsController')

route.post('/get-comments-by-lesson', authenMiddleware, newsController.getCommentsByLesson)
route.post('/like-recomment', authenMiddleware, newsController.likeReComment)
route.post('/add-comment-qa', newsController.addCommentQA)
route.post('/like-comment', authenMiddleware, newsController.likeComment)
route.post('/like-news', authenMiddleware, newsController.likeNews)
route.post('/get-recomment-by-comment', authenMiddleware, newsController.getReCommentByComment)
route.post('/add-recomment', newsController.addReComment)
route.post('/get-comment-by-news', authenMiddleware, newsController.getCommentByNews)
route.post('/add-comment', newsController.addComment)
route.get('/getAll', newsController.getAll)
route.post('/add', newsController.add)

module.exports = route