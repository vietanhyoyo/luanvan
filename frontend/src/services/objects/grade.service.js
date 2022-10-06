const { default: BaseService } = require("../base.service")

class GradeService extends BaseService {

    getAll = async () => {
        const result = await this.api.get('/grade/get-all');
        return result;
    }

    setSubjects = async (id, subjects) => {
        const result = await this.api.post('/grade/set-subjects', { id, subjects });
        return result;
    }

}

export default GradeService;