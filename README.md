## About

Let It Grow is an open sourced browser based project that allows users to pull data from indoor and outdoor food production facilities.  An Arduino Uno, combined with a powerful weather shield from Spark Fun and WIFI capabilities by Electric Imp, sends HTTP post requests to the server every 3 seconds.  Live graphs and gauges give users insight into current grow conditions and foster decisive, informed decisions. Let It Grow also includes a browser based form to set up the parameters under which text notifications are sent.  This project exemplifies the power of the modern browser and it's ability to render a single page app powered by JSON data.   Let it grow, let it grow, greatly yield!

<!--
It was inspired by the concept of the vertical farm, food production in vertically aligned rows, such as a sky scraper, and is intended to make accessing facility data easier. An Arduino Uno, combined with a powerful weather shield from Spark Fun and WIFI capabilities by Electric Imp, sends HTTP post requests to the server every 3 seconds.  Live graphs and gauges give users insight into current grow conditions and foster decisive, informed decisions.  This project exemplifies the power of the modern browser and it's ability to render a single page app powered by JSON data. Let it grow, let it grow, greatly yield! -->

## Multiple Languages and the Journey of Data

Let it Grow utilizes many languages to get real time data to the browser, as such the data takes an interesting journey to get to the point where it is rendered in the DOM.  The examples code shown below demonstrates aspects of this journey.

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

**Squirrel** code running locally on the Electric Imp reads the bytes coming out of the serial bus, converts them to a string, and sends them to the Electric Imp Agent:

```
```

The Agent (programable **Squirrel** code hosted externally by Electric Imp) converts that string to JSON format and initiates a post request to the Let It Grow API:

```
```

A **NodeJS** server interperpates the incoming data and determines wether text pre-set parameters require a text notification.

```
```

Finally, client side javascript works with zingcharts to render easily readable and instantly responsive graphs and gauges:

```
```



## Code

A short description of the motivation behind the creation and maintenance of the project. This should explain **why** the project exists.

## Installation

Provide code examples and explanations of how to get the project.

## API Reference

Depending on the size of the project, if it is small and simple enough the reference docs can be added to the README. For medium size to larger projects it is important to at least provide a link to where the API reference docs live.

## Tests

Describe and show how to run the tests with code examples.

## Contributors

Let people know how they can dive into the project, include important links to things like issue trackers, irc, twitter accounts if applicable.

## License

A short snippet describing the license (MIT, Apache, etc.)
