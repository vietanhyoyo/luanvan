const { default: BaseService } = require("../base.service")

class AdminService extends BaseService {

    addAdmin = async (obj) => {
        const result = await this.api.post('/admin/add-admin', obj);
        return result;
    }

    getAdminAccount = async () => {
        const result = await this.api.get('/admin/admin-account');
        return result;
    }

    editAccount = async (obj) => {
        const result = await this.api.post('/admin/edit-account', obj);
        return result;
    }

    deleteAccount = async (id) => {
        const result = await this.api.post('/admin/delete-admin', { id });
        return result;
    }

}

export default AdminService;