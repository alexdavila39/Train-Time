
  // Initialize Firebase
var config = {
        apiKey: "AIzaSyANgekwXCR8MrqwcJC1VkVl-vVBP30rUhU",
        authDomain: "train-time-348e2.firebaseapp.com",
        databaseURL: "https://train-time-348e2.firebaseio.com",
        projectId: "train-time-348e2",
        storageBucket:  "train-time-348e2.appspot.com",
        messagingSenderId: "659450042912"
  };
  firebase.initializeApp(config);
  
var database = firebase.database();


$("#addTrainBtn").on("click", function(event){
    event.preventDefault();


     trainName = $("#trainInput").val().trim();
     destination = $("#destinationInput").val().trim();
     firstTrain = moment($("#firstTrainInput").val().trim(), "HH:mm").subtract(1, "years").format("x");
     frequency = $("#frequencyInput").val().trim();
     

    var newTrain= {
        name: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
    }

    database.ref().push(newTrain);
   

    $("#trainInput").val("");
    $("#destinationInput").val("");
    $("#firstTrainInput").val("");
    $("#frequencyInput").val("");

    return false;
})

database.ref().on("child_added", function(snapshot){
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

  
$("#trainTable > tBody").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + arrival + "</td><td>" + minutes  + "</td></tr>")


});

// $("#currentTime").html("Current Time: " + moment(currentTime).format("hh:mm"));