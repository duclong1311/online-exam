import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const PrivateRoute = ({ children, requiredRole }) => {
    const { account, isAuthenticated } = useSelector(state => state.user);

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (requiredRole && account.role !== requiredRole) {
        toast.error(`You are ${account.role} and can't access this page!`);
        return <Navigate to="/" />;
    }

    return children;
}

export default PrivateRoute;
