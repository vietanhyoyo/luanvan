const { default: BaseService } = require("../base.service")

class NewsService extends BaseService {

    addNews = async (text) => {
        const result = await this.api.post('/news/add', { text });
        return result;
    }

}

export default NewsService;