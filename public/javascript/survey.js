$(document).ready(function(){
    var count = 0;
    var answers = [];
    
    
    $("#startSurvey").on("click" , function(event){
        event.preventDefault();
        console.log("hello")
    pleasureQuestions();
    })	
    
    var pleasureSurvey = [
        {  q: "What does your ideal vacation entail?", 
            a1: "relaxation", 
            a2: "excitment", 
            a3: "culture", 
           },
        {	q: "What kind of weather do you like?", 
            a1: "cold",
            a2: "warm", 
            a3: "hot", 
            },
        {	q: "What is your age range?", 
            a1: "19-29",
            a2: "29-49", 
            a3: "49+", 
            },
                    ];
    
    function pleasureQuestions(){
        if (count < pleasureSurvey.length) {
        $("#question").html($("<p>").text(pleasureSurvey[count].q));
        $("#button1").html($("<button>").addClass("pbutton1").text(pleasureSurvey[count].a1));
        $("#button2").html($("<button>").addClass("pbutton2").text(pleasureSurvey[count].a2));
        $("#button3").html($("<button>").addClass("pbutton3").text(pleasureSurvey[count].a3));
        $("body").on("click", ".pbutton1", function(event){
            event.preventDefault();
            answers.push("1")
            console.log(answers)
            count ++;
            $("body").unbind('click');
            pleasureQuestions();
        })
    
        $("body").on("click", ".pbutton2", function(event){
            event.preventDefault();
            answers.push("2")
            console.log(answers)
            count ++;
            $("body").unbind('click');
            pleasureQuestions();
        })
    
        $("body").on("click", ".pbutton3", function(event){
            event.preventDefault();
            answers.push("3")
            console.log(answers)
            count ++;
            $("body").unbind('click');
            pleasureQuestions();
        })
    }
    }
    });