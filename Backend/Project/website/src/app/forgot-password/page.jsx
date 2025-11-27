"use client"
import React, { useState } from 'react'
import "./login-register.css"
import axios from 'axios';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export default function page() {

    const [forgotPasswordLoading, setForgotPasswordLoading] = useState(false);
    const router = useRouter();

    const forgotPassword = (e) => {
        e.preventDefault();
        setForgotPasswordLoading(true);

        axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/forgot-password`, e.target)
        .then((result) => {
            if(result.data._status == true){
                toast.success(result.data._message);
                setForgotPasswordLoading(false);
                e.target.reset();
            } else {
                toast.error(result.data._message);
                setForgotPasswordLoading(false);
            }
        })
        .catch(() => {
            toast.error('Something went wrong !!')
            setForgotPasswordLoading(false);
        })
    }

  return (
    <div>
    
    <div className="breadcrumbs_area">
        <div className="container">   
            <div className="row">
                <div className="col-12">
                    <div className="breadcrumb_content">
                        <h3>Forgot Password</h3>
                        <ul>
                            <li><a href="index.html">home</a></li>
                            <li> {">"}</li>
                            <li>Forgot Password</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>         
    </div>

    <div className="customer_login">
        <div className="container">
            <div className="row">
                <div className="col-lg-3 col-md-3"></div>

                <div className="col-lg-6 col-md-6">
                    <div className="account_form">
                        <h2>Forgot Password</h2>
                        <form onSubmit={ forgotPassword }>
                            <p>   
                                <label>Email <span>*</span></label>
                                <input type="text" name='email'/>
                             </p>
                                
                            <div className="login_submit"> 
                                <button type="submit" disabled={
                                        forgotPasswordLoading
                                        ?
                                        'disabled'
                                        :
                                        ''
                                    }>
                                    {
                                        forgotPasswordLoading
                                        ?
                                        'Loading....'
                                        :
                                        'Forgot Password'
                                    }
                                </button>
                            </div>

                        </form>
                     </div>    
                </div>
                
                <div className="col-lg-3 col-md-3"></div>
            </div>
        </div>    
    </div>
    
    </div>
  )
}
