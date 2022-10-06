const { default: BaseService } = require("../base.service")

class LessonService extends BaseService {

    getAll = async (semester) => {
        const result = await this.api.post('/lesson/get-all', { semester });
        return result;
    }

    add = async (lesson) => {
        const result = await this.api.post('/lesson/add-lesson', lesson);
        return result;
    }

    getSubjectInWeek = async (grade, week) => {
        const result = await this.api.post('/lesson/get-subject-lesson', { grade, week });
        return result;
    }

    getLessonsBySubjectWeekGrade = async (grade, week, subject) => {
        const result = await this.api.post('/lesson/get-lessons-by-subject-week-grade', { grade, week, subject });
        return result;
    }

    addLessonContent = async (text, lessonID, videoPath) => {
        const result = await this.api.post('/lesson/add-lesson-content', { text, lessonID, videoPath });
        return result;
    }

    getLessonContent = async (lessonID) => {
        const result = await this.api.post('/lesson/get-lesson-content-by-lesson', { lessonID });
        return result;
    }

    updateLesson = async (lesson) => {
        const result = await this.api.post('/lesson/update-lesson', { lesson });
        return result;
    }

    deleteLessonById = async (id) => {
        const result = await this.api.post('/lesson/delete-by-id', { id });
        return result
    }
}

export default LessonService;