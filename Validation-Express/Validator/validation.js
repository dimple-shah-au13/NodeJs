const express = require("express");
const app = express();
const ejs = require("ejs");
const bodyParser = require("body-parser")
const {
    check,
    validationResult
} = require("express-validator");


app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(express.json())


const port = 5999;

// app.post("/home", function (req, res) {
//     res.send(req.body);
//     console.log(req.body); //{ name: 'dimple', email: 'dimple@gmail.com', password: '123456' }
//     console.log(req.body.email) //dimple@gmail.com
// })

// app.get("/home", check("dimple@gmail.com").isEmail(), function (req, res) {

//     const error = validationResult(req); //we r checking error which is stored in req and calling it . 
//     if (!error.isEmpty()) {
//         console.log("hello")
//         res.send(error.mapped()) // we use array when we hv to check multiple errors,here only email is there so no need of array.
//     } else {
//         res.send("Alright")
//     }


// })

app.set("view engine", "ejs");

// app.get("/home", function (req, res) {
//     res.render("E:/ShG-SELF PRACTISE-NODEJS EXPRESS/express-Nodejs/views/form.ejs") //render for sending html files
// })

// app.post("/data", function (req, res) {
//     console.log(req.body)
//     let name = req.body.fname
//     let email = req.body.ename
//     console.log(name, email)
//     //res.send("Hello")
//     res.redirect("/home")
// })


// app.post("/data", check("ename").isEmail(), function (req, res) {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         res.status(400).json({
//             errors: errors.array()
//         })
//     } else {
//         res.redirect('/home')
//     }
// })

app.get("/home", function (req, res) {
    res.render("E:/ShG-SELF PRACTISE-NODEJS EXPRESS/express-Nodejs/views/form.ejs", {
        // errors: ""
        errors: errors.array()
    }) //render for sending html files
})

app.post("/data", check("ename").isEmail(), check("fname").isLength({
    min: 5
}), function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // res.status(400).json({
        //     errors: errors.array()
        // })

        //console.log(errors.array()) // ans = in form of array =
        //   [{
        //     value: 'aaaaaaaaaaaddd',
        //     msg: 'Invalid value',
        //     param: 'ename',
        //     location: 'body'
        //   },
        //   {
        //     value: 'dia',
        //     msg: 'Invalid value',
        //     param: 'fname',
        //     location: 'body'
        //   }]

        //console.log(errors.mapped())  // ans= in form of object =
        //  {
        //     ename: {
        //       value: 'aaaaaaaaaaaddd',
        //       msg: 'Invalid value',
        //       param: 'ename',
        //       location: 'body'
        //     },
        //     fname: {
        //       value: 'dia',
        //       msg: 'Invalid value',
        //       param: 'fname',
        //       location: 'body'
        //     }
        //   }
        res.render("E:/ShG-SELF PRACTISE-NODEJS EXPRESS/express-Nodejs/views/form.ejs", {
            //errors: errors.array()
            errors: errors.mapped()
        })
    } else {
        res.redirect('/home')
    }
})


app.listen(port, (req, res) => {
    console.log(`listening to server at port no ${port}`)
})