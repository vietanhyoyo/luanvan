const siteRouter = require("./site")
const authorRouter = require("./author")
const classRouter = require("./class")
const adminRouter = require("./admin")
const teacherRouter = require("./teacher")
const studentRouter = require("./student")
const subjectRouter = require("./subject")
const gradeRouter = require("./grade")
const scheduleRouter = require("./schedule")
const lessonRouter = require("./lesson")
const classContentRouter = require("./classContent")
const linkRouter = require("./link")
const videoRouter = require("./video")
const newsRouter = require("./news")
const imageRouter = require("./image")
const managementRouter = require("./management")
const questionRouter = require("./question")

function route(app) {

    app.use('/management', managementRouter);
    app.use('/news', newsRouter);
    app.use('/video', videoRouter);
    app.use('/link', linkRouter);
    app.use('/lesson', lessonRouter);
    app.use('/schedule', scheduleRouter);
    app.use('/admin', adminRouter);
    app.use('/class', classRouter);
    app.use('/class-content', classContentRouter);
    app.use('/author', authorRouter);
    app.use('/teacher', teacherRouter);
    app.use('/student', studentRouter);
    app.use('/subject', subjectRouter);
    app.use('/image', imageRouter);
    app.use('/grade', gradeRouter);
    app.use('/question', questionRouter);
    app.use('/', siteRouter);

}

module.exports = route;