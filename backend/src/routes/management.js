const experss = require('express');
const route = experss.Router();

const authenMiddleware = require('../app/middlewares/authenMiddlewares')
const managementController = require('../app/controllers/ManagementController')

route.get('/add', managementController.add)
route.get('/get', authenMiddleware, managementController.get)
route.post('/change', authenMiddleware, managementController.change)

module.exports = route