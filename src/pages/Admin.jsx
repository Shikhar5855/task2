import React from 'react'
import {Navigate, useNavigate} from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../Store/auth";

export default function Admin() {
    const [user, setUser] = useState({
        email: "",
        password: "",
    })
    const Navigate = useNavigate();
    const {storeTokenInLS} = useAuth();

    //Handling the input values
    const handleInput = (e)=>{
        let name = e.target.name;
        let value = e.target.value;
        setUser({
            ...user,
            [name]:value,
        })
    }
    const handleSubmit = async(e)=>{
        e.preventDefault();
        console.log(user);
        Navigate("/Adminpanel")
    }
    const handleuser = async(e)=>{
        e.preventDefault();
        console.log(user);
        Navigate("/Login")

    } //Handling the form submission
  return (
    <>
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
                                <h1 className="main-heading mb-3">Admin Login Form</h1>
                                <br />
                                <form onSubmit={handleSubmit}>
                                <div>
                                        <label htmlFor="email">email</label>
                                        <input 
                                        type="email" 
                                        name="email" 
                                        placeholder="Enter your email" 
                                        id="email" 
                                        required
                                        autoComplete="off"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="password">password</label>
                                        <input 
                                        type="password" 
                                        name="password" 
                                        placeholder="Enter your password" 
                                        id="password" 
                                        required
                                        autoComplete="off"
                                        />
                                    </div>
                                    <br />
                                    <button type="submit"className="btn btn-submit redbutton">Login</button>
                                    <br></br>
                                    <h3 className="p"> OR</h3>
                                    <button onClick={handleuser} className="admin-panel redbutton"> Login As User  </button>
                                </form>
                                </div>
                        </div>
                    </div>
                </main>
            </section>
    </>
  )
}
