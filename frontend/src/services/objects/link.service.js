const { default: BaseService } = require("../base.service")

class LinkService extends BaseService {

    addLink = async (link) => {
        const result = await this.api.post('/link/add-link', { link });
        return result;
    }

    getLinksByTeacher = async () => {
        const result = await this.api.get('/link/get-links-by-teacher');
        return result;
    }

    delete = async (id) => {
        const result = await this.api.post('/link/delete-by-id', { id });
        return result;
    }

    changeLink = async (id, teacher) => {
        const result = await this.api.post('/link/change-link', { id, teacher });
        return result;
    }

}

export default LinkService;