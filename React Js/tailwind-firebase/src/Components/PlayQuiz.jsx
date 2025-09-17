import React, { useEffect } from 'react'
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

export default function PlayQuiz() {

  const firebaseUser = localStorage.getItem('firebase_user');
  var navigate = useNavigate();  // Executable function

  useEffect(() => {
    if(!firebaseUser){
      toast.error('Please login first !')
      navigate('/');
    }
    
  },[]);

  return (
    <div>
      
    </div>
  )
}
