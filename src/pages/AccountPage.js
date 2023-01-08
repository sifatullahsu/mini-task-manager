import React from 'react';
import Loading from '../components/Loading';
import Login from '../components/Login';
import Register from '../components/Register';
import { useAuth } from '../contexts/AuthProvider';

const AccountPage = () => {

  const { userLoading } = useAuth();

  if (userLoading) {
    return <Loading></Loading>
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-10 mt-[60px] lg:mt-[100px]'>
      <div>
        <Login></Login>
      </div>
      <div>
        <Register></Register>
      </div>
    </div>
  );
};

export default AccountPage;