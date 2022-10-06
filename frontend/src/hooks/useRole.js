import { StorageKeys } from 'store/constant';
import { verify } from 'jsonwebtoken';

const useRole = () => {
    const token = localStorage.getItem(StorageKeys.REFRESH_TOKEN);
    if (!token) return -1;
    const dataToken = verify(token, 'jwtrefresh');
    return dataToken.role;
}

export default useRole;