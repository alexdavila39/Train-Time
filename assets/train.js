
  // Initialize Firebase
var config = {
        apiKey: "AIzaSyANgekwXCR8MrqwcJC1VkVl-vVBP30rUhU",
        authDomain: "train-time-348e2.firebaseapp.com",
        databaseURL: "https://train-time-348e2.firebaseio.com",
        projectId: "train-time-348e2",
        storageBucket: "",
        messagingSenderId: "659450042912"
  };
  firebase.initializeApp(config);
  
var database = firebase.database();

// var name = "";
// var destination = "";
// var frequency = "";
// var firstTrain = "";


$("#addTrainBtn").on("click", function(event){
    event.preventDefault();


     trainName = $("#trainInput").val().trim();
     destination = $("#destinationInput").val().trim();
     firstTrain = moment($("#firstTrainInput").val().trim(), "HH:mm").subtract(10, "years").format("x");
     frequency = $("#frequencyInput").val().trim();
     
     database.ref().push({

    
        traiName: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
    }); 
   

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
})
  

 