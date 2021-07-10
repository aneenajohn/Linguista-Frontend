import React, { useState, useEffect } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { loginUser } from "./authSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";

export const Login = () => {
  const { isLoggedIn, status, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const authDispatch = useDispatch();
  const navigate = useNavigate();

  const onEmailChanged = (e) => setEmail(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);
  const onShowPasswordClicked = () =>
    setShowPassword((showPassword) => !showPassword);

  const loginHandler = async (e) => {
    e.preventDefault();
    toast.success("Stay Tuned! We are logging you in !!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true
    });
    await authDispatch(loginUser({ email, password }));
    navigate("/posts");
  };

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     toast.success("Logged-in succesfully", {
  //       position: "top-right",
  //       autoClose: 3000,
  //       hideProgressBar: true
  //     });
  //     navigate("/posts");
  //   }
  //   status === "error" &&
  //     toast.dark(`${error}`, {
  //       position: "top-right",
  //       autoClose: 3000,
  //       hideProgressBar: true
  //     });
  // }, [authDispatch, status, isLoggedIn]);

  return (
    <>
      <div className="topbarContainer">
        <div className="topbarLeft">
          <span className="logo para--lead">Linguista</span>
        </div>
      </div>
      <div className="login-main">
        <div className="app-logo">
          <img
            className="brand-logo"
            src="/assets/linguista_logo.png"
            alt="brand_logo"
          ></img>
        </div>
        <div className="inputForm">
          <div className="box">
            <h1 className="para-header login-header">Login to your account</h1>
            <div className="form">
              <input
                className="form__input email"
                type="text"
                name="email"
                value={email}
                onChange={onEmailChanged}
                required
              ></input>
              <label className="form__label">email</label>
            </div>
            <div className="form">
              <input
                className="form__input"
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={onPasswordChanged}
                required
              ></input>
              <div>
                {password && (
                  <div
                    className="setPasswordVisibility"
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? (
                      <VisibilityOffIcon className="showPassword" />
                    ) : (
                      <VisibilityIcon className="showPassword" />
                    )}
                  </div>
                )}
              </div>
              <label className="form__label">password</label>
            </div>
            <div className="btn__container">
              <div className="btn btn--primary login" onClick={loginHandler}>
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
            </p>
            <div className="test">
              <p>Test Credentials</p>
              <p>email: test123@gmail.com</p>
              <p>password: test123</p>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};
