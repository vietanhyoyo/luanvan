
const Schedule = require('../models/Schedule');
const ScheduleLesson = require('../models/ScheduleLesson')
const SchoolYear = require('../models/SchoolYear');
const Class = require('../models/Class')

class ScheduleController {

    async getAllSchedule(req, res) {

        try {
            const schoolYear = await SchoolYear.findOne({}, {}, { sort: { createdAt: -1 } });

            const schedule = await Schedule.find({ schoolYear: schoolYear._id })

            res.send(schedule);

        } catch (error) {
            res.send(error)
        }

    }

    async getAllScheduleLesson(req, res) {
        if (!req.body) res.sendStatus(400);
        else {
            try {
                const idSchedule = req.body.id;

                const result = await ScheduleLesson.find({ schedule: idSchedule });

                res.send(result);

            } catch (error) {
                res.send(error)
            }
        }
    }

    async getScheduleLessonByWeekdayAndClass(req, res) {
        if (!req.body) res.sendStatus(400);
        else {
            try {
                const data = req.body;

                const result = await ScheduleLesson
                    .find({ schedule: data.id, class: data.class, weekday: data.weekday })
                    .populate({ path: 'subject', model: 'Subject' });

                res.send(result);

            } catch (error) {
                res.send(error)
            }
        }
    }

    async addSchedule(req, res) {
        if (!req.body) res.sendStatus(400);
        else {
            try {
                //Tao thoi khoa bieu
                const schoolYear = await SchoolYear.findOne({}, {}, { sort: { createdAt: -1 } })
                if (!schoolYear) res.sendStatus(422);

                const checkDate = new Date(req.body.startDate);
                let semester;

                if (checkDate.getMonth() + 1 > 6) semester = "1";
                else semester = "2";

                const data = {
                    ...req.body,
                    schoolYear: schoolYear._id,
                    semester
                }

                const newSchedule = await Schedule.create(data);

                //Tao cac mon hoc trong thoi khoa bieu
                const days = ['Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu'];
                const lessonNumbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
                const classes = await Class.find({ schoolYear: schoolYear._id }).sort({ name: 1 });

                for (let i = 0; i < days.length; i++) {
                    for (let j = 0; j < lessonNumbers.length; j++) {
                        for (let k = 0; k < classes.length; k++) {

                            const newScheduleLesson = {
                                weekday: days[i],
                                lessonNumber: lessonNumbers[j],
                                class: classes[k]._id,
                                schedule: newSchedule._id,
                            }

                            await ScheduleLesson.create(newScheduleLesson);
                        }
                    }
                }

                res.send(newSchedule);
            } catch (error) {
                res.send(error);
            }
        }
    }

    async deleteScheduleById(req, res) {
        if (!req.body) {
            res.sendStatus(400);
        } else {
            try {
                const idSchedule = req.body.id;

                await ScheduleLesson.deleteMany({ schedule: idSchedule });
                await Schedule.deleteOne({ _id: idSchedule });

                res.send({ status: 'Success', message: 'Xóa thời khóa biểu thành công!' });

            } catch (error) {
                res.send(error)
            }

        }
    }

    async updateScheduleLesson(req, res) {
        if (!req.body) {
            res.sendStatus(400);
        } else {
            try {
                const result = await ScheduleLesson.updateOne(
                    { _id: req.body.id },
                    { teacher: req.body.teacherID, subject: req.body.subjectID })
                    
                res.send(result);
            } catch (error) {
                res.send(error);
            }

        }
    }

}

module.exports = new ScheduleController;