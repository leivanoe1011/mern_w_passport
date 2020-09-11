
// we going to bring in the hook, since this is a functional component
import React,{useContext} from 'react';
import {AuthContext} from "./Context/AuthContext";


function App() {
  
  // The useContext function is coming from the AuthContext
  const {user, setUser, isAuthenticated, setIsAuthenticated} = useContext(AuthContext);

  console.log(user);
  console.log(isAuthenticated);

  return (
    <p>Place holder</p>
  );
}

export default App;
