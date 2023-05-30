import "../assets/less/header.less";
import { signOut } from "firebase/auth";
import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { iconClose, iconHamburger } from "@Assets/icons";
import { Link } from 'react-router-dom';

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase/fire";

export default function MenuHeader() {
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [rememberUser, setRememberUser] = useState('');
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setIsLoggedIn(!!user?.email);
  }, [user]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setUser({});
        setRememberUser('');
        setIsLoggedOut(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const isHoangHaEmail = user?.email?.includes('@hoangha.com');
  console.log("isHoangHaEmail", isHoangHaEmail);

  return (
    <>
      {/* CSS link */}
      <header className="headers">
        <nav className="nav">
          <Link className="logo" to={''} >
            <img src="https://hoanghamobile.com/Content/web/img/logo-text.png" alt="" className="logo" />
          </Link>
          <ul className="nav_items">
            <li className="nav_item">
              <a href="#" className="nav_link">Bảo Hành</a>
              <a href="#" className="nav_link">Tra Cứu Đơn Hàng</a>
            </li>
          </ul>
          {isLoggedIn && !isLoggedOut ? (
            <div className="success_sign">
              <div className="image_account">
                <img src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg" alt="" className="img-acc" />
              </div>
              <div className="name_account" onClick={handleDropdownToggle}>{user?.email}</div>
              {isDropdownOpen && (
                <div ref={dropdownRef} className="dropdown">
                  <button onClick={handleLogout}>Sign Out</button>
                </div>
              )}
            </div>
          ) : (
            <Link className="signin-signup" to={'/sign-in'} >
              <button className="button-login" id='form-open'>Đăng Nhập</button>
            </Link>
          )}
        </nav>
      </header>
    </>
  );
}
