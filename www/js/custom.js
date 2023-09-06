const canVibrate = window.navigator.vibrate;
let buzzer;

// iphone notch detection
if (cutout.has()) {
	// has notch
	console.log("has notch");
} else {
	alert("No Notch");
}


function customDistance() {
	var a = prompt("Enter Pitching Distance...");
	sessionStorage.setItem("distance", a);
}

  function buzz() {
	if (cordova.platformId === "ios") {
		// ios
	  	buzzer = setInterval(function() {
			TapticEngine.impact({
			  style: "heavy"			});
		}, 25);
	} else {
		// android
      	if (canVibrate) window.navigator.vibrate(3500);
    }
  }
  
  function buzzKill() {
  	if (cordova.platformId === "ios") {
  		clearInterval(buzzer);
  	} else {
  		if (canVibrate) window.navigator.vibrate(0);
  	}
  }

function resetDisplay() {
	$('#speed').sevenSeg("destroy");
    $("#speed").sevenSeg({
	    digits: 3, 
	    value: "---", 
	    decimalPlaces: 0,
	    colorOff: "#080808", 
	    colorOn: "White", 
	});
}

function settings() {
	$("#main").hide();
	$("#settings").show();
}