
// we going to bring in the hook, since this is a functional component
import React from 'react';
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import {BrowserRouter as Router, Route} from "react-router-dom";


function App() {
  
  // exact will match the route exactly 
  return (
    <Router>
      <Navbar/>
      <Route exact path="/" component={Home} />
    </Router>
  );
}

export default App;
