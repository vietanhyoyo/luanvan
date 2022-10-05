const experss = require('express')
const route = experss.Router();
const authenMiddleware = require('../app/middlewares/authenMiddlewares')
const siteController = require('../app/controllers/SiteController')

route.get('/get-test-request/:id/:name', siteController.getTestRequest)
route.post('/create-week-semester-one', siteController.createSemesterOneWeek)
route.post('/create-week-semester-two', siteController.createSemesterTwoWeek)
route.get('/get-subjects', siteController.getSubjects)
route.post('/create-subject', siteController.createSubject)
route.post('/create-class', siteController.createClass)
route.post('/create-school-year', siteController.createSchoolYear)
route.post('/create-grade', siteController.createGrade)
route.post('/create-student', siteController.createStudent)
route.post('/create-account', siteController.createAccount)
route.get('/home', authenMiddleware, siteController.showHome)
route.get('/', siteController.index)

module.exports = route