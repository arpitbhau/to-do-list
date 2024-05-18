// JAI SHREE RAM

var express = require("express");
var fs = require("fs");
var app = express();

app.set("view engine" , "ejs");

app.use(express.static("./public"));

app.get("/" , function (req , res) {
    res.render("index");   
});


app.get("/form" , function (req , res) {
    
    
    let taskName = req.query.taskName;
    let taskDesc = req.query.taskDescription;
    
    
    try{
        fs.readFile("./views/index.ejs" , "utf8" , (err , data) => {
            if (err) res.send("Error Occured when reading file.")
            else {
                data = data.split("\n")
                
                let newdata = "";


                for (index = 0 ; index < data.length ; index++) {
        
                    let checker = data[index]
                    checker = checker.split("\r")
                    checker = checker[0]
        
                    if (`<!-- identifier -->`=== checker) {
                        console.log(`Mil Gaya. Index Hai : ${index}`);
                        newdata += `            <li class="list-item">\n
                <h3>${taskName}</h3>\n
                <p>${taskDesc}</p>\n
            </li>\n\n\n
<!-- identifier -->\n`;

                    }else{
                        newdata += data[index];
                    }
        
                }


                fs.writeFile("./views/index.ejs" , newdata , (err) => {
                    if (err) res.send("Bro Error when finally adding task to file.");
                });
            }
        
        
        });
        
    }catch{
        res.send("Bro Error when finally adding task to file.");
    }



    res.redirect("/formsubmitted");

});

app.get("/formsubmitted" , function (req , res) {
    res.redirect("/");
});

app.listen(3000);