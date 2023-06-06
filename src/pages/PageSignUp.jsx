import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase/fire";

import 'bootstrap/dist/css/bootstrap.css';

function App() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerPasswordConfirm, setRegisterPasswordConfirm] = useState("");
  const [registerError, setRegisterError] = useState("");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Thêm biến isLoggedIn

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setIsLoggedIn(!!user?.email); // Cập nhật giá trị của isLoggedIn khi user.email thay đổi
  }, [user]);

  const register = async () => {
    try {
      if (registerPassword === registerPasswordConfirm) {
        const user = await createUserWithEmailAndPassword(
          auth,
          registerEmail,
          registerPassword
        );
        console.log(user);
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



  return (
    <div className="App d-flex align-items-center justify-content-center vh-100">
      {!isLoggedIn && (
        <div className="App-sign-up">
          <h3 className="mb-3"> Tạo Tài Khoản </h3>
          {registerError && <div className="alert alert-danger">Mật Khẩu Không Trùng Khớp!</div>}

          <input
            className="form-control mb-2"
            placeholder="Email..."
            value={registerEmail}
            onChange={(event) => {
              setRegisterEmail(event.target.value);
            }}
          />
          <input
            className="form-control mb-2"
            placeholder="Password..."
            value={registerPassword}
            onChange={(event) => {
              setRegisterPassword(event.target.value);
            }}
          />
          <input
            className="form-control mb-2 pwcf"
            placeholder="Password Confirm..."
            value={registerPasswordConfirm}
            onChange={(event) => {
              setRegisterPasswordConfirm(event.target.value);
            }}
          />
          <div className="login-box-text">
            <div className="login-text">Bạn đã có tài khoản???</div>
            <Link className="login" to={'/sign-in'} >
              <a href="" className="login-link">Đăng Nhập Ngay</a>
            </Link>
          </div>
          <button className="btn btn-primary" onClick={register}> Create User</button>
        </div>
      )}

      {isLoggedIn && (
        <>
          <h4> Xin Chào Mừng: </h4>
          {user?.email}
          <button className="btn btn-danger" onClick={logout}> Sign Out </button>
        </>
      )}
    </div>

  );
}

export default App;
