const { default: BaseService } = require("../base.service")

class StudentService extends BaseService {

    add = async (obj) => {
        const result = await this.api.post('/student/add-student', obj);
        return result;
    }

    getAll = async (id) => {
        const result = await this.api.post('/student/get-class-student', { class: id });
        return result;
    }

    deleteOne = async (idAccount, idStudent) => {
        const result = await this.api.post('/student/delete-student', { idAccount, idStudent });
        return result;
    }

    getOneStudentByID = async (id) => {
        const result = await this.api.post('/student/get-student-by-id', { id });
        return result;
    }

    update = async (account, student) => {
        const result = await this.api.post('/student/update-student', { account, student });
        return result;
    }

    getStudentInformation = async () => {
        const result = await this.api.get('/student/get-information');
        return result;
    }

}

export default StudentService;