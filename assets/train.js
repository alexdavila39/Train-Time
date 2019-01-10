
var config = {
    apiKey: "AIzaSyDhhRoI4PVerxqzO_bN6Uo8NjexPmoiGl4",
    authDomain: "train-scheduler-2ea1e.firebaseapp.com",
    databaseURL: "https://train-scheduler-2ea1e.firebaseio.com",
    projectId: "train-scheduler-2ea1e",
    storageBucket: "train-scheduler-2ea1e.appspot.com",
    messagingSenderId: "924038540801"
  };
  firebase.initializeApp(config);
  
var database = firebase.database();

$("#addTrainBtn").on("click", function(){
    var trainName = $("#trainNameInput").val().trim();
    var destination = $("#destinationInput").val().trim();
    var firstTrain = moment($("#firstTrainInput").val().trim(), "HH:mm").subtract(10, "years").format("x");
    var frequency = $("#frequencyInput").val().trim();
    

    var newTrain ={
        name: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
    };

    database.ref().push(newTrain);

    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("#firstTrainInput").val("");
    $("#frequencyInput").val("");

    return false;
})

database.ref().on("value", function(snapshot){
    var name = snapshot.val().name;
    var destination = snapshot.val().destination;
    var frequency = snapshot.val().frequency;
    var firstTrain = snapshot.val().firstTrain;

    var remainder = moment().diff(moment.unix(firstTrain),"minutes")%frequency;
    var minutes = frequency - remainder;
    var arrival = moment().add(minutes,"m").format("hh:mm A");

    console.log(remainder);
    console.log(minutes);
    console.log(arrival);
})
  

 