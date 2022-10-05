import axios from "axios"
import { ApiPath, StorageKeys } from "store/constant";


const HEADERS = {
    "Cache-Control": "no-cache",
    "Content-Type": "application/json",
}

class APIProcessor {

    post = async (path, data) => {

        const token = sessionStorage.getItem(StorageKeys.ACCESS_TOKEN);

        try {
            const result = await axios({
                method: 'post',
                url: process.env.REACT_APP_BASE_URL + path,
                data,
                headers: {
                    ...HEADERS,
                    "Authorization": "Beaer " + token
                }
            })
            return result;
        }
        catch (err) {
            if (err.response.status === 403) {

                const tokenResult = await this.getRefreshToken();

                if (tokenResult.data.status === "Success") {
                    this.setTokenItem(tokenResult.data.accessToken, tokenResult.data.refreshToken);
                    return this.post(path, data);
                }
                else return tokenResult;
            }
            return err;
        }
    }

    get = () => {
        return 20;
    }

    get = async (path) => {

        const token = sessionStorage.getItem(StorageKeys.ACCESS_TOKEN);

        try {
            const result = await axios({
                method: 'get',
                url: process.env.REACT_APP_BASE_URL + path,
                headers: {
                    ...HEADERS,
                    "Authorization": "Beaer " + token
                }
            })
            return result;
        }
        catch (err) {
            if (err.response.status === 403) {

                const tokenResult = await this.getRefreshToken();

                if (tokenResult.data.status === "Success") {
                    this.setTokenItem(tokenResult.data.accessToken, tokenResult.data.refreshToken);
                    return this.get(path);
                }
                else return tokenResult;
            }
            return err;
        }
    }

    getRefreshToken = async () => {
        try {
            const refreshToken = localStorage.getItem(StorageKeys.REFRESH_TOKEN);

            const result = await axios({
                method: 'post',
                url: process.env.REACT_APP_BASE_URL + ApiPath.REFRESH_TOKEN,
                data: {
                    token: refreshToken
                },
                headers: HEADERS
            })
            return result;
        } catch (err) {
            return err;
        }
    }

    setTokenItem = (accessToken, refreshToken) => {
        sessionStorage.setItem(StorageKeys.ACCESS_TOKEN, accessToken);
        localStorage.setItem(StorageKeys.REFRESH_TOKEN, refreshToken);
    }

}

export default APIProcessor;