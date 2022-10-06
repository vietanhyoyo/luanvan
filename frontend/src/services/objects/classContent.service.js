const { default: BaseService } = require("../base.service")

class ClassContentService extends BaseService {

    add = async (content) => {
        const result = await this.api.post('/class-content/add', content);
        return result;
    }

    getALL = async (classID) => {
        const result = await this.api.post('/class-content/get-by-class', { classID });
        return result;
    }

    getClassContent = async (id) => {
        const result = await this.api.post('/class-content/get-by-id', { id });
        return result;
    }

    update = async (content) => {
        const result = await this.api.post('/class-content/update-class-content', { content });
        return result;
    }

    delete = async (id) => {
        const result = await this.api.post('/class-content/delete-class-content', { id });
        return result;
    }

}

export default ClassContentService;