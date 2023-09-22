import React,  {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai";
import {RxAvatar} from "react-icons/rx";
import styles from "../../styles/styles";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState();
    const [password, setPassword] = useState('');
    const [visible, setVisible] = useState('');
    const navigate = useNavigate();

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        setAvatar(file);
    };

    const handleSubmit = (e) =>{
        e.preventDefault();

        const config = { headers: { "Content-Type": "multipart/form-data" } };

        const newForm = new FormData();

        newForm.append('profile', avatar);
        newForm.append('name',name);
        newForm.append('email',email);
        newForm.append('password', password);

        axios.put(`${server}/customer/create-user` , newForm , config).then((res)=>{
            toast.success(res.data.message);
            setEmail('');
            setName('');
            setPassword('');
            setAvatar(null);
        }).catch((error)=>{
            toast.error(error.response.data.message)
        });
        navigate('/login');
    };
    return (
            <div className='min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="sm:mx-auto sm:w-full sm:max-w-md pl-[140px] cursor-pointer">
                        <Link to='/'>
                            <img src='/handc-logo.png' alt=''/>
                        </Link>
                    </div>
                    <h1 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
                            Register as new Customer
                    </h1>
                </div>
                <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <form className='space-y-6' onSubmit={handleSubmit}>
                            <div>
                                <label
                                htmlFor='name'
                                className='block text-sm font-medium text-gray-700'
                                >
                                    Full Name<span className='text-red-500 cursor-pointer'>*</span>
                                </label>
                                <div className='mt-1'>
                                    <input
                                    type='text'
                                    name='name'
                                    placeholder='Enter your name her'
                                    autoComplete='name'
                                    autoSave={name}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-blue-500'
                                    />
                                </div>
                                <br/>
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
                                        placeholder='exmaple@gmail.com'
                                        autoComplete={email}
                                        autoSave={email}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-blue-500'
                                    />
                                </div>
                                <br/>
                                <label
                                    htmlFor='password'
                                    className='block text-sm font-medium text-gray-700'
                                >
                                    Password<span className='text-red-500 cursor-pointer'>*</span>
                                </label>
                                <div className='mt-1 relative'>
                                    <input
                                        type={visible ? "text" : "password"}
                                        name='password'
                                        placeholder='enter your password'
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
                                <label
                                    htmlFor='avatar'
                                    className='block text-sm font-medium text-gray-700'
                                >
                                </label>

                                <div className='mt-2 flex items-center'>
                                    <span className='inline-block h-8 w-8 overflow-hidden rounded-full'>
                                        {
                                            avatar ? (
                                                    <img src={URL.createObjectURL(avatar)} alt="avatar"
                                                    className='h-full w-full object-cover'
                                                    />

                                            ) : (
                                                <RxAvatar className='h-8 w-8'/>
                                            )
                                        }
                                    </span>
                                    <label
                                    htmlFor='file-input'
                                    className='ml-5 flex items-center justify-center px-4 py-2 border-gray-300 rounded-md shadow-sm font-medium text-gray-700 bg-white hover:bg-teal-400'
                                    >
                                   <span>Upload a Profile</span>
                                    <input
                                        type='file'
                                        name='avatar'
                                        id='file-input'
                                        accept='.jpg,.jpeg,.png'
                                        onChange={handleFileInputChange}
                                        className='sr-only'
                                    />
                                    </label>
                                </div>
                            </div>
                            <div>
                                <button
                                type='submit'
                                className='group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-blue-700'
                                >
                                    Submit
                                </button>
                            </div>
                            <div className={`${styles.normalFlex} w-full`}>
                                <br/>
                                <h4>Already have an account?</h4>
                                <Link to='/login' className='text-blue-500 pl-2'>
                                    Sign In
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        );

}

export default SignUp;