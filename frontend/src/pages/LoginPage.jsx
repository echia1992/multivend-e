import React, {useEffect} from 'react';
import Login from '../components/Login/Login';
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
const LoginPage =()=> {
    const navigate = useNavigate();
    const { isAuthenticated,isAdmin } = useSelector((state) => state.user);
    useEffect(() => {
        if (isAuthenticated === true) {
            navigate('/')
        }else
        if (isAdmin === true){
            navigate('/admin-dashboard')
        }
    },[]);
        return (
            <div>
               <Login/>
            </div>
        );

}

export default LoginPage;