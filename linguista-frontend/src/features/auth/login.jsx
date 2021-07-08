import React from 'react';
import "./login.css";
import { useLocation, useNavigate, Link } from "react-router-dom";

export const Login = () => {
    return (
        <>
            <div className="topbarContainer">
                <div className="topbarLeft">
                    <span className="logo para--lead">Linguista</span>
                </div>
            </div>
            <div className="login-main">
                <div className="app-logo">
                    <img className="brand-logo" src="/assets/linguista_logo.png" alt="brand_logo"></img>
                </div>
                <div className="inputForm">
                <div className="box">
                <div className="form">
                    <input
                    className="form__input email"
                    type="text"
                    name="email"
                    // value={loginState.email}
                    // onChange={signInHandler}
                    required
                    ></input>
                    <label className="form__label">email</label>
                </div>
                <div className="form">
                    <input
                    className="form__input"
                    type="password"
                    name="password"
                    // value={loginState.password}
                    // onChange={signInHandler}
                    required
                    ></input>
                    <label className="form__label">password</label>
                </div>
                <div className="btn__container">
                    <div className="btn btn--primary login" 
                    // onClick={loginHandler}
                    >
                    Login
                    </div>
                </div>
                <p className="para signup-header">
                    New to Linguista?
                    <span>
                    <Link to="/signup" className="signup">
                        SignUp
                    </Link>
                    </span>
                </p>ls
                <div className="test">
                    <p>Test Credentials</p>
                    <p>email: test123@gmail.com</p>
                    <p>password: test123</p>
                </div>
                </div>
            </div>
        </div>
        </>
    )
}