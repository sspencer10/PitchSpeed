document.addEventListener("deviceready", onDeviceReady, false);
const canVibrate = window.navigator.vibrate;
let buzzer;
let appVersion;
let counter = 0;

function onDeviceReady() {

	// iphone notch detection
	if (cutout.has()) {
		console.log("has notch");
	} else {
		console.log("does not have notch");
	}
	
	// get app version
	cordova.getAppVersion.getVersionNumber(function(versionNumber){
	    $('#version').html(versionNumber);
	});
	
	function setInitialVib() {
		if (localStorage.getItem("vibrate") === null) {
			localStorage.setItem("vibrate", "true");
			$('#vib').html("check_circle");
		} else if (localStorage.getItem("vibrate") === "true") {
			$('#vib').html("check_circle");
		} else {
			$('#vib').html("radio_button_unchecked");
		}
	}
	
	setInitialVib();
	
}

  function statsPage() {
    console.log("Stats Page");
  }
  
  function vibration() {
  	if (localStorage.getItem("vibrate") === "true") {
  		localStorage.setItem("vibrate", "false");
  		$('#vib').html("radio_button_unchecked");
  	} else {
  		localStorage.setItem("vibrate", "true");
  		$('#vib').html("check_circle");
  	}
  	console.log("vibration")
  }

  function easterEgg() {
  	counter++;
  	if (counter >= 6) {
  		alert("Isaac Spencer is a stud!");
  		counter = 0;
  	}
  }

  function customDistance() {
	var a = prompt("Enter Pitching Distance...");
	localStorage.setItem("distance", a);
  }

  function buzz() {
	if (cordova.platformId === "ios") {
		// ios
		if (localStorage.getItem("vibrate") === "true") {
	  		buzzer = setInterval(function() {
				TapticEngine.impact({
			  		style: "heavy"			});
				}, 25);
		}
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