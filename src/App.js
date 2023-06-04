import React from "react";
import RoutePages from "./RoutePages";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";  
import 'bootstrap/dist/css/bootstrap.min.css';


function App() { 
  return (
      <Router><RoutePages/></Router>
    );
}  
export default App;
