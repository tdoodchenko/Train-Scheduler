  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAArwNnGfJs-aBJyUmBYh1jQrlL7jI3bZ4",
    authDomain: "taylor-train-scheduler.firebaseapp.com",
    databaseURL: "https://taylor-train-scheduler.firebaseio.com",
    projectId: "taylor-train-scheduler",
    storageBucket: "",
    messagingSenderId: "127439110825"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  setInterval(function(startTime) {
      $("#timer").html(moment().format('hh:mm a'))
  }, 1000);
  console.log(moment());



  $('#add-button').on("click", function() {
      event.preventDefault();
      var train = $("#input-train").val().trim();
      var destination = $("#input-destination").val().trim();
      var stopFreq = $("#input-freq").val().trim();
      var stopTime = $("#input-stop").val().trim();
      var trainX = {
          formtrain: train,
          formdestination: destination,
          formfrequency: stopFreq,
          formstoptime: stopTime,
          dateAdded: firebase.database.ServerValue.TIMESTAMP     
  };
  
// console.log('Our train info object', trainX)



    console.log(trainX.formtrain);
    console.log(trainX.formdestination);
    console.log(trainX.formfrequency);
    console.log(trainX.formstoptime);
    console.log(trainX.dateAdded);

  $("#input-train").val("");
  $("#input-destination").val("");
  $("#input-freq").val("");
  $("#input-stop").val("");

  firebase.database().ref('trains').push(trainX);
//   fetchData()

  
    
});


// function fetchData() {
    database.ref('trains').on("child_added", function(childSnap){
        var train = childSnap.val().formtrain;
        var destination = childSnap.val().formdestination;
        var stopFreq = childSnap.val().formfrequency;
        var stopTime = childSnap.val().formstoptime;
        
        console.log("train name " + train);

        var convertTime = moment(stopTime, "hh:mm").subtract(1, "years");
        console.log(convertTime);
        var currentTime = moment();
        console.log("current time: " + moment(currentTime).format("hh:mm a"));
        $("#timer").text(currentTime.format("hh:mm a"));
        
       
        var timeDifference = moment().diff(moment(convertTime), "minutes");
        console.log("time difference: " + timeDifference);
        var remainingTime = timeDifference % stopFreq;
        console.log("Remaining time: " + remainingTime);    
        var nextTrainTime = stopFreq - remainingTime;
        console.log("time until next train: " + nextTrainTime);
        var nextTrain = moment().add(nextTrainTime, "minutes").format("hh:mm a");
        console.log("next train: " + nextTrain);
        
        $("#train-table > tbody").append("<tr><td>" + '<i class="fa fa-trash" id="trashcan" aria-hidden="true"></i>' + "</td><td>" + train + "</td><td>" + destination + "</td><td>" +
        stopFreq + "</td><td>" + nextTrain + "</td><td>" + nextTrainTime + "</td></tr>");
    
    });
// }

// fetchData();



// function updateTrain() {
//     $("#train-table").empty();

//     database.ref('trains').on("child_added", function(childSnap){
//         var train = childSnap.val().formtrain;
//         var destination = childSnap.val().formdestination;
//         var stopFreq = childSnap.val().formfrequency;
//         var stopTime = childSnap.val().formstoptime;
        
//         console.log("train name " + train);

//         var convertTime = moment(stopTime, "hh:mm").subtract(1, "years");
//         console.log(convertTime);
//         var currentTime = moment();
//         console.log("current time: " + moment(currentTime).format("hh:mm a"));
//         $("#timer").text(currentTime.format("hh:mm a"));
        
       
//         var timeDifference = moment().diff(moment(convertTime), "minutes");
//         console.log("time difference: " + timeDifference);
//         var remainingTime = timeDifference % stopFreq;
//         console.log("Remaining time: " + remainingTime);    
//         var nextTrainTime = stopFreq - remainingTime;
//         console.log("time until next train: " + nextTrainTime);
//         var nextTrain = moment().add(nextTrainTime, "minutes").format("hh:mm a");
//         console.log("next train: " + nextTrain);
        
//         $("#train-table > tbody").append("<tr><td>" + '<i class="fa fa-trash" id="trashcan" aria-hidden="true"></i>' + "</td><td>" + train + "</td><td>" + destination + "</td><td>" +
//         stopFreq + "</td><td>" + nextTrain + "</td><td>" + nextTrainTime + "</td></tr>");
    
//     });
//     };


// setInterval(updateTrain, 6000);