import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Main";
import Signup from "./Signup";
import Login from "./Login";
import Admin from "./Admin";
import Adminborrowed from "./adminborrowed";
import Userborrowed from "./userborrwed";
import Checkout from "./Checkoutpage";

function RoutePages()
{
    return(<Routes>
        <Route exact path="/checkout" element={<Checkout/>}></Route>
        <Route exact path="/userborrowedbooks" element={<Userborrowed/>}></Route>
        <Route exact path="/adminborrowedbooks" element={<Adminborrowed/>}></Route>
        <Route exact path="/" element={<Header/>}></Route>
        <Route exact path="/login" element={<Login/>}></Route>
        <Route exact path="/signup" element={<Signup/>}></Route>
        <Route exact path="/admin" element={<Admin/>}></Route>
    </Routes>);
}
export default RoutePages;