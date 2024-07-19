// frontend/src/components/Navigation/ProfileButton.jsx

import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { FaUserCircle } from "react-icons/fa";
import { IoIosMenu } from "react-icons/io";
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal/LoginFormModal';
import SignupFormModal from '../SignupFormModal/SignupFormModal';
import './ProfileButton.css'
import { useNavigate } from 'react-router-dom';

function ProfileButton({ user }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef()

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep click from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const manageSpots = (e) => {
    e.preventDefault();
    closeMenu();
    navigate('/spots/manage');
  }

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    navigate('/');
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <div>
      <button className='profileButton' onClick={toggleMenu}>
        <IoIosMenu />
        <div className='profileIcon'>
          <FaUserCircle />
        </div>
      </button>
      <div className={ulClassName} id='profileMenu' ref={ulRef}>
      {user ? (
          <div>
            <div>Hello, {user.firstName}</div>
            <div>{user.email}</div>
            <div>
              <button className='manageSpotsButton' onClick={manageSpots}>Manage Spots</button>
            </div>
            <div>
              <button className='logoutButton' onClick={logout}>Log Out</button>
            </div>
          </div>
        ) : (
          <div className='not-logged'>
            <div className="login-profile">
              <OpenModalMenuItem
                itemText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
            </div>
            <div className="signup-button">
              <OpenModalMenuItem
                itemText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileButton;