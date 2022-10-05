const experss = require('express')
const route = experss.Router();
const authenMiddleware = require('../app/middlewares/authenMiddlewares')
const adminController = require('../app/controllers/AdminController');

route.post('/delete-admin', authenMiddleware, adminController.deleteAccount);
route.post('/edit-account', authenMiddleware, adminController.editAccount);
route.post('/add-admin', authenMiddleware, adminController.addAdmin);
route.get('/admin-account', authenMiddleware, adminController.getAdminAccount);

module.exports = route