const express = require("express");
const path = require("path");

const app = express();

var userAnswers = [];

function apiStuff(app, __dirname) {
    const vacations = require("../data/vacations.js");
    // Show all matches in the arrary
    app.get("/api/vacations", function (req, res) {
        res.json(vacations);
    });

    //  do logic after user submits form to determine best match
    app.post("/api/new", function (req, res) {

        var toBeat = 50;
        var bestMatch = "";
        var bestImg = "";
        var yourVacation = [];

        // take user inputs and shove them into an array
        var formData = req.body;
        userAnswers.push(formData);

        // // run through the vacations array
        for (i = 0; i < vacations.length; i++) {
            var differenceArr = [];

            for (s = 0; s < vacations[i].answers.length; s++) {
                var diff = 0;
                diffval = Math.abs(formData["answers[]"][s] - vacations[i].answers[s]);
                differenceArr.push(diffval);
            }
            for (d = 0; d < differenceArr.length; d++) {
                diff += differenceArr[d];
            }
            // determine if this friend is better than the current lowest score
            if (diff < toBeat) {
                toBeat = diff;
                bestMatch = vacations[i].name;
                bestImg = vacations[i].photo;
            }
        }
        yourVacation.push(bestMatch);
        yourVacation.push(bestImg);
        yourVacation.push(formData.name);
        yourVacation.push(formData.image);
        res.json(yourVacation);
    });
}

module.exports = apiStuff;