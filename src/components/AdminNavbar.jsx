import React from 'react'
import { NavLink } from "react-router-dom";

const AdminNavbar = () => {
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
                        <NavLink to="/AdminPanel">Admin Table </NavLink>
                    </li>
                    <li>
                        <NavLink to="/CrudTableMaster">Admin Table Master</NavLink>
                    </li>
                    <li>
                        <NavLink to="/AddUser">Add user</NavLink>
                    </li>
                    <li>
                        <NavLink to="/login">Logout</NavLink>
                    </li>
                </div>
            </header>

        </>
    )
}

export default AdminNavbar
