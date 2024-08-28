import React from 'react'
import { NavLink } from "react-router-dom";

export default function UserNavbar() {
  return (
    <>
       <header>
                <div className="container2">
                    <div className="logo-brand">
                        <a href="/">
                            <img src="/images/logo_adroitkey.png" >
                            </img></a>
                    </div>
                    <li>
                        <NavLink to="/login">Logout</NavLink>
                    </li>
                </div>
            </header>

    </>
  )
}
