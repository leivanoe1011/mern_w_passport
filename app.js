const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const PORT = 5000;

const app = express();
app.use(cookieParser());
app.use(express.json()); // Client will be sending json to the parser


mongoose.connect('mongodb://localhost/mern_w_passport', {useNewUrlParser: true, useUnifiedTopology: true }, ()=>{
    console.log("Successfully connected to Database");
});


const userRouter = require("./routes/User");

app.use("/user",userRouter);




app.listen(PORT, ()=>{
    console.log(`Express server listening to PORT : ${PORT}`);
});



// Temporary user

// const User = require("./models/User");
// const userInput = {
//     username : "noobcoder1234",
//     password: "1234567",
//     role : "admin"
// }

// create Mongoose Doc
// const user = new User(userInput);
// user.save((err, document)=>{
//     if(err) console.log(err);

//     console.log(document);
// })






