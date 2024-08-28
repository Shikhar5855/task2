import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import ReactDOM from 'react-dom/client';
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Login } from "./pages/Login";
import { Service } from "./pages/Service";
import { Error } from "./pages/Error";
import { Footer } from "./components/Footer/Footer";
import { Logout } from "./pages/Logout";
import Search from "./pages/Search";
import Admin from "./pages/admin"
import CrudTable from "./pages/CrudTable";
import AddUser from './pages/Adduser.JSX';
import CrudTableMaster from './pages/CrudTableMaster';
import AdminPanel from './pages/Adminpanel';


// Create a root once and render your app
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
  // <React.StrictMode>
  //   <Adminpanel />
  // </React.StrictMode>
);
const App = ()=>{
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<Home/>}/>
        <Route path = "/about" element = {<About/>}/>
        <Route path = "/contact" element = {<Contact/>}/>
        <Route path = "/service" element = {<Service/>}/>
        <Route path = "/login" element = {<Login/>}/>
        <Route path = "/logout" element = {<Logout/>}/>
        <Route path = "*" element = {<Error/>}/>
        <Route path = "/Search" element = {<Search/>}/>
        <Route path = "/Admin" element = {<Admin/>}/>
        <Route path = "/AdminPanel" element = {<AdminPanel/>}/>
        <Route path = "/CrudTable" element = {<CrudTable/>}/>
        <Route path = "/CrudTableMaster" element = {<CrudTableMaster/>}/>
        <Route path = "/AddUser" element = {<AddUser/>}/>
      </Routes>
      <Footer />
    </BrowserRouter>
    </>
  );

};
export default App;