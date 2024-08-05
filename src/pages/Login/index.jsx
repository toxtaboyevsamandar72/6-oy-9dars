import React, { useRef } from "react";
import styles from "../Login/index.module.css";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const navigate = useNavigate();

  function validate() {
    const username = usernameRef.current.value.trim();
    const password = passwordRef.current.value.trim();
    let isValid = true;

    if (username.length < 3) {
      alert("Username must be at least 3 characters long");
      isValid = false;
    }

    if (password.length < 4) {
      alert("Password must be at least 4 characters long");
      isValid = false;
    }

    return isValid;
  }

  function handleLogin(event) {
    event.preventDefault();

    const isValid = validate();
    if (!isValid) {
      return;
    }

    const user = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };

    fetch("https://auth-rg69.onrender.com/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.message == "User Not found.") {
          alert(data.message)
          usernameRef.current.focus();
          return
        }

        if (data.message == "Invalid Password!") {
          alert(data.message)
          passwordRef.current.focus();
          return
        }

        if (data.accessToken) {
          localStorage.setItem('user', JSON.stringify('data'));
          localStorage.setItem('token', data.accessToken);

          navigate('/home')
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleLogin}>
        <h1 className={styles.h1}>Login Page</h1>
        <input
          type="text"
          className={styles.input}
          placeholder="Username"
          ref={usernameRef}
          required
        />
        <input
          type="password"
          className={styles.input}
          placeholder="Password"
          ref={passwordRef}
          required
        />
        <button type="submit" className={styles.button}>
          Login
        </button>
        <Link to="/" className={styles.link}>
          Register
        </Link>
      </form>
    </div>
  );
}

export default Login;
