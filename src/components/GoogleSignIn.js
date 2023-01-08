import React from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider';

const GoogleSignIn = ({ from }) => {

  const { userSocialLogin, setUserLoading } = useAuth();
  const navigate = useNavigate();


  const handleGoogleSignIn = () => {
    userSocialLogin('google')
      .then(res => {
        toast.success('Login Successful..');
        navigate(from, { replace: true });
        setUserLoading(false)
      })
      .catch(err => {
        toast.error(err.message);
        setUserLoading(false);
      })
  }

  return (
    <>
      <button onClick={handleGoogleSignIn} className='btn btn-secondary btn-sm capitalize'>Login with Google</button>
    </>
  );
};

export default GoogleSignIn;