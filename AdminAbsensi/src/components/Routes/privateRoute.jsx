import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";


const validateRoute = async () => {
    try {
        const { status } = await axios.get("http://172.23.66.225/api/admin/verify", null, {
            withCredentials: true
        });
        return true;
    } catch (error) {
        console.error('Error validate cookie : ', error);
        return false;
    }
}

const PrivateRoute = () => {
    const [auth, setAuth] = useState(null);

    useEffect(() => {
        const validateRoute = async () => {
            try {
                await axios.get("http://localhost:3000/api/admin/verify", {
                    withCredentials: true
                });
                setAuth(true);
            } catch (error) {
                console.error('Error validate cookie : ', error);
                setAuth(false)
            }
        }

        validateRoute();
    }, []);

    if(auth === null) {
        return (
            <div>Loading...</div>
        )
    }
    return auth ? <Outlet /> : <Navigate to="/login" />

    // let auth = validateRoute();
    // return auth ? <Outlet/> : <Navigate to='/login' />
}

export default PrivateRoute;