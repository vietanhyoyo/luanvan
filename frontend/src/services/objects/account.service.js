const { default: BaseService } = require("../base.service")

class AccountService extends BaseService {

    getUserInfo = async () => {
        const result = await this.api.get('/admin/get-user-info');
        return result;
    }

    editAccount = async (obj) => {
        const result = await this.api.post('/admin/edit-account', obj);
        return result;
    }

    changePassword = async (oldPass, newPass) => {
        const result = await this.api.post('/admin/change-password', { oldPass, newPass });
        return result;
    }

}

export default AccountService;