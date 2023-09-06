if (sessionStorage.getItem("distance") == null) {
    if (localStorage.getItem("how") == null) {
        localStorage.setItem("how", "true");
        $("#howTo").show();
    } else {
        $("#form").show();
    }
} else {
    $("#main").show();

    let item = document.querySelector("#item");
    let ftSec = 0;
    let ftHour = 0;
    let mph = 0;
    let startTime = 0;
    let stopTime = 0;
    let elapsedTime = 0;
    var arr = [];
    
    item.addEventListener("touchstart", pressingDown, false);
    item.addEventListener("touchend", notPressingDown, false);
    
    
    function initDisplay() {
        $("#speed").sevenSeg({
            digits: 3, 
            value: 0, 
            decimalPlaces: 0,
            colorOff: "#080808", 
            colorOn: "White", 
        });
        document.getElementById("avg").innerHTML = "Average Speed: -- ";
        if (sessionStorage.getItem("distance") == "46") {
            $("#dis").html("Pitching distance: 46 ft");
        } else if (sessionStorage.getItem("distance") == "50") {
            $("#dis").html("Pitching distance: 50 ft");
        } else if (sessionStorage.getItem("distance") == "60.5") {
            $("#dis").html("Pitching distance: 60.5 ft");
        } else {
            var custDist = sessionStorage.getItem("distance");
            $("#dis").html("Pitching distance: " + custDist + " ft");
        }
    }   

    function pressingDown(e) {
      e.preventDefault();
      buzz();
      resetDisplay();
      startTime = Date.now();
    }

    function notPressingDown(e) {
          buzzKill();
          const canVibrate2 = window.navigator.vibrate
          if (canVibrate2) window.navigator.vibrate(0)
          stopTime = Date.now();
          elapsedTime = (stopTime - startTime) / 1000;
          console.log(elapsedTime)
          if (elapsedTime < 0.1) {
            console.log("To Quick");
          } else {
            mph = ((parseInt(sessionStorage.getItem("distance")) / elapsedTime) * 3600) / 5280;
            mph = mph.toFixed(0)  
            arr.push(parseInt(mph));
            let average = array => array.reduce((a, b) => a + b) / array.length;
            let myAvg = average(arr)
            document.getElementById("avg").innerHTML = "Average Speed: " + myAvg.toFixed(0) + " mph";
            $("#speed").sevenSeg({
                digits: 3, 
                decimalPlaces: 0,
                value: mph, 
                colorOff: "#080808", 
                colorOn: "White", 
            });
        }
    }
}

initDisplay();