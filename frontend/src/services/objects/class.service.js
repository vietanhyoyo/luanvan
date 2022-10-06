const { default: BaseService } = require("../base.service")

class ClassService extends BaseService {

    getAllSchoolYear = async () => {
        const result = await this.api.get('/class/school-year');
        return result;
    }

    addSchoolYear = async (text) => {
        const result = await this.api.post('/class/add-school-year', { name: text });
        return result;
    }

    deleteSchoolYear = async (id) => {
        const result = await this.api.post('/class/delete-school-year', { id });
        return result;
    }

    addClass = async (obj) => {
        const result = await this.api.post('/class/add-new-class', obj);
        return result;
    }

    getClassListByYear = async (year) => {
        const result = await this.api.post('/class/class-list-by-year', { schoolYear: year });
        return result;
    }

    deleteClass = async (id) => {
        const result = await this.api.post('/class/delete-class', { id });
        return result;
    }

    editClass = async (obj) => {
        const result = await this.api.post('/class/change-class', obj);
        return result;
    }

    getNowClasses = async () => {
        const result = await this.api.get('/class/now-class-list');
        return result;
    }

    getClassById = async (id) => {
        const result = await this.api.post('/class/get-class-by-id', { id });
        return result;
    }

    getHomeroomTeacherByClass = async (id) => {
        const result = await this.api.get(`/class/get-homeroom-teacher-by-class/${id}`);
        return result;
    }

    getClassOfStudent = async () => {
        const result = await this.api.get(`/class/get-class-of-student`);
        return result;
    }

    getClassObjectOfStudent = async () => {
        const result = await this.api.get(`/class/get-class-object-of-student`);
        return result;
    }

    getHomeroomClassByTeacher = async () => {
        const result = await this.api.get(`/class/get-homeroom-class-by-teacher`);
        return result;
    }
}

export default ClassService;