const experss = require('express')
const route = experss.Router();
const authenMiddleware = require('../app/middlewares/authenMiddlewares')
const linkControler = require('../app/controllers/LinkController')

route.post('/change-link', authenMiddleware, linkControler.changeLink)
route.post('/delete-by-id', authenMiddleware, linkControler.deleteById);
route.get('/get-links-by-teacher', linkControler.getLinksByTeacher);
route.post('/add-link', authenMiddleware, linkControler.add);

module.exports = route