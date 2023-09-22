import React, {Component, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai";
import axios from "axios";
import {toast} from "react-toastify";
import {server} from "../../server";
import styles from "../../styles/styles";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [visible, setVisible] = useState('')


    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(`${server}/user/login-user`,{email, password},{withCredentials:true}).then((res)=>{
            toast.success(res.data.message);
            navigate('/');
        }).catch((error)=>{
            toast.error(error.response.data.message)
            console.log(error)
        })

    }


    return (
        <div className='min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="sm:mx-auto sm:w-full sm:max-w-md pl-[140px] cursor-pointer">
                    <Link to='/'>
                        <img src='/handc-logo.png' alt=''/>
                    </Link>
                </div>
                <h1 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
                    Login
                </h1>
            </div>
            <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className='space-y-6' onSubmit={handleSubmit}>
                        <div>

                            <label
                                htmlFor='email'
                                className='block text-sm font-medium text-gray-700'
                            >
                                Email Address<span className='text-red-500 cursor-pointer'>*</span>
                            </label>
                            <div className='mt-1'>
                                <input
                                    type='email'
                                    name='email'
                                    autoComplete={email}
                                    autoSave={email}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-blue-500'
                                />
                            </div>
                            <br/>
                            <label
                                htmlFor='name'
                                className='block text-sm font-medium text-gray-700'
                            >
                                Password<span className='text-red-500 cursor-pointer'>*</span>
                            </label>
                            <div className='mt-1 relative'>
                                <input
                                    type={visible ? "text" : "password"}
                                    name='password'
                                    autoComplete="current-password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-blue-500'
                                />
                                {
                                    visible ? (
                                        <AiOutlineEye
                                            size={25}
                                            className='absolute right-2 top-2 cursor-pointer'
                                            onClick={()=>setVisible(false)}
                                        />
                                    ) : (
                                        <AiOutlineEyeInvisible
                                            className='absolute right-2 top-2 cursor-pointer'
                                            size={25}
                                            onClick={()=>setVisible(true)}
                                        />
                                    )
                                }

                            </div>
                            <br/>
                            <div>
                                <button
                                    type='submit'
                                    className='group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-blue-700'
                                >
                                    Submit
                                </button>
                            </div>
                            <br/>
                            <div className={`${styles.normalFlex} w-full`}>
                                <h4>Don't have an account?</h4>
                                <Link to='/sign-up' className='text-blue-500 pl-2'>
                                    Sign Up
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );

}

export default Login;