import React from "react";
import "../styles/form.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from '../hooks/useAuth'
import {useNavigate} from "react-router-dom"

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { user, loading, handleLogin } = useAuth()
  const navigate = useNavigate();

  if (loading) {
        return (
            <h1>Loading...</h1>
        )
    }


  async function handleSubmit(e) {
    e.preventDefault();

    await handleLogin(username, password)
        .then(res=>{
            console.log(res)
            navigate("/")
        })

  }

  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            onInput={(e) => {
              setUsername(e.target.value);
            }}
            type="text"
            name="username"
            id='username'
            placeholder="Enter username"
          />
          <input
            onInput={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            name="password"
            id='password'
            placeholder="Enter password"
          />
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account?{" "}
          <Link className="toggleAuthForm" to="/register">
            Register
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
