var config = {

    apiKey: "AIzaSyA8AlgS_XkOB8clCmK6SWyHr9-4j393UOQ",

    authDomain: "test-app-edc64.firebaseapp.com",

    databaseURL: "https://test-app-edc64.firebaseio.com",

    projectId: "test-app-edc64",

    storageBucket: "test-app-edc64.appspot.com",

    messagingSenderId: "746317737743"

};

firebase.initializeApp(config);



var database = firebase.database();

console.log(database)



var name = "";

var dest = "";

var firstTrain = "";

var freq = "";



function validateMyForm() {

    if (name == "" || dest == "" || firstTrain == "" || freq == "") {

        alert("Please input values in the form fields!");

        return false;

    }





    return true;

}



function update() {
  $('#clock').text(moment().format('MMMM DD YYYY H:mm:ss'));
}

setInterval(update, 1000);


$("#go").on("click", function (e) {







    e.preventDefault();



    name = $("#name").val().trim();

    dest = $("#dest").val().trim();

    firstTrain = $("#firstTrain").val().trim();

    freq = $("#freq").val().trim();



    //if(moment(firstTrain).format("day") != moment().format("day")){



    //console.log(THIS WORKS!!!!);



    //console.log(moment().format("DDD")); 



    //};



    if (validateMyForm() == true) {



        database.ref().push({



            name: name,

            destination: dest,

            firstTrain: firstTrain,

            frequency: freq,

            dateAdded: firebase.database.ServerValue.TIMESTAMP

        });

        location.reload();

    }

});


function calcTime(e) {



    var currentTime = moment().format("LT");



    var beginTrain = e.val().firstTrain;



    var minutesAwayFromFirstTrain = moment().diff(moment(beginTrain, "HH:HH"), "minutes");



    var minutesAway = (e.val().frequency - (minutesAwayFromFirstTrain % e.val().frequency));



    var nextArrival = moment().add(minutesAway, "minutes").format("h:mma");



    console.log("Current Time: " + currentTime);



    console.log("First Train: " + beginTrain);



    console.log("Minutes Away From First Train " + minutesAwayFromFirstTrain);



    console.log("Minutes Away: " + (minutesAway));



    console.log("Next Arrival: " + nextArrival + "\n _________________________________________");


    var htmlAppend = "<tr><td>";

    var htmlAppend2 = "</td><td>";

    var htmlAppend3 = "</td></tr>";

    var htmlAppend4 = htmlAppend + e.val().name + htmlAppend2 +

        e.val().destination + htmlAppend2 + e.val().frequency + htmlAppend2 +

        nextArrival + htmlAppend2 + minutesAway + htmlAppend2 + htmlAppend3;



    $("#displayTrain").append(htmlAppend4);

};

database.ref().on("child_added", function(childSnapshot){

    console.log(childSnapshot);

    calcTime(childSnapshot);

}, function(errorObject) {

    console.log("Errors handled: " + errorObject.code)

});








