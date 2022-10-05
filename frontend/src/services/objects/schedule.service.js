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
}

export default ScheduleService;