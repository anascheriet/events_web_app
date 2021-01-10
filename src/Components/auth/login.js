import { Button, Input, Form } from 'antd'
import React from 'react'
import "./login.scss"

export const Login = () => {

  return (
    <div className="container">
      <div className="logo-container">
        <div className="name">
          <h2>eventor</h2>
        </div>
        <div className="description">
          <h2>EVENT PLANNING.</h2>
        </div>

      </div>


      <div className="form">
        <form >
          <label className="label">USERNAME</label>
          <br />
          <input type="text" className="input" />
          <br />
          <br />
          <label className="label">PASSWORD</label>
          <br />
          <input type="password" className="input" />
          <br />
          <br />

          <button className="submitBtn">Log In</button>

        </form>
        <div className="links">
          <a  href="">Create Account</a>
          <a  href="">Forgot Password?</a>
        </div>
      </div>

    </div>
  );

}
