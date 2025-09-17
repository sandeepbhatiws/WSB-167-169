import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from 'react-toastify';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default function Register() {
    const [isLoading, setIsLoading] = useState(false);
    const [isGoogleLogin, setIsGoogleLogin] = useState(false);

    const firebaseUser = localStorage.getItem('firebase_user');
    var navigate = useNavigate();  // Executable function
    const provider = new GoogleAuthProvider();

    useEffect(() => {
        if (firebaseUser) {
            navigate('/');
        }

    }, []);

    const register = (e) => {
        setIsLoading(!isLoading);
        e.preventDefault();

        const auth = getAuth();
        createUserWithEmailAndPassword(auth, e.target.email.value, e.target.password.value)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;

            console.log(user.uid);

            localStorage.setItem('firebase_user', user.uid)
            // ...
            setIsLoading(false);
            toast.success('Account register succussfully !')
            navigate('/');

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
            setIsLoading(false);
            toast.error(errorMessage);
        });
    }

    const googleLogin = () => {
            setIsGoogleLogin(true);
    
            const auth = getAuth();
            signInWithPopup(auth, provider)
                .then((result) => {
                    // This gives you a Google Access Token. You can use it to access the Google API.
                    const credential = GoogleAuthProvider.credentialFromResult(result);
                    const token = credential.accessToken;
                    // The signed-in user info.
                    const user = result.user;
    
                    console.log(user);
                    // IdP data available using getAdditionalUserInfo(result)
    
                    localStorage.setItem('firebase_user', user.uid)
                    // ...
                    setIsGoogleLogin(false);
                    toast.success('Login succussfully !')
                    navigate('/');
    
                    // ...
                }).catch((error) => {
                    // Handle Errors here.
                    const errorCode = error.code;
                    const errorMessage = error.message;
    
                    setIsGoogleLogin(false);
                    toast.error(errorMessage);
                    // // The email of the user's account used.
                    // const email = error.customData.email;
                    // // The AuthCredential type that was used.
                    // const credential = GoogleAuthProvider.credentialFromError(error);
                    // // ...
                });
        }

    return (
        <>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        alt="Your Company"
                        src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                        className="mx-auto h-10 w-auto"
                    />
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                        Sign up to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={ register } className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                                    Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    autoComplete="current-password"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                {
                                    isLoading
                                        ?
                                        <>
                                            <svg class="mr-3 -ml-1 size-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Loading…
                                        </>
                                        :
                                        'Sign up'
                                }
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm/6 text-gray-500">
                        Already a member?{' '}
                        <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
                            Login your Account
                        </Link>
                    </p>

                    <div className='mt-5'>
                        <button onClick={googleLogin}
                            type="button"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            {
                                isGoogleLogin
                                    ?
                                    <>
                                        <svg class="mr-3 -ml-1 size-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Loading…
                                    </>
                                    :
                                    'Login with Google'
                            }

                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
