import { Navigate } from 'react-router-dom';
import { getUserFromLocalStorage } from '../../services/user.service';

const PrivateRoute = ({ children }) => {

    const isUserAuthenticated = getUserFromLocalStorage();

    if (isUserAuthenticated) {
        return children;
    }

    return <Navigate to="/login" />;
}

export default PrivateRoute;