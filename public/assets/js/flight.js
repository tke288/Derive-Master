$(document).ready(function(){
  $("#preloader").hide();
});

var From = "";
var To = "";
var departure_date = "";
var return_date = "";
var numbPeople = 0;



function runQuery() {

  var queryURL = "https://api.sandbox.amadeus.com/v1.2/flights/low-fare-search?apikey=lvioe6dpmfiwjvxLj7wXIzgtnwjjeJzx&origin=" + From + "&destination=" + To + "&departure_date=" + departure_date + "&return_date=" + return_date + "&adults=" + numbPeople + "&number_of_results=4";

  

  // The AJAX function uses the queryURL and GETS the JSON data associated with it.
  // The data then gets stored in the variable called: "Data"

  $.ajax({
    url: queryURL,
    method: "GET",
    dataType: 'json'
  }).done(function(Data) {

    // Logging the URL so we have access to it for troubleshooting
    console.log("------------------------------------");
    console.log("URL: " + queryURL);
    console.log("------------------------------------");

    console.log(moment('2014-08-20 15:30:00').format('MM/DD/YYYY h:mm a'));
    
    // Log the Data to console, where it will show up as an object
    console.log(Data);
    console.log("------------------------------------");
    $("#preloader").hide();
    $("h4").text("Per ticket:" + " " + "$" + Data.results["0"].fare.price_per_adult.total_fare);
    $("h4").append("<br><br>Airline:" + " " + Data.results["0"].itineraries["0"].outbound.flights["0"].marketing_airline);
    $("h4").append("<br><br>Departs:" + " " + moment(Data.results["0"].itineraries["0"].outbound.flights["0"].departs_at).format('h:mm a MM-DD-YYYY'));
    $("h4").append("<br>Arrives:" + " " + moment(Data.results["0"].itineraries["0"].outbound.flights["0"].arrives_at).format('h:mm a MM-DD-YYYY'));
    $("h4").append("<br><br>Departs:" + " " + moment(Data.results["0"].itineraries["0"].inbound.flights["0"].departs_at).format('h:mm a MM-DD-YYYY'));
    $("h4").append("<br>Arrives:" + " " +  moment(Data.results["0"].itineraries["0"].inbound.flights["0"].arrives_at).format('h:mm a MM-DD-YYYY'));
    $("h4").append("<br><br>Seats Remaining:" + " " + Data.results["0"].itineraries["0"].inbound.flights["0"].booking_info.seats_remaining);
    $("h4").append("<br><br> Total Cost" + " " + "$" + Data.results["0"].fare.total_price);
    $("h5").append("Per ticket:" + " " + "$" + Data.results["1"].fare.price_per_adult.total_fare);
    $("h5").append("<br><br>Airline:" + " " + Data.results["1"].itineraries["0"].outbound.flights["0"].marketing_airline);
    $("h5").append("<br><br>Departs:" + " " + moment(Data.results["1"].itineraries["0"].outbound.flights["0"].departs_at).format('h:mm a MM-DD-YYYY'));
    $("h5").append("<br>Arrives:" + " " +  moment(Data.results["1"].itineraries["0"].outbound.flights["0"].arrives_at).format('h:mm a MM-DD-YYYY'));
    $("h5").append("<br><br>Departs:" + " " + moment(Data.results["1"].itineraries["0"].inbound.flights["0"].departs_at).format('h:mm a MM-DD-YYYY'));
    $("h5").append("<br>Arrives:" + " " +  moment(Data.results["1"].itineraries["0"].inbound.flights["0"].arrives_at).format('h:mm a MM-DD-YYYY'));
    $("h5").append("<br><br>Seats Remaining:" + " " + Data.results["1"].itineraries["0"].inbound.flights["0"].booking_info.seats_remaining);
    $("h5").append("<br><br> Total Cost" + " " + "$" + Data.results["1"].fare.total_price);
    $("h6").append("Per ticket:" + " " + "$" + Data.results["2"].fare.price_per_adult.total_fare);
    $("h6").append("<br><br>Airline:" + " " + Data.results["2"].itineraries["0"].outbound.flights["0"].marketing_airline);
    $("h6").append("<br><br>Departs:" + " " + moment(Data.results["2"].itineraries["0"].outbound.flights["0"].departs_at).format('h:mm a MM-DD-YYYY'));
    $("h6").append("<br>Arrives:" + " " +  moment(Data.results["2"].itineraries["0"].outbound.flights["0"].arrives_at).format('h:mm a MM-DD-YYYY'));
    $("h6").append("<br><br>Departs:" + " " + moment(Data.results["2"].itineraries["0"].inbound.flights["0"].departs_at).format('h:mm a MM-DD-YYYY'));
    $("h6").append("<br>Arrives:" + " " +  moment(Data.results["2"].itineraries["0"].inbound.flights["0"].arrives_at).format('h:mm a MM-DD-YYYY'));
    $("h6").append("<br><br>Seats Remaining:" + " " + Data.results["2"].itineraries["0"].inbound.flights["0"].booking_info.seats_remaining);
    $("h6").append("<br><br> Total Cost" + " " + "$" + Data.results["2"].fare.total_price);
    $("h3").append("Per ticket:" + " " + "$" + Data.results["3"].fare.price_per_adult.total_fare);
    $("h3").append("<br><br>Airline:" + " " + Data.results["3"].itineraries["0"].outbound.flights["0"].marketing_airline);
    $("h3").append("<br><br>Departs:" + " " + moment(Data.results["3"].itineraries["0"].outbound.flights["0"].departs_at).format('h:mm a MM-DD-YYYY'));
    $("h3").append("<br>Arrives:" + " " +  moment(Data.results["3"].itineraries["0"].outbound.flights["0"].arrives_at).format('h:mm a MM-DD-YYYY'));
    $("h3").append("<br><br>Departs:" + " " + moment(Data.results["3"].itineraries["0"].inbound.flights["0"].departs_at).format('h:mm a MM-DD-YYYY'));
    $("h3").append("<br>Arrives:" + " " +  moment(Data.results["3"].itineraries["0"].inbound.flights["0"].arrives_at).format('h:mm a MM-DD-YYYY'));
    $("h3").append("<br><br>Seats Remaining:" + " " + Data.results["3"].itineraries["0"].inbound.flights["0"].booking_info.seats_remaining);
    $("h3").append("<br><br> Total Cost" + " " + "$" + Data.results["3"].fare.total_price);
    

  });

}

$("#run-search").on("click", function(event) {

  event.preventDefault();

  $("h3").empty();
  $("h4").empty();
  $("h5").empty();
  $("h6").empty();

  $("#preloader").show();

  From = $("#from").val();
  To = $("#to").val();
  departure_date = $("#departure_date").val();
  return_date = $("#return_date").val();
  numbPeople = $("#number_of_people").val();

  
  runQuery();
});

