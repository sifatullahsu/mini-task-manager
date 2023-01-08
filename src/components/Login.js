import React from 'react';
import { toast } from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import GoogleSignIn from './GoogleSignIn';
import { useAuth } from '../contexts/AuthProvider';

const Login = () => {
  const { userLogin, setUserLoading } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleForm = (event) => {
    event.preventDefault();

    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    userLogin(email, password)
      .then(result => {
        toast.success('Login Successful..');
        form.reset();
        navigate(from, { replace: true });
        setUserLoading(false);
      })
      .catch((err) => {
        toast.error(err.message);
        setUserLoading(false);
      })
  }

  return (
    <div className="p-8 border border-secondary bg-neutral">
      <h1 className="text-2xl font-bold text-center">Login</h1>
      <form onSubmit={handleForm} className="space-y-6 ng-untouched ng-pristine ng-valid">
        <div className="space-y-1 text-sm">
          <label htmlFor="email" className="block text-gray-600">Email</label>
          <input type="text" name="email" placeholder="email" className="input bg-neutral input-bordered w-full" />
        </div>
        <div className="space-y-1 text-sm">
          <label htmlFor="password" className="block text-gray-600">Password</label>
          <input type="password" name="password" placeholder="Password" className="input bg-neutral input-bordered w-full" />
        </div>
        <div className='flex justify-between'>
          <button type='submit' className="btn btn-primary btn-sm">Login</button>
          <GoogleSignIn from={from}></GoogleSignIn>
        </div>
      </form>
    </div>
  );
};

export default Login;