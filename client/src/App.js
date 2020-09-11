
// we going to bring in the hook, since this is a functional component
import React from 'react';
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Register from "./Components/Register";
import {BrowserRouter as Router, Route} from "react-router-dom";


function App() {
  
  // exact will match the route exactly 
  return (
    <Router>
      <Navbar/>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register}/>
    </Router>
  );
}

export default App;
