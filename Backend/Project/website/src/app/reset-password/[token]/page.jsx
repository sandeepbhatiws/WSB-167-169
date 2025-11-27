"use client"
import React, { useState } from 'react'
import "./login-register.css"
import axios from 'axios';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { useParams, useRouter } from 'next/navigation';

export default function page() {

    const [resetPasswordLoading, setResetPasswordLoading] = useState(false);
    const router = useRouter();

    const params = useParams();

    const resetPassword = (e) => {
        e.preventDefault();
        setResetPasswordLoading(true);

        axios.put(`${process.env.NEXT_PUBLIC_API_URL}/user/reset-password`, e.target)
        .then((result) => {
            if(result.data._status == true){
                toast.success(result.data._message);
                setResetPasswordLoading(false);
                e.target.reset();
            } else {
                toast.error(result.data._message);
                setResetPasswordLoading(false);
            }
        })
        .catch(() => {
            toast.error('Something went wrong !!')
            setResetPasswordLoading(false);
        })
    }

  return (
    <div>
    
    <div className="breadcrumbs_area">
        <div className="container">   
            <div className="row">
                <div className="col-12">
                    <div className="breadcrumb_content">
                        <h3>Reset Password</h3>
                        <ul>
                            <li><a href="index.html">home</a></li>
                            <li> {">"}</li>
                            <li>Reset Password</li>
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
                        <h2>Reset Password</h2>
                        <form onSubmit={ resetPassword }>

                            <input type="hidden" name='token' value={params.token}/>


                            <p>   
                                <label>New Password <span>*</span></label>
                                <input type="password" name='new_password'/>
                             </p>

                             <p>   
                                <label>Confirm Password <span>*</span></label>
                                <input type="password" name='confirm_password'/>
                             </p>
                                
                            <div className="login_submit"> 
                                <button type="submit" disabled={
                                        resetPasswordLoading
                                        ?
                                        'disabled'
                                        :
                                        ''
                                    }>
                                    {
                                        resetPasswordLoading
                                        ?
                                        'Loading....'
                                        :
                                        'Reset Password'
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
