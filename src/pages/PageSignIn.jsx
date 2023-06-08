import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';
import { Alert, Button, Form, FormControl, InputGroup } from 'react-bootstrap';
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
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

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
      }, 1000);
    }
  }, [user, isLoggedIn, redirectTo]);

  const login = async () => {
    setEmailError("");
    setPasswordError("");

    if (!loginEmail || !loginPassword) {
      if (!loginEmail) setEmailError("Vui lòng nhập email!");
      if (!loginPassword) setPasswordError("Vui lòng nhập mật khẩu!");
      return;
    }

    try {
      const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
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
          {loginError && <Alert variant="danger">{loginError}</Alert>}
          <Form>
            <Form.Group className="mb-3" controlId="loginEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email..."
                value={loginEmail}
                onChange={(event) => setLoginEmail(event.target.value)}
                isInvalid={emailError !== ""}
              />
              <Form.Control.Feedback type="invalid">
                {emailError}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="loginPassword">
              <Form.Label>Password</Form.Label>
              <InputGroup>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Password..."
                  value={loginPassword}
                  onChange={(event) => setLoginPassword(event.target.value)}
                  isInvalid={passwordError !== ""}
                />
                <InputGroup.Text
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ cursor: "pointer" }}
                >
                  {showPassword ? <RiEyeOffFill /> : <RiEyeFill />}
                </InputGroup.Text>
                <Form.Control.Feedback type="invalid">
                  {passwordError}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <div className="signup-box-text">
              <div className="signup-text">Bạn chưa có tài khoản???</div>
              <Link className="signup" to={'/sign-up'}>
                <a href="" className="signup-link">Đăng Ký Ngay</a>
              </Link>
            </div>
            <Button variant="primary" onClick={login}>Đăng nhập</Button>
          </Form>
        </div>
      )}

      {isLoggedIn && (
        <>
          <h4>Đăng nhập thành công:</h4>
          {user?.email}
          <Button variant="danger" onClick={logout}>Đăng xuất</Button>
        </>
      )}
    </div>
  );
}

export default App;
