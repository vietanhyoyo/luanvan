const experss = require('express');
const route = experss.Router();

const authenMiddleware = require('../app/middlewares/authenMiddlewares')
const videoController = require('../app/controllers/VideoController')

// route.get('/:id', videoController.getVideo)
route.post('/upload', videoController.uploadVideo)

module.exports = route