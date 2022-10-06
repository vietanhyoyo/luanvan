const { default: BaseService } = require("../../base.service")

class HomeStudentService extends BaseService{
    getData = async () => {
        const result = await this.api.get('/home');
        return result;
    }
}

export default HomeStudentService;