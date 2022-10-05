const { default: BaseService } = require("../base.service")

class TeacherService extends BaseService {

    add = async (obj) => {
        const result = await this.api.post('/teacher/add-teacher', obj);
        return result;
    }

    getAll = async () => {
        const result = await this.api.get('/teacher/get-teachers');
        return result;
    }

    delete = async (accountID, teacherID) => {
        const result = await this.api.post('/teacher/delete-teacher', {
            idAccount: accountID,
            idTeacher: teacherID
        });
        return result;
    }

    getOneTeacher = async (id) => {
        const result = await this.api.post('/teacher/get-teacher-by-id', { id });
        return result;
    }

    update = async (account, teacher) => {
        const result = await this.api.post('/teacher/update-teacher', { account, teacher });
        return result;
    }

    getTeacherBySubject = async (id, classID) => {
        const result = await this.api.post('/teacher/get-teacher-by-subject', { id, classID });
        return result;
    }

    getInformation = async () => {
        const result = await this.api.get('/teacher/get-teacher-information');
        return result;
    }

    getClassInCharge = async () => {
        const result = await this.api.get('/teacher/get-classes-in-charge-by-teacher');
        return result;
    }
    
}

export default TeacherService;