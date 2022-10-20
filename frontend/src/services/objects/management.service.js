const { default: BaseService } = require("../base.service")

class ManagementService extends BaseService {

    get = async () => {
        const result = await this.api.get('/management/get');
        return result;
    }
    change = async (status) => {
        const result = await this.api.post('/management/change', { status });
        return result;
    }

}

export default ManagementService;