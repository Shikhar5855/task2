import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Store/auth";
import { Navbar } from "../components/Navbar";

export const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const { storeTokenInLS } = useAuth();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Load users from localStorage
    const storedUsers = JSON.parse(localStorage.getItem("newUserKey")) || [];

    // Check if the entered credentials match any stored user
    const foundUser = storedUsers.find(
      (storedUser) =>
        storedUser.userEmail === user.email && storedUser.password === user.password
    );

    if (foundUser) {
      storeTokenInLS(foundUser.userEmail); // You can store any token or user identifier
      setUser({ email: "", password: "" });
      navigate("/Search");
    } else {
      alert("Invalid Credentials");
      console.log("Invalid Credentials");
      navigate("/login");
    }
  };

  const handleAdmin = (e) => {
    e.preventDefault();
    storeTokenInLS("admin-token");
    navigate("/Admin");
  };
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  

  return (
    <>
      <Navbar />
      <section>
        <main>
          <div className="section-login">
            <div className="container grid grid-two-cols">
              <div className="registration-image">
                <img
                  src="/images/login.png"
                  alt="Lets fill the login form"
                  width="500"
                  height="500"
                />
              </div>
              <div className="login-form">
                <h1 className="main-heading mb-3">User Login Form</h1>
                <br />
                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      id="email"
                      required
                      autoComplete="off"
                      value={user.email}
                      onChange={handleInput}
                    />
                  </div>
                  <div className="password-field">
                    <label htmlFor="password">Password</label>
                    <div className="password-input-wrapper">
                      <input
                        type={passwordVisible ? "text" : "password"} // Toggle between text and password
                        name="password"
                        placeholder="Enter your password"
                        id="password"
                        autoComplete="off"
                        value={user.password}
                        onChange={handleInput}
                        className="password-input"
                      />
                      <button
                type="button"
                className='password-toggle-button-login'
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" className="bi bi-eye" viewBox="0 0 16 16">
                  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" className="bi bi-eye-slash" viewBox="0 0 16 16">
                    <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z" />
                    <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829" />
                    <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z" />
                  </svg>
                  
                )}
                      </button>
                    </div>
                  </div>
                  <br />
                  <button type="submit" className="btn btn-submit redbutton">
                    Login
                  </button>
                  <br />
                  <h3 className="p"> OR</h3>
                  <button onClick={handleAdmin} className="admin-panel redbutton">
                    Admin Login
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};
