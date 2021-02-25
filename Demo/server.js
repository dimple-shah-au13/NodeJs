const express = require("express");
const app = express();
const ejs = require("ejs");
const InitDB = require("./config/dbconfig");
const path = require("path")
const bodyParser = require('body-parser');
const {
    check,
    validationResult
} = require("express-validator")

const port = 5959;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
const userModel = require("./model/registrationSchema")

InitDB();

//app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/signup", function (req, res) {
    res.render("signup")
    //res.render("signup")
});

// app.post("/signup", async function (req, res) {

//     const userName = req.body.user;
//     const pass = req.body.psw;
//     const email = req.body.email;
//     const mob = req.body.mb;

//     var userDetails = new userModel({ //this we created to give entry to collections to keep adding data.
//         username: userName, // left username is schema name & right username is post name object above.
//         password: pass,
//         email: email,
//         mobile: mob

//     })
//     await userDetails.save();
//     res.redirect("/login")
//     //res.render("signup")
// });


//********to check if data already exists */
// app.post("/signup", async function (req, res) {

//     const userName = req.body.user;
//     const pass = req.body.psw;
//     const email = req.body.email;
//     const mob = req.body.mb;

//     const data = await userModel.find({
//         email: req.body.email
//     }) // left email taken from userSchema in registrationSchema.js & right email from post object.
//     if (data.length == 1) {
//         res.render("signup") // if data(email) already exists in collections it will not take new data & remain in signup page
//     } else {
//         var userDetails = new userModel({ //this we created to give entry to collections to keep adding data.
//             username: userName, // left username is schema name & right username is post name object above.
//             password: pass,
//             email: email,
//             mobile: mob

//         })
//         await userDetails.save()
//         res.redirect("/login")
//     }
// })



//**********using self created middleware */

// app.post("/signup", middleware, async function (req, res) {

//     const userName = req.body.user;
//     const pass = req.body.psw;
//     const email = req.body.email;
//     const mob = req.body.mb;

//     const data = await userModel.find({
//         email: req.body.email
//     }) // left email taken from userSchema in registrationSchema.js & right email from post object.
//     if (data.length == 1) {
//         res.render("signup") // if data(email) already exists in collections it will not take new data & remain in signup page
//     } else {
//         var userDetails = new userModel({ //this we created to give entry to collections to keep adding data.
//             username: userName, // left username is schema name & right username is post name object above.
//             password: pass,
//             email: email,
//             mobile: mob

//         })
//         await userDetails.save()
//         res.redirect("/login")
//     }
// })


//using own middleware
function middleware(req, res, next) {
    console.log(req.body.psw);
    console.log(req.body.user);
    console.log(req.body.mb);
    if (req.body.mb.length == 10 && req.body.user.length >= 5) {

        next()
    } else {
        console.log("hiii")
        res.render("signup")
    }
}

// **************using inbuild middleware also....
app.post("/signup", middleware, check("email").isEmail(), async function (req, res) {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // return res.status(400).json({
        //     errors: errors.array()
        // });
        // console.log("hello")
        res.render("signup");
    } else {
        const userName = req.body.user;
        const pass = req.body.psw;
        const email = req.body.email;
        const mob = req.body.mb;

        const data = await userModel.find({
            email: req.body.email
        }) // left email taken from userSchema in registrationSchema.js & right email from post object.
        if (data.length == 1) {

            //console.log("byeee")
            res.render("signup") // if data(email) already exists in collections it will not take new data & remain in signup page
        } else {

            var userDetails = new userModel({ //this we created to give entry to collections to keep adding data.
                username: userName, // left username is schema name & right username is post name object above.
                password: pass,
                email: email,
                mobile: mob,

            })
            await userDetails.save()
            res.redirect("/login")
        }

    }

})





app.get("/login", function (req, res) {
    res.render("signin")
});

// app.post("/login", async function (req, res) {
//     const email = req.body.email;
//     const password = req.body.psw;
//     const data = await userModel.find({
//         email: email // left email taken from userSchema in registrationSchema.js & right email from post object.
//     })
//     //userModel.find({email:req.body.email})  //other way of writing
//     //console.log(email, pass)
//     console.log(data); // will access full data of one person login
//     console.log("hello")
//     //console.log(data.password) // that persons password undefined
//     console.log(data[0].password) // that persons password 123546
//     res.redirect("dashboard")
// });

app.post("/login", async function (req, res) {
    const email = req.body.email;
    const password = req.body.psw;
    const data = await userModel.findOne({
        email: email // left email taken from userSchema in registrationSchema.js & right email from post object.
    })
    console.log(data.password)
    //userModel.find({email:req.body.email})  //other way of writing
    //console.log(email, pass)
    if (req.body.psw == data.password) {

        res.redirect("/dashboard")

    } else {
        res.render("signin")
    }

});


// app.get("/dashboard", function (req, res) {
//     //res.redirect("login")
//     res.send("m in dashboard")
// });

app.get("/users/:username", async function (req, res) {
    //res.redirect("login")
    const data = await userModel.find({
        username: req.params.username
    })
    //console.log("abd")
    res.json(data)
});


app.listen(port, function (req, res) {
    console.log(`server is running at ${port}`)
})