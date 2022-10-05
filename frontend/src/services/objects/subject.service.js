const { default: BaseService } = require("../base.service")

class SubjectService extends BaseService {

    getAll = async () => {
        const result = await this.api.get('/subject/get-all');
        return result;
    }

    getGrade = async (grade) => {
        const result = await this.api.post('/subject/get-grade-subject', { grade });
        return result;
    }

    getSubjectsByTeacher = async () => {
        const result = await this.api.get('/subject/get-by-teacher');
        return result;
    }

}

export default SubjectService;