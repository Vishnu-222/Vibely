import React from "react";
import "../styles/form.scss"
import { Link } from 'react-router'

const Register = () => {
  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>
        <form>
          <input
            // onInput={(e) => { setUsername(e.target.value) }}
            type="text"
            name="username"
            placeholder="Enter username"
          />
          <input
            // onInput={(e) => { setEmail(e.target.value) }}
            type="text"
            name="email"
            placeholder="Enter email"
          />
          <input
            // onInput={(e) => {
            //   setPassword(e.target.value);
            // }}
            type="password"
            name="password"
            placeholder="Enter password"
          />
          <button>Register</button>
        </form>

        <p>
          Already have an account?{" "}
          <Link className="toggleAuthForm" to="/login">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
