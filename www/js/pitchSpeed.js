var pitchCounter = 0;
if (localStorage.getItem("distance") == null) {
    if (localStorage.getItem("how") == null) {
        localStorage.setItem("how", "true");
        $("#howTo").show();
        $("#navBar").hide();
    } else {
        $("#form").show();
        $("#navBar").hide();
    }
} else {
    $("#main").show();
    $("#navBar").show();

    let item = document.querySelector("#item");
    let ftSec = 0;
    let ftHour = 0;
    let mph = 0;
    let startTime = 0;
    let stopTime = 0;
    let elapsedTime = 0;
    var arr = [];
    var arr2 = [];
    var chartCounter = 1;
    
    
    item.addEventListener("touchstart", pressingDown, false);
    item.addEventListener("touchend", notPressingDown, false);
    
    function pitchCount() {
        pitchCounter++;
        document.getElementById("count").innerHTML = pitchCounter;
    }
    
    function initDisplay() {
        $("#speed").sevenSeg({
            digits: 3, 
            value: 0, 
            decimalPlaces: 0,
            colorOff: "#080808", 
            colorOn: "White", 
        });
        document.getElementById("avg").innerHTML = "-- ";
        document.getElementById("fastest").innerHTML = "-- ";
        document.getElementById("count").innerHTML = "0 ";        
        if (localStorage.getItem("distance") == "46") {
            $("#dis").html("46 ft");
        } else if (localStorage.getItem("distance") == "50") {
            $("#dis").html("50 ft");
        } else if (localStorage.getItem("distance") == "60.5") {
            $("#dis").html("60.5 ft");
        } else {
            var custDist = localStorage.getItem("distance");
            $("#dis").html(custDist + " ft");
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
          pitchCount();
          const canVibrate2 = window.navigator.vibrate
          if (canVibrate2) window.navigator.vibrate(0)
          stopTime = Date.now();
          elapsedTime = (stopTime - startTime) / 1000;
          console.log(elapsedTime)
          if (elapsedTime < 0.1) {
            console.log("To Quick");
          } else {
            mph = ((parseInt(localStorage.getItem("distance")) / elapsedTime) * 3600) / 5280;
            mph = mph.toFixed(0)  
            arr.push(parseInt(mph));
            arr2.push(chartCounter++);
            let average = array => array.reduce((a, b) => a + b) / array.length;
            let myAvg = average(arr)
            document.getElementById("avg").innerHTML = myAvg.toFixed(0) + " mph";
            var largest = arr[0];
            for (var i = 0; i < arr.length; i++) {
              if (arr[i] > largest ) {
                largest = arr[i];
              }
            }
            document.getElementById("fastest").innerHTML = largest + " mph";
            $("#speed").sevenSeg({
                digits: 3, 
                decimalPlaces: 0,
                value: mph, 
                colorOff: "#080808", 
                colorOn: "White", 
            });
        }
    }
    
    function buildChart() {
        var options = {
            series: [{
                name: "MPH",
                data: arr
            }],
            colors: ['#007AFF'],
            chart: {
                toolbar: {
                  show: false
                },
                height: 350,
                type: 'line',
                zoom: {
                    enabled: false
                }
            },
            
            dataLabels: {
                enabled: false
            },
            
            stroke: {
                curve: 'straight'
            },
            
            markers: {
                colors: '#fff'
            },
            
            grid: {
                row: {
                    colors: 'transparent', 
                    opacity: 0.5
                },
            },
            
            yaxis: {
                title: {
                    text: 'MPH',
                    style: {
                      fontSize:  '12px',
                      fontWeight:  'bold',
                      fontFamily: 'Helvetica, Arial, sans-serif',
                      color:  '#007AFF'
                    },
                },
                labels: {
                    style: {
                        colors: '#fff',
                        fontSize: '12px',
                        fontFamily: 'Helvetica, Arial, sans-serif',
                        fontWeight: 400,
                        cssClass: 'apexcharts-xaxis-label',
                    },
                },
            },
            
            xaxis: {
                categories: arr2,
                labels: {
                    style: {
                        colors: '#fff',
                        fontSize: '12px',
                        fontFamily: 'Helvetica, Arial, sans-serif',
                        fontWeight: 400,
                        cssClass: 'apexcharts-xaxis-label',
                    },
                },
            },
            
        };

        var chart = new ApexCharts(document.querySelector("#chart"), options);
        chart.render();
    }
    
}

initDisplay();