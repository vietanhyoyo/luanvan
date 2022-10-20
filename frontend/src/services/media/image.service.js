const { default: BaseService } = require("../base.service")

class ImageService extends BaseService {

    upload = async (formData, config) => {
        const result = await this.api.post(`/image/upload`, formData, config);
        return result;
    }

}

export default ImageService;