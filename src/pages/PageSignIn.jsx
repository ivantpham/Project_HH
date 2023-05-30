import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase/fire";

import 'bootstrap/dist/css/bootstrap.css';

function App() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [redirectTo, setRedirectTo] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setIsLoggedIn(!!user?.email);

    if (isLoggedIn && redirectTo) {
      setTimeout(() => {
        window.location.href = redirectTo; // Thực hiện chuyển hướng
      }, 3000);
    }
  }, [user, isLoggedIn, redirectTo]);

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(user);
      setRedirectTo("/Project_HH"); // Chuyển hướng về trang chủ
    } catch (error) {
      console.log(error.message);
      setLoginError("Đăng nhập không thành công - Hãy kiểm tra Email hoặc Password!");
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <div className="App d-flex align-items-center justify-content-center vh-100">
      {!isLoggedIn && (
        <div className="App-login">
          <h3 className="mb-4">Đăng nhập</h3>
          {loginError && <div className="alert alert-danger">{loginError}</div>}

          <input
            className="form-control mb-3"
            placeholder="Email..."
            value={loginEmail}
            onChange={(event) => {
              setLoginEmail(event.target.value);
            }}
          />
          <input
            className="form-control mb-3"
            type="password"
            placeholder="Password..."
            value={loginPassword}
            onChange={(event) => {
              setLoginPassword(event.target.value);
            }}
          />
          <div className="signup-box-text">
            <div className="signup-text">Bạn chưa có tài khoản???</div>
            <Link className="signup" to={'/sign-up'} >
              <a href="" className="signup-link">Đăng Ký Ngay</a>
            </Link>
          </div>
          <button className="btn btn-primary" onClick={login}>Đăng nhập</button>
        </div>
      )}

      {isLoggedIn && (
        <>
          <h4>Đăng nhập thành công:</h4>
          {user?.email}
          <button className="btn btn-danger" onClick={logout}>Đăng xuất</button>
        </>
      )}
    </div>

  );
}

export default App;
