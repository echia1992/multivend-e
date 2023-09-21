import React, {useEffect} from 'react';
import SignUp from '../components/Signup/SignUp';
import {useNavigation} from "react-router-dom";
const SignUpPage = () => {
    // const navigate = useNavigation();
    //
    // useEffect(() => {
    //     navigate('/') ;
   // });

        return (
            <div>
            <SignUp/>
            </div>
        );

}

export default SignUpPage;