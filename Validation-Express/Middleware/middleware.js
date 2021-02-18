const express = require("express");
const app = express();
const port = 5999;


// custom middleware
function middleware1(req, res, next) {
    console.log(" I am at middleware1");
    // var a = 1;
    // if (a == 1) {
    //     next()
    // } else {
    //     return res.send("not verify")
    // }
    req.name = "dimple" // can add any property in an object req i.e request
    next();
}

function middleware2(req, res, next) {
    console.log(" I am at middleware2");
    console.log(req.name);
    req.name = "dia"
    next();
}


// app.get("/home", middleware1, middleware2, (req, res) => {
//     res.send("Hiii");
//     console.log("I am at home");
// })             
// ans=     //I am at middleware1
//I am at middleware2
//I am at home

//OR
// app.get("/home", middleware2, middleware1, (req, res) => {
//     res.send("Hiii");
//     console.log("I am at home");
// })
// // ans=I am at middleware2  ( it calls in sequence given in line 24)
// //  I am at middleware1
// //  I am at home

// app.get("/user", middleware1, (req, res) => {
//     res.send("Hiii");
//     console.log("I am at user");
// })
// //ans = I am at middleware1
// //I am at user

// app.get("/data", (req, res) => {
//     res.send("Hiii");
//     console.log("I am at user");
// })

app.use(middleware1); //to use middleware globally
//app.use(middleware2); //to use middleware globally

app.get("/home", middleware2, (req, res) => {
    res.send("Hiii");
    console.log("I am at home");
    console.log(req.name);

})

// ans = I am at middleware1
//  I am at middleware2
// dimple
// I am at home
// dia

app.get("/user", middleware2, (req, res) => {
    res.send("Hiii");
    console.log("I am at user");
})

app.get("/data", (req, res) => {
    res.send("Hiii");
    console.log("I am at data");
})

//Inbuild middlewares
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(express.json())


app.listen(port, (req, res) => {
    console.log(`listening to server at port no ${port}`)
})