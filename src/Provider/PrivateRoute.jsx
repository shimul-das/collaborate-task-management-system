
import { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { useUser } from "./UserContext";


const PrivateRoute = ({ children }) => {
    const { user, handleLogout } = useUser();
    const location = useLocation();
    
    if (user) {
        return children;
    }
    return <Navigate to="/login" state={{from: location}} replace></Navigate>
};

export default PrivateRoute;