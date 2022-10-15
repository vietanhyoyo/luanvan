const { default: BaseService } = require("../base.service")

class AccountService extends BaseService {

    getUserInfo = async () => {
        const result = await this.api.get('/admin/get-user-info');
        return result;
    }

}

export default AccountService;