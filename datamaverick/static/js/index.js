
// Responsible for fetching and populating the drop down for makes of cars!
function addMakesOfCars(){
    var makesUrl = '/makes';
    var makeData;
    // load makes dropdown from Flask Route - '/makes'
    // Ajax call through d3.
    Plotly.d3.json(makesUrl,function(error,makeData){
    if (error) {
        return console.warn(error);
    };

        makeData[0].Makes.forEach(function(make) {
        Plotly.d3
            .select("#mark")
            .append('option')
            .attr('value', make)
            .text(make)
        });
    });
}

// Responsible for fetching and populating the drop down for years of cars!
function addYears(){

    var yearsUrl = '/years';
    var yearData;

    // load year dropdown from Flask Route - '/years'
    Plotly.d3.json(yearsUrl,function(error,yearData){
    if (error) {
        return console.warn(error);
    };

        yearData[0].Years.forEach(function(year) {
        Plotly.d3
            .select("#year_model")
            .append('option')
            .attr('value', year)
            .text(year)
        });
    });
}

// Responsible for validating user inputs!
function validateForm() {
    var mileage = document.forms["form_pred"]["mileage"].value;

    var message = "";
    if ( !isNaN(mileage) && mileage > 0 && mileage <400000)
    {
        return true;
    }
    else if (isNaN(mileage)) {
        
        message = 'Please enter numeric data only in the mileage field.';
        // Display the sweet alert!
        swal({
            type: 'error',
            title: message ,
            text: 'Format error!' //,
            // footer: '<a href>Why do I have this issue?</a>'
          });
        return false;
    }
    else
    {
        message = 'Please enter data in the range of 0 - 400,000 only';
        // Display the sweet alert!
        swal({
            type: 'error',
            title: message,
            text: 'Incorrect range!' //,
            // footer: '<a href>Why do I have this issue?</a>'
          });

          TextToSpeech(message);
          
        return false;
    }
}




// Commented for the time being.
// function plotTopCitiesWithUsedCarsInventories()
// {
//     console.log('Inventories');
  
//     var userSelectionUrl = `/attributeSelection/${userSelection}`;
//     var res = userSelectionUrl.split("empty");
//     if (res.length != 5){
//     Plotly.d3.json(userSelectionUrl, function(error, response){ // ajax call

//        console.log(response); 
//         if (error) {
//           return console.log(error);
//         }
 
//     if (response !=undefined && response.length > 0 ) { // Null check
//         console.log(response);
    
//         var container = L.DomUtil.get('map');
//         // Need to null the exiting map before reploting it
//         if(container != null){
//          container._leaflet_id = null;
//         }
        
//     var myMap = L.map("map", {
//         center: [parseFloat(response[0].Latitude), parseFloat(response[0].Longitude)],
//     zoom: 6
//     });

//     console.log(myMap);

//     // Add a tile layer
//     L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
//     attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//     maxZoom: 6,
//     id: "mapbox.streets",
//     accessToken:"pk.eyJ1Ijoic3NhdHBhdGh5IiwiYSI6ImNqbGVjb2I2NzBrbmIzcXBtMDdsOHp5aDcifQ.HCxHkdXAzE7YAK_FCbdUXQ"
//     // accessToken: "pk.eyJ1Ijoia3VsaW5pIiwiYSI6ImNpeWN6bjJ0NjAwcGYzMnJzOWdoNXNqbnEifQ.jEzGgLAwQnZCv9rA6UTfxQ"
//     }).addTo(myMap);

//     // // An array containing each city's name, location, and population
//     var cities = [{
//                     location: [parseFloat(response[0].Latitude),parseFloat(response[0].Longitude)],
//                     name: response[0].CountyName,
//                     population: response[0].Population
//                 },
//                 {
//                     location: [parseFloat(response[1].Latitude),parseFloat(response[1].Longitude)],
//                     name: response[1].CountyName,
//                     population: response[1].Population
//                 },
//                 {
//                     location: [parseFloat(response[2].Latitude),parseFloat(response[2].Longitude)],
//                     name: response[2].CountyName,
//                     population: response[2].Population
//                 }
//             ];


//     // Loop through the cities array and create one marker for each city, bind a popup containing its name and population add it to the map
//     for (var i = 0; i < cities.length; i++) {
//     var city = cities[i];
//     //  alert("<h1>" + city.name + "</h1> <hr> <h3>Population " + city.population + "</h3>" + city.location[0] + city.location[1]);
//     L.marker(city.location)
//         .bindPopup("<h1>" + city.name + "</h1> <hr> <h3>Population " + city.population + "</h3>")
//         .addTo(myMap);
//         }
//     }
//     })
// }
// else {
//     alert("Please select atleast one attribute!");
// }




// }

function makePrediction() {
    // get a button whose id is 'predict'
    $("button#predict").click(function(e){
        e.preventDefault();

        // Prevent errors in the inputs
        if (validateForm()) {
            // Ajax call through jQuery.
            $.ajax({
                method : "POST",
                url : window.location.href + 'api',
                data : $('form').serialize(),
                success : function(result){
                    var json_result = JSON.parse(result);
                    var price = json_result['Price'];
                
                    var text = "";
                    var message ="";
                    if (price !=-1)
                        {
                            message = 'Estimated price is: $'+price.toLocaleString();
                            // Display the sweet alert!
                            swal({
                                type: 'success',
                                title: message,
                            });
                        }
                    else
                        {
                            message = 'We are currently not supporting the make that you have requested in our inventory.';
                            // Display the sweet alert!
                            swal({
                                type: 'error',
                                title: message,
                            });
                        }
                     // Notify voice message to the user!   
                     TextToSpeech(message);   
                },
                error : function(){
                    console.log("error")
                }
            })
        }
    })
}


function TextToSpeech(text) {
    speechSynthesis.speak(
        new SpeechSynthesisUtterance(text)
      );
}

