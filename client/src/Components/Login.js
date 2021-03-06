

import React, {useState, useContext} from "react";
import AuthService from "../Services/AuthService";
import Message from "../Components/Message"; // Message from the server
import {AuthContext} from "../Context/AuthContext"; // Global State components


const Login = props => {
    const [user,setUser] = useState({username: "", password : ""});
    const [message, setMessage] = useState(null);
    const authContext = useContext(AuthContext);

    const onChange = (e) => {
        e.preventDefault();

        setUser({...user,[e.target.name] : e.target.value});
        console.log(user);
    }

    const onSubmit = e => {
        e.preventDefault();

        AuthService.login(user).then(data => {
            console.log(data);
            
            const {isAuthenticated, user, message} = data;

            if(isAuthenticated){
                authContext.setUser(user);
                authContext.setIsAuthenticated(isAuthenticated);

                // here we going to navigate to our todos page
                props.history.push("/todos");
            }
            else {
                setMessage(message);
            }
        })
    }
    return(
        <div>
            <form onSubmit={onSubmit}>
                <h3>Please Sign In</h3>
                <label htmlFor="username" className="sr-only">Username : </label>
                <input 
                    type="text" 
                    name="username" 
                    onChange={onChange} 
                    className="form-control" 
                    placeholder="Enter Username"/>

                <label htmlFor="password" className="sr-only">Password : </label>
                <input 
                    type="password" 
                    name="password" 
                    onChange={onChange} 
                    className="form-control" 
                    placeholder="Enter Password"/>

                <button 
                    className="btn btn-lg btn-primary btn-block" 
                    type="submit">Log In</button>


            </form>

            {/* In case we have a message to display */}
            {message ? <Message message={message}/> : null}

        </div>
    )
}



export default Login;


