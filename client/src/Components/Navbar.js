

import React, {useContext} from "react";
import {Link} from "react-router-dom"; // This replaces "a" html tags
import AuthService from "../Services/AuthService";
import {AuthContext} from "../Context/AuthContext";


// we are going to be using functional components
const Navbar = props => {

    // Pulling the global states for persistent login
    // When is not a function need to make sure to use Curly Brackets " { } "
    const {user, setUser, isAuthenticated, setIsAuthenticated}  = useContext(AuthContext);


    const onClickLogoutHandler = () => {
        AuthService.logout().then(data => {
            
            // Here we're resetting the user
            if(data.success){
                setUser(data.user);
                setIsAuthenticated(false);
            }
        });
    }


    const unauthenticatedNavBar = () => {
        // we going to use a react fragment
        return (
            <>
                <Link to="/">
                    <li className="nav-item nav-link">Home</li>
                </Link>
                <Link to="/login">
                    <li className="nav-item nav-link">Login</li>
                </Link>
                <Link to="/register">
                    <li className="nav-item nav-link">Register</li>
                </Link>
            </>
        )
    }


    const authenticatedNavBar = () => {
        // we going to use a react fragment
        return (
            <>
                <Link to="/">
                    <li className="nav-item nav-link">Home</li>
                </Link>
                <Link to="/todos">
                    <li className="nav-item nav-link">Todos</li>
                </Link>

                {/* There are multiple roles. Only want to show the admin role the link below */}
                {
                    // The user below is coming from the Global State from Auth Context
                    user.role === "admin" ?
                    <Link to="/admin">
                        <li className="nav-item nav-link">Admin</li>
                    </Link>
                    : null
                }
                <button type="button" 
                    className="btn btn-link nav-item nav-link" 
                    onClick={onClickLogoutHandler}>Logout</button>
                
            </>
        )
    }


    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            
            {/* Home */}
            <Link to="/">
                <div className="navbar-brand">NoobCoder</div>
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav mr-auto">
                
                    {/* isAuthenticated is pulled from our global context */}
                    { !isAuthenticated ? unauthenticatedNavBar() : authenticatedNavBar() }

                </ul>

            </div>
        </nav>
    )

}

export default Navbar;

