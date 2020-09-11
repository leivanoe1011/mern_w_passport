
const express = require("express");
const userRouter = express.Router();
const JWT = require("jsonwebtoken");
const passport = require("passport");
const passportConfig = require("../passport"); // passport file
const User = require("../models/User");
const Todo = require("../models/Todo");


const signToken = userID => {
    
    // this will return the token
    // we shouldn't send sensitive information here
    return JWT.sign({
        iss: "NoobCoder", // who sent it
        sub: userID// subject - who is it for
    }, "NoobCoder", {expiresIn : "50000"}); 
    // when you sign you're creating this jwt token, this has to match with the secret key in passport config file
    // 5000 milliseconds
}


userRouter.post("/register", (req, res) => {
    const {username, password, role} = req.body;

    // check if username exists
    User.findOne({username}, (err, user) => {
        if(err) {
            return res.status(500).json({message: {msgBody: "Error has occurred", msgError: true}});
        }

        // Username exists
        if(user){
            return res.status(400).json({message: {msgBody: "Username is already taken", msgError: true}});
        }
        else {
            const newUser = new User({username, password, role});
            newUser.save(err => {
                if(err) res.status(500).json({message: {msgBody: "Error has occurred", msgError: true}});
                else res.status(201).json({message: {msgBody: "Account successfully created", msgError: false}});
            })
        }
    })
})


// using our passport middleware
// server will not be saving the session so we have to set it to false
// local will render the following passport.use(new LocalStrategy
userRouter.post("/login", passport.authenticate("local", {session: false}), (req, res) => {
    
    // isAuthenticated a passport default function
    if(req.isAuthenticated()){
        
        // passport provides req.user
        // this comes back from user.comparePassword within the done function
        // the done function gets the callback from the user comparePassword function when returning "this"
        const {_id, username, role} = req.user;

        // create a jwt token
        const token = signToken(_id);
        
        // http only on the client you cannot touch this cookie using javascript preventing cross site scripting attacks
        // same site will prevent cross site forgery attacks
        res.cookie("access_token", token, {httpOnly : true, sameSite : true});

        // When the user signs in, they will get a JSON body below
        // true as isAuthenticated and the user information
        res.status(200).json({isAuthenticated : true, user : {username, role}});

    }
})


userRouter.get("/logout", passport.authenticate("jwt", {session : false}), (req, res) => {   

    // passport jwt will provide the clear cookie method
    res.clearCookie("access_token");

    // Below we are removing the username and role by loading an empty string to both properties
    res.json({user : {username : "", role : ""}, success : true});
});


userRouter.post("/todo", passport.authenticate("jwt", {session : false}), (req, res) => {
    
    const todo = new Todo(req.body);

    todo.save((err) => {
        if(err) {
            return res.status(500).json({message: {msgBody: "Error has occurred", msgError: true}});
        }
        else {
            // req.user is passed by mongoose
            req.user.todos.push(todo);

            req.user.save(err => {
                if(err) {
                    return res.status(500).json({message: {msgBody: "Error has occurred", msgError: true}});
                }
                else {
                    res.status(200).json({message: {msgBody : "Successfully created todo", msgError : false}});
                }
            })
        }
    })
})



userRouter.get("/todos", passport.authenticate("jwt", {session : false}), (req, res) => {
    
    User.findById({_id : req.user._id}).populate("todos").exec((err,document) => {
        // need to use error middleware
        if(err){
            return res.status(500).json({message: {msgBody: "Error has occurred", msgError: true}});
        }
        else {
            res.status(200).json({todos : document.todos, authenticate : true});
        }
    })
})



userRouter.get("/admin", passport.authenticate("jwt", {session : false}), (req, res) => {
    
    // Here jwt strategy will return the role
    if(req.user.role === "admin"){
        res.status(200).json({message : {msgBody : "You are an admin", msgError : false}});
    }
    else {
        return res.status(403).json({message: {msgBody: "You are not an admin, go away", msgError: true}});
    }
});


// Make sure the front end and back end are in sync
// If the browser is closed and re-opened we will make sure to show the user was authenticated
userRouter.get("/authenticated", passport.authenticate("jwt", {session : false}), (req, res) => {
    
    // Here jwt strategy will return the role
    const {username, role} = req.user;
    res.status(200).json({isAuthenticated : true, user : {username, role}});
});



module.exports = userRouter;


