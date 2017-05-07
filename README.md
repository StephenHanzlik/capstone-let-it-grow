 <a href="https://dinkydinky.herokuapp.com/about">Deployed Site</a>

## About

Let It Grow is an open sourced browser based project that allows users to pull data from indoor and outdoor food production facilities.  An Arduino Uno, combined with a powerful weather shield from Spark Fun and WIFI capabilities by Electric Imp, sends HTTP post requests to the server every 3 seconds.  Live graphs and gauges give users insight into current grow conditions and foster decisive, informed decisions. Let It Grow also includes a browser based form to set up the parameters under which text notifications are sent.  This project exemplifies the power of the modern browser and it's ability to render a single page app powered by JSON data.   Let it grow, let it grow, greatly yield!

<!--
It was inspired by the concept of the vertical farm, food production in vertically aligned rows, such as a sky scraper, and is intended to make accessing facility data easier. An Arduino Uno, combined with a powerful weather shield from Spark Fun and WIFI capabilities by Electric Imp, sends HTTP post requests to the server every 3 seconds.  Live graphs and gauges give users insight into current grow conditions and foster decisive, informed decisions.  This project exemplifies the power of the modern browser and it's ability to render a single page app powered by JSON data. Let it grow, let it grow, greatly yield! -->

## Multiple Languages and the Journey of Data

Let it Grow utilizes many languages to get real time data to the browser, as such the data takes an interesting journey to get to the point where it is rendered in the DOM.  The example code shown below is simplified to demonstrate aspects of this journey.

Sensor readings are taken with **Arduino** code running on the Arduino Uno:

```
HTU21D myHumidity; //Create an instance of the humidity sensor

SoftwareSerial mySerial(8, 9); // RX, TX

void setup() {
  mySerial.begin(9600);

  //Configure the humidity sensor
 myHumidity.begin();
}

void loop() {
  //Check Humidity Sensor
  float humidity = myHumidity.readHumidity();
  int hum = (int) humidity;
  String stringOne = "S,";
  String stringTwo = ",X";
  mySerial.println(stringOne + hum + stringTwo);
  delay(3500);
}
```

**Squirrel** code running locally on the Electric Imp reads the bytes coming out of the serial bus, converts them to a string, then an array, and then, sends them to the Electric Imp Agent as a data type known as a table:

```
// string we're collecting
s <- "";

function process(newline) {
        local sArr = split(s, ",")
        local dataTwo = { "humidity": sArr[1] }
        agent.send("impSerialIn", dataTwo);

}

function newdata() {
  local b = hardware.uart57.read();
  while(b!=-1) {
    if (s == "") {
      // We look for an S to start the string, otherwise ignore
      if (b == 'S') s = "S";
    } else {
      // Append to string
      s+=b.tochar();

      // If we saw an X, we got the end of the string
      if (b == 'X') {
        // process string
        process(s);
        // and blank it
        s = "";
      }
    }
    b = hardware.uart57.read();
  }
}

// Init uart. It will call callback
hardware.uart57.configure(9600, 8, PARITY_NONE, 1, NO_CTSRTS, newdata);
```

The Agent (programable **Squirrel** code hosted externally by Electric Imp) converts that string to JSON format and initiates a post request to the Let It Grow API:

```
device.on("impSerialIn", function(data) {
  // Set URL to your web service
     local url = "https://dinkydinky.herokuapp.com/data";

  // Set Content-Type header to json
  local headers = { "Content-Type": "application/json" };

  // encode data and log
    local body = http.jsonencode(data);
    server.log(body);   

  // send data to your web service
    http.post(url, headers, body).sendsync();

});
```

A **NodeJS** server interperpates the incoming data and determines wether  pre-set parameters trigger a text notification.

```
if (insertPost.temperature >= settings.max_temp || insertPost.temperature <= settings.min_temp) {
  //send warning text about temps w/ metric included
  var accountSid = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
  var authToken = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxx';

  //require the Twilio module and create a REST client
  var client = require('twilio')(accountSid, authToken);

  client.messages.create({
    to: "+1610xxxxxxx",//Me
    from: "+1484xxxxxx",
    body: `WARNING: Temperature is at ${insertPost.temperature}°F`,

  }, function(err, message) {
    console.log(message.sid);
  });
  client.messages.create({
    to: "+1610xxxxxxx",//Me
    from: "+1484xxxxxx",
    body: "https://dinkydinky.herokuapp.com/data",
  }, function(err, message) {
    console.log(message.sid);
  });
}
```

Finally, client side javascript works with zingcharts to render easily readable and instantly responsive graphs and gauges:

```
var timerData = $interval(function () {
  console.log(greenTempData);
    if(!$scope.loading){
        update();
    }
}, 3500);

function update() {

$http.get("https://dinkydinky.herokuapp.com/data")
.then(response => {
  console.log(response.data);
  greenTempData = response.data[0].temperature;
  yellowHumidityData = response.data[0].humidity;
  let timeString =  response.data[0].created_at;
  let timeStamp = Date.parse(timeString);
  vm.lightOn = response.data[0].light;
  vm.soil = response.data[0].soil_moisture;

    tempLineArray.shift();
    humidityLineArray.shift();
    tempLineArray.push(response.data[0].temperature);
    humidityLineArray.push(response.data[0].humidity);

    //Data is fed into this this JSON object for graphing
    $scope.myJson = {
      backgroundColor: "#fff",
      globals: {
        color: "#666"
      },
      graphset: [{
        type: "gauge",
        x: 0,
        y: 0,
        //Entire JSON object is not listed for brevity
        ......
      }]
```



## Open Source Mission

This project was inspired by the concept of the vertical farm, food production in vertically aligned rows, such as a sky scraper, and is intended to make accessing facility data easier.   This code can be used and modified by anyone.   I hope it help bring us closer to the full scale adoption of the vertical farm.  
