const { default: BaseService } = require("../base.service")

class VideoService extends BaseService {

    upload = async (formData, config) => {
        const result = await this.api.post(`/video/upload`, formData, config);
        return result;
    }

}

export default VideoService;