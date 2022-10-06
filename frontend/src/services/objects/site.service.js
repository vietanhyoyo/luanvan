const { default: BaseService } = require("../base.service")

class SiteService extends BaseService {

    getReQuest = async () => {
        const result = await this.api.get('/get-test-request/89/100');
        return result;
    }

}

export default SiteService;