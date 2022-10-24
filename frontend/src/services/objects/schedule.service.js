const { default: BaseService } = require("../base.service")

class ScheduleService extends BaseService {

    getAllScheduleLesson = async (id) => {
        const result = await this.api.post('/schedule/get-all-schedule-lesson', { id });
        return result;
    }

    getAll = async () => {
        const result = await this.api.get('/schedule/get-all-schedule');
        return result;
    }

    addSchedule = async (data) => {
        const result = await this.api.post('/schedule/add-schedule', data);
        return result;
    }

    delete = async (id) => {
        const result = await this.api.post('/schedule/delete-schedule', { id });
        return result;
    }

    getScheduleLessonByWeekdayAndClass = async (id, idClass, weekday) => {
        const result = await this.api.post(
            '/schedule/get-schedule-lesson-weekday-class',
            { id, class: idClass, weekday }
        );
        return result;
    }

    updateScheduleLesson = async (id, teacherID, subjectID) => {
        const result = await this.api.post(
            '/schedule/update-schedule-lesson',
            { id, teacherID, subjectID }
        );
        return result;
    }

    getScheduleOfUser = async () => {
        const result = await this.api.get('/schedule/get-schedule-of-user');
        return result;
    }

    getScheduleLessonByNumber = async (id, idClass, weekday, lessonNumber) => {
        const result = await this.api.post(
            '/schedule/get-schedule-lesson-by-number',
            { id, class: idClass, weekday, lessonNumber }
        );
        return result;
    }

    getScheduleLessonByTeacher = async (id, teacherID, weekday, lessonNumber) => {
        const result = await this.api.post(
            '/schedule/get-schedule-lesson-by-teacher',
            { id, teacherID, weekday, lessonNumber }
        );
        return result;
    }

    getScheduleLessonByClass = async (classID, lessonNumber) => {
        const result = await this.api.post(
            '/schedule/get-schedule-lesson-by-class',
            { classID, lessonNumber }
        );
        return result;
    }
}

export default ScheduleService;