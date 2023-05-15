
//----------------------------------------------------------------//
//import npm//

const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const date = require(__dirname + "/date.js");

console.log(date);

let newItems = ["Buy Grocery", "Cleaning ", "Laundry"];
let workItems = [];
//bodyParser for using post method //

app.use(bodyParser.urlencoded({ extended: true })); // necessary code

// apply css styles sheet to local host//

app.use(express.static("public"));

//----------------------------------------------------------------//
//setting up ejs//
app.set('view engine', 'ejs');


//----------------------------------------------------------------//
// test the browser if it work or not//

app.get("/", function(req, res) {
    let day = date.getDate();
    //res.send("Welcome");

    //test if today is weekend

    //create a variable the represent days
    
    //var weeks = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    //var day = "";
    // for (var i = 0; i < weeks.length; i++) {
    //     if(today.getDay() === i){
    //         day = weeks[i];
    //     }
    // }
    
    res.render("list", {listTitle: day, newListItem: newItems});
    
});

// posting the user input //

app.post("/", function(req, res) {
    console.log(req.body);
    let item = req.body.newItem;

    //if else statement where button has been clicked//
    

    if (req.body.list === "Work") {
        workItems.push(item);
        res.redirect("/work")
    } else {
        newItems.push(item);
        res.redirect("/");
    
    }
    console.log(workItems);
    console.log(newItems);
    console.log("Post received");
    //res.redirect("/"); // redirect and passing variable to app.get

});


app.get("/work", function (req, res) {
    res.render("list", {listTitle: "Work List", newListItem: workItems });
});

// about route

app.get("/about", function (req, res) {

    res.render("about");

});

// app.post("/work", function (req, res) {
//     let item = req.body.newItem;
//     workItems.push(item);
//     res.redirect("/work");
// });


//----------------------------------------------------------------//
// server on http://localhost//

app.listen(3000, function () {
    console.log("Server started on port 3000");
});