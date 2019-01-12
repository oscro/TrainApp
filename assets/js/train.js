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
  var role = "";
  var date = "";
  var rate = "";


$("#go").on("click", function(e){
    
    e.preventDefault();

     name = $("#name").val().trim();
     role = $("#role").val().trim();
     date = moment($("#date").val().trim(), "MM/DD/YYYY").format("X");
     rate = $("#rate").val().trim();

    database.ref().push({

    name: name,
    role: role,
    date: date,
    rate: rate,
    dateAdded: firebase.database.ServerValue.TIMESTAMP

    });


    
    
});

database.ref().on("child_added", function(childSnapshot){

    console.log(childSnapshot.val().name);
    console.log(childSnapshot.val().role);
    console.log(childSnapshot.val().date);
    console.log(childSnapshot.val().rate);

    var empStartPretty = moment.unix(date).format("MM/DD/YYYY");

    var empMonths = moment().diff(moment(date, "X"), "months");

    var empBilled = empMonths * rate; 

    $("#showMe").append("<tr><td>"
        + childSnapshot.val().name + "</td><td>"
        + childSnapshot.val().role + "</td><td>"
        + empStartPretty + "</td><td>"
        + childSnapshot.val().date + "</td><td>"

        + "" + "</td><td>"
        + childSnapshot.val().rate + "</td><td>"
        + empBilled + "</td><td>"
        + "" + "</td></tr>"
    );


}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });




