const experss = require('express');
const route = experss.Router();

const authenMiddleware = require('../app/middlewares/authenMiddlewares')
const imageController = require('../app/controllers/ImageController')

// route.get('/:id', videoController.getVideo)
route.post('/upload', imageController.uploadImage)

module.exports = route