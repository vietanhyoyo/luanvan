const experss = require('express')
const route = experss.Router();
const authenMiddleware = require('../app/middlewares/authenMiddlewares')
const newsController = require('../app/controllers/NewsController')

route.post('/add', newsController.add)

module.exports = route