import { useState, useEffect } from "react";
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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

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
        setRegisterPassword("");
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
      <div className="App-sign-up">
        <h3> Tạo Tài Khoản </h3>
        {registerError && <div>Mật Khẩu Không Trùng Khớp!</div>}

        <input
          placeholder="Email..."
          value={registerEmail}
          onChange={(event) => {
            setRegisterEmail(event.target.value);
          }}
        />
        <input
          placeholder="Password..."
          value={registerPassword}
          onChange={(event) => {
            setRegisterPassword(event.target.value);
          }}
        />
        <input
          className="pwcf"
          placeholder="Password Confirm..."
          value={registerPasswordConfirm}
          onChange={(event) => {
            setRegisterPasswordConfirm(event.target.value);
          }}
        />

        <button onClick={register}> Create User</button>
      </div>

      {/* ------------------------------------------------------------------------------------------------------------------------------ */}
      {/* ------------------------------------------------------------------------------------------------------------------------------ */}

      {/* LOGIN */}

      {/* ------------------------------------------------------------------------------------------------------------------------------ */}
      {/* ------------------------------------------------------------------------------------------------------------------------------ */}



      {user?.email && (
        <>
          <h4> User Logged In: </h4>
          {user?.email}
          <button onClick={logout}> Sign Out </button>
        </>
      )}
    </div>
  );
}

export default App;
