

// This will seperate concerns so we don't store everything within our components
export default {
    // To login with our form
    login : user => {
        return fetch("/user/login", {
            method : "post",
            body : JSON.stringify(user),
            headers : {
                "Content-Type" : "application/json"
            }
        })
        .then(res => {
            if(res.status !== 401) {
                return res.json().then(data => data);
            }
            else {
                // passport is sending a 401 code
                return {isAuthenticated : false, user : {username : "" , role : ""}};
            }
        })
    },
    register : user => {
        return fetch("/user/register", {
            method : "post",
            body : JSON.stringify(user),
            headers : {
                "Content-Type" : "application/json"
            }
        })
        .then(res => {
            res.json()
        })
        .then(data => data);
    },
    logout : user => {
        return fetch("/user/logout")
        .then(res => {
            res.json()
        })
        .then(data => data);
    },
    // persist authentication, set a state within our app react letting the client know that our user has been authenticated
    // This will sync both back and front ends
    isAuthenticated : () => {
        return fetch("/user/authenticated")
            .then(res => {
                
                // Means that this is a response we wrote ourselves
                // passport actually sends a 401
                if(res.status !== 401) {
                    return res.json().then(data => data);
                }
                else {
                    // passport is sending a 401 code
                    return {isAuthenticated : false, user : {username : "" , role : ""}};
                }
                

            })
    }


}