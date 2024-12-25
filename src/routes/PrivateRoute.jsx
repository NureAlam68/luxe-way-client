import { Navigate, useLocation } from "react-router-dom";
import Loading from "../components/Loading";
import useAuth from "../hookes/useAuth";



// eslint-disable-next-line react/prop-types
const PrivetRoute = ({children}) => {
    const {user, loading} = useAuth()

    const location = useLocation()
    

    if(user) {
        return children
    }

    if(loading) {
        return <Loading></Loading>
    }

    return (
        <Navigate state={location.pathname} to="/login"></Navigate>
    );
};


export default PrivetRoute;