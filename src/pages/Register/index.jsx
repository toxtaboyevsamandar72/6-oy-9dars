import React, { useRef } from "react";
import styles from "../Register/index.module.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Register() {
  const usernameRef = useRef("");
  const passwordRef = useRef("");
  const emailRef = useRef("");
  const repasswordRef = useRef("");
  const navigate = useNavigate();

  function validate() {
    const user = {
      username: usernameRef.current.value.trim(),
      email: emailRef.current.value.trim(),
      password: passwordRef.current.value,
      repassword: repasswordRef.current.value,
    };

    let isValid = true;

    if (user.username.length < 3 || /\s/.test(user.username)) {
      alert(
        "Username must be at least 3 characters long and cannot contain whitespace"
      );
      isValid = false;
    }

    if (!/\S+@\S+\.\S+/.test(user.email)) {
      alert("Email address is invalid");
      isValid = false;
    }

    if (user.password.length < 4) {
      alert("Password must be at least 4 characters long");
      isValid = false;
    }

    if (user.password !== user.repassword) {
      alert("Passwords do not match");
      isValid = false;
    }

    return isValid;
  }

  const handleRegister = (event) => {
    event.preventDefault();
    const isValid = validate();

    if (!isValid) {
      return;
    }

    const user = {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    fetch("https://auth-rg69.onrender.com/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((resp) => {
        if (!resp.ok) {
          return resp.json().then((error) => {
            throw new Error(error.message);
          });
        }
        return resp.json();
      })
      .then((data) => {
        if (data.message === "Failed! Email is already in use!") {
          alert(data.message);
          emailRef.current.focus();
          return;
        }

        if (data.message === "Failed! Username is already in use!") {
          alert(data.message);
          usernameRef.current.focus();
          return;
        }

        if (data.message === "User registered successfully!") {
          navigate("/login");
        }
      })
      .catch((err) => {
        console.error(err);
        alert(err.message);
      });
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleRegister}>
        <h1 className={styles.h1}>Register Page</h1>

        <div className={styles.fieldContainer}>
          <input
            type="text"
            className={styles.input}
            placeholder="Username"
            ref={usernameRef}
            required
          />
        </div>

        <div className={styles.fieldContainer}>
          <input
            type="email"
            className={styles.input}
            placeholder="Email"
            ref={emailRef}
            required
          />
        </div>

        <div className={styles.fieldContainer}>
          <input
            type="password"
            className={styles.input}
            placeholder="Password"
            ref={passwordRef}
            required
          />
        </div>

        <div className={styles.fieldContainer}>
          <input
            type="password"
            className={styles.input}
            placeholder="RePassword"
            ref={repasswordRef}
            required
          />
        </div>

        <button type="submit" className={styles.button}>
          Register
        </button>
        <Link to="/login" className={styles.link}>
          LOGIN
        </Link>
      </form>
    </div>
  );
}

export default Register;
