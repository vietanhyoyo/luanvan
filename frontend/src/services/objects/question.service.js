const { default: BaseService } = require("../base.service")

class QuestionService extends BaseService {

    add = async (data) => {
        const result = await this.api.post('/question/add', data);
        return result;
    }

    getAll = async (idLesson) => {
        const result = await this.api.get(`/question/get-all/${idLesson}`);
        return result;
    }

    delete = async (idQuesion) => {
        const result = await this.api.get(`/question/delete/${idQuesion}`);
        return result;
    }

    getQuestionTest = async (idLesson) => {
        const result = await this.api.get(`/question/get-question-test/${idLesson}`);
        return result;
    }

}

export default QuestionService;