const experss = require('express')
const route = experss.Router();

const authorController = require('../app/controllers/AuthorController')

route.post('/login', authorController.login);
route.post('/refresh-token', authorController.checkRefreshToken);

module.exports = route