const { default: BaseService } = require("../base.service")

class NewsService extends BaseService {

    addNews = async (text) => {
        const result = await this.api.post('/news/add', { text });
        return result;
    }

    getAll = async () => {
        const result = await this.api.get('/news/getAll');
        return result;
    }

    addComment = async (text, news) => {
        const result = await this.api.post('/news/add-comment', { text, news });
        return result;
    }

    addCommentQA = async (text, lesson) => {
        const result = await this.api.post('/news/add-comment-qa', { text, lesson });
        return result;
    }

    getComment = async (news) => {
        const result = await this.api.post('/news/get-comment-by-news', { news });
        return result;
    }

    addReComment = async (text, comment) => {
        const result = await this.api.post('/news/add-recomment', { text, comment });
        return result;
    }

    getReComment = async (comment) => {
        const result = await this.api.post('/news/get-recomment-by-comment', { comment });
        return result;
    }

    likeNews = async (newsID) => {
        const result = await this.api.post('/news/like-news', { newsID });
        return result;
    }

    likeComment = async (commentID) => {
        const result = await this.api.post('/news/like-comment', { commentID });
        return result;
    }

    likeReComment = async (reCommentID) => {
        const result = await this.api.post('/news/like-recomment', { reCommentID });
        return result;
    }

    getCommentsByLesson = async (lesson) => {
        const result = await this.api.post('/news/get-comments-by-lesson', { lesson });
        return result;
    }

}

export default NewsService;