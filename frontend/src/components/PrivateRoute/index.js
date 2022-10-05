import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {

    const isLogin = () => {

        if (sessionStorage.getItem('ACCESS_TOKEN') !== null) {
            return true;
        }
        else {
            if (localStorage.getItem('REFRESH_TOKEN') === null)
                return false;
            else {
                return true;
            }
        }

    }

    const isLoggedIn = isLogin();
    const location = useLocation();

    if (!isLoggedIn) {
        return <Navigate to={'/'} state={{ from: location }} />
    }

    return children;
}

export default PrivateRoute