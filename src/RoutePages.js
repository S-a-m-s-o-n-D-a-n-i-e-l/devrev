import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Main";
import Signup from "./Signup";
import Login from "./Login";
import Admin from "./Admin";

function RoutePages()
{
    return(<Routes>
        <Route exact path="/" element={<Header/>}></Route>
        <Route exact path="/login" element={<Login/>}></Route>
        <Route exact path="/signup" element={<Signup/>}></Route>
        <Route exact path="/admin" element={<Admin/>}></Route>
    </Routes>);
}
export default RoutePages;