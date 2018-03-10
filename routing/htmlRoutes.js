var express = require("express");
var path = require("path");

var app = express();

function showPage(app, __dirname) {
    app.get("/", function (req, res) {
        res.sendFile(path.join(__dirname, "/app/public/index.html"));
    });

    app.get("/survey", function (req, res) {
        res.sendFile(path.join(__dirname, "/app/public/survey.html"))
         });
    
    // app.get("/public/javascript/survey", function(req, res){
    //         res.sendFile(path.join(__dirname, "/app/public/javascript/survey.js"))
    //     })
         

}

module.exports = showPage;