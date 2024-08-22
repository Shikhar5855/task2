import { useState } from "react";
import {Navigate, useNavigate} from "react-router-dom";
import { useAuth } from "../Store/auth";

// const URL = "http://localhost:5000/api/auth/login";

export const Login = ()=>{
    const [user, setUser] = useState({
        email: "",
        password: "",
    })
    const navigate = useNavigate();
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

    //Handling the form submission
    const handleSubmit = async(e)=>{
        e.preventDefault();
        console.log(user);
        navigate("/Search")
        // try {
        //     const response = await fetch(URL, {
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "application/json",
        //         },
        //         body: JSON.stringify(user),
        //     });

        //     console.log("login form", response);
            
            // if (response.ok) {
            //     alert("Login Successfully");
            //     const res_data = await response.json();

            //     //Stored the token in localStorage 
            //     storeTokenInLS(res_data.token);

            //     setUser({email: "", password: ""});
            //     navigate("/");
            // }
            // else{
            //     alert("Invalid Credentials");
            //     console.log("Invalid Credentials");
            //     navigate("/")
            // }
        // } catch (error) {
        //     console.log("Login", error);
        }
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
                            {/* Lets tackle registration form */}
                            <div className="login-form">
                                <h1 className="main-heading mb-3">Login Form</h1>
                                <br />

                                <form onSubmit={handleSubmit}>
                                    <div>
                                        <label htmlFor="email">email</label>
                                        <input 
                                        type="email" 
                                        name="email" 
                                        placeholder="enter your email" 
                                        id="email" 
                                        required
                                        autoComplete="off"
                                        value={user.email}
                                        onChange={handleInput}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="password">password</label>
                                        <input 
                                        type="password" 
                                        name="password" 
                                        placeholder="enter your password" 
                                        id="password" 
                                        required
                                        autoComplete="off"
                                        value={user.password}
                                        onChange={handleInput}
                                        />
                                    </div>
                                    <br />
                                    <button type="submit"className="btn btn-submit">Login</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </main>
            </section>
        </>
    );
};

