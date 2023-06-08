import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase/fire";

import "bootstrap/dist/css/bootstrap.css";

function App() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerPasswordConfirm, setRegisterPasswordConfirm] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [registerEmptyError, setRegisterEmptyError] = useState(false);
  const [passwordLengthError, setPasswordLengthError] = useState(false);
  const [invalidEmailError, setInvalidEmailError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [redirectTimer, setRedirectTimer] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setIsLoggedIn(!!user?.email);

    if (isLoggedIn) {
      const timer = setTimeout(() => {
        setRedirectTimer(true); // Bắt đầu đếm thời gian chuyển hướng
      }, 2000);

      return () => clearTimeout(timer); // Hủy đếm thời gian nếu component bị unmount
    }
  }, [user, isLoggedIn]);

  useEffect(() => {
    if (redirectTimer) {
      const timer = setTimeout(() => {
        // Chuyển hướng đến "/Project_HH" sau khi đếm đủ 1 giây
        window.location.href = "/Project_HH";
      }, 1000);

      return () => clearTimeout(timer); // Hủy đếm thời gian nếu component bị unmount
    }
  }, [redirectTimer]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const register = async () => {
    try {
      if (registerPassword === registerPasswordConfirm) {
        if (registerEmail && registerPassword && registerPasswordConfirm) {
          if (registerPassword.length >= 6) {
            if (validateEmail(registerEmail)) {
              const user = await createUserWithEmailAndPassword(
                auth,
                registerEmail,
                registerPassword
              );
              console.log(user);
            } else {
              setInvalidEmailError(true);
              setRegisterError("");
            }
          } else {
            setPasswordLengthError(true);
            setRegisterError("");
          }
        } else {
          setRegisterEmptyError(true);
          setRegisterError("");
        }
      } else {
        setRegisterError("Mật Khẩu Không Trùng Khớp!");

        // Xoá giá trị trong input
        setRegisterPasswordConfirm("");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword((prevState) => !prevState);
  };

  return (
    <div className="App d-flex align-items-center justify-content-center vh-100">
      {!isLoggedIn && (
        <div className="App-sign-up">
          <h3 className="mb-3"> Tạo Tài Khoản </h3>
          {registerError && (
            <div className="alert alert-danger">{registerError}</div>
          )}
          {registerEmptyError && (
            <div className="alert alert-danger">
              Vui lòng điền đầy đủ thông tin!
            </div>
          )}
          {passwordLengthError && (
            <div className="alert alert-danger">
              Mật khẩu phải có ít nhất 6 ký tự!
            </div>
          )}
          {invalidEmailError && (
            <div className="alert alert-danger">
              Thông tin bạn nhập không phải là email
            </div>
          )}

          <input
            className="form-control mb-2"
            placeholder="Email..."
            value={registerEmail}
            onChange={(event) => {
              setRegisterEmail(event.target.value);
              setInvalidEmailError(false);
            }}
          />
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control mb-2"
              placeholder="Password..."
              value={registerPassword}
              onChange={(event) => {
                setRegisterPassword(event.target.value);
                setPasswordLengthError(false);
              }}
            />
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              className="password-icon"
              onClick={toggleShowPassword}
            />
          </div>
          <div className="password-wrapper">
            <input
              type={showConfirmPassword ? "text" : "password"}
              className="form-control mb-2 pwcf"
              placeholder="Password Confirm..."
              value={registerPasswordConfirm}
              onChange={(event) => {
                setRegisterPasswordConfirm(event.target.value);
              }}
            />
            <FontAwesomeIcon
              icon={showConfirmPassword ? faEyeSlash : faEye}
              className="password-icon"
              onClick={toggleShowConfirmPassword}
            />
          </div>
          <div className="login-box-text">
            <div className="login-text">Bạn đã có tài khoản???</div>
            <Link className="login" to={"/sign-in"}>
              <a href="" className="login-link">
                Đăng Nhập Ngay
              </a>
            </Link>
          </div>
          <button className="btn btn-primary" onClick={register}>
            Create User
          </button>
        </div>
      )}

      {isLoggedIn && (
        <>
          <h4> Xin Chào Mừng: </h4>
          {user?.email}
          <button className="btn btn-danger" onClick={logout}>
            Sign Out
          </button>
        </>
      )}
    </div>
  );
}

export default App;
