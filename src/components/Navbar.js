import React from 'react';
import { toast } from 'react-hot-toast';
import { FaSignOutAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider';
import logo from '../assets/logo.png';

const Navbar = () => {
  const { user, userLogout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    userLogout()
      .then(result => {
        toast.success('Logout successfull..');
        navigate('/');
      })
      .catch(err => {
        toast.error('Somthing is wrong..')
      })
  }

  return (
    <div className='container border-b border-secondary mb-10'>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <Link to='/' className="max-w-[180px]">
            <img src={logo} alt="" />
          </Link>
        </div>
        <div className="flex-none">
          {
            user?.uid &&
            <button
              className="btn btn-primary btn-sm capitalize"
              onClick={() => handleLogout()}
            ><FaSignOutAlt className='mr-2'></FaSignOutAlt> Logout</button>
          }
        </div>
      </div>
    </div>
  );
};

export default Navbar;