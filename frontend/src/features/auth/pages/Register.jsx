import React from "react";
import "../styles/form.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useAuth } from '../hooks/useAuth'
import {useNavigate} from "react-router-dom"

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { handleRegister,loading } = useAuth()
  const navigate = useNavigate();

  if (loading) {
        return (
            <h1>Loading...</h1>
        )
    }

  async function handleSubmit(e) {
    e.preventDefault();

    handleRegister(username , email , password)
    .then(res=>{
            console.log(res)
            navigate("/login")
        })
  }

  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <input
            onInput={(e) => {
              setUsername(e.target.value);
            }}
            type="text"
            name="username"
            placeholder="Enter username"
          />
          <input
            onInput={(e) => {
              setEmail(e.target.value);
            }}
            type="text"
            name="email"
            placeholder="Enter email"
          />
          <input
            onInput={(e) => {
              setPassword(e.target.value);
            }}
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
