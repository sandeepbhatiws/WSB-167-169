"use client"
import React, { useState } from 'react'
import "./login-register.css"
import axios from 'axios';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function page() {

    const [registerLoading, setRegisterLoading] = useState(false);
    const [loginLoading, setLoginLoading] = useState(false);
    const router = useRouter();

    const register = (e) => {
        e.preventDefault();
        setRegisterLoading(true);

        axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/register`, e.target)
        .then((result) => {
            if(result.data._status == true){
                toast.success(result.data._message);
                setRegisterLoading(false);
                Cookies.set('user_login', result.data._token)
                router.push('/')
            } else {
                if(result.data._error.email){
                    toast.error(result.data._error.email);
                    setRegisterLoading(false);
                } else {
                    toast.error(result.data._message);
                    setRegisterLoading(false);
                }
            }
        })
        .catch(() => {
            toast.error('Something went wrong !!')
            setRegisterLoading(false);
        })
    }

    const login = (e) => {
        e.preventDefault();
        setLoginLoading(true);

        axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/login`, e.target)
        .then((result) => {
            if(result.data._status == true){
                toast.success(result.data._message);
                setLoginLoading(false);
                Cookies.set('user_login', result.data._token)
                router.push('/')
            } else {
                toast.error(result.data._message);
                setLoginLoading(false);
            }
        })
        .catch(() => {
            toast.error('Something went wrong !!')
            setLoginLoading(false);
        })
    }

  return (
    <div>
    
    <div className="breadcrumbs_area">
        <div className="container">   
            <div className="row">
                <div className="col-12">
                    <div className="breadcrumb_content">
                        <h3>My account</h3>
                        <ul>
                            <li><a href="index.html">home</a></li>
                            <li> {">"}</li>
                            <li>My account</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>         
    </div>

    <div className="customer_login">
        <div className="container">
            <div className="row">
               
                <div className="col-lg-6 col-md-6">
                    <div className="account_form">
                        <h2>login</h2>
                        <form onSubmit={ login }>
                            <p>   
                                <label>Email <span>*</span></label>
                                <input type="text" name='email'/>
                             </p>
                             <p>   
                                <label>Password <span>*</span></label>
                                <input type="password" name='password'/>
                             </p>   
                            <div className="login_submit">
                               <Link href="/forgot-password">Lost your password?</Link>
                                <label htmlFor="remember">
                                    <input id="remember" type="checkbox"/>
                                    Remember me
                                </label>
                                <button type="submit" disabled={
                                        loginLoading
                                        ?
                                        'disabled'
                                        :
                                        ''
                                    }>
                                    {
                                        loginLoading
                                        ?
                                        'Loading....'
                                        :
                                        'Login'
                                    }
                                </button>
                                
                            </div>

                        </form>
                     </div>    
                </div>
                
                <div className="col-lg-6 col-md-6">
                    <div className="account_form register">
                        <h2>Register</h2>
                        <form onSubmit={ register }>
                            <p>   
                                <label>Email address  <span>*</span></label>
                                <input type="text" name='email' required/>
                             </p>
                             <p>   
                                <label>Passwords <span>*</span></label>
                                <input type="password" name='password' required/>
                             </p>
                            <div className="login_submit">
                                <button type="submit" disabled={
                                        registerLoading
                                        ?
                                        'disabled'
                                        :
                                        ''
                                    }>
                                    {
                                        registerLoading
                                        ?
                                        'Loading....'
                                        :
                                        'Register'
                                    }
                                </button>
                            </div>
                        </form>
                    </div>    
                </div>
                
            </div>
        </div>    
    </div>
    
    </div>
  )
}
