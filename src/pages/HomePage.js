import React from 'react';
import { useAuth } from '../contexts/AuthProvider';
import AccountPage from './AccountPage';
import DashPage from './DashPage';

const HomePage = () => {

  const { user } = useAuth();

  return (
    <div className='container'>
      {
        user?.uid ?
          <DashPage></DashPage>
          :
          <AccountPage></AccountPage>
      }
    </div>
  );
};

export default HomePage;