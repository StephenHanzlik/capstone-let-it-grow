#include <SoftwareSerial.h>

#include <Wire.h> //I2C needed for sensors
#include "SparkFunHTU21D.h" //Humidity sensor - Search "SparkFun HTU21D" and install from Library Manager
#include "SparkFunMPL3115A2.h" //Pressure sensor - Search "SparkFun MPL3115" and install from Library Manager

MPL3115A2 myPressure; //Create an instance of the pressure sensor
HTU21D myHumidity; //Create an instance of the humidity sensor

SoftwareSerial mySerial(8, 9); // RX, TX

// We are setting up the pin A2 on the redboard to be our sensor for soil
int sensorPin = A2;

//Hardware pin definitions
//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
const byte STAT_BLUE = 7;
//const byte STAT_GREEN = 8;

const byte REFERENCE_3V3 = A3;
const byte LIGHT = A1;
const byte BATT = A5;

//Global Variables
//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
long lastSecond; //The millis counter to see when a second rolls by

void setup() {
  pinMode(7, OUTPUT);
  digitalWrite(7, LOW);
  // Open serial communications and wait for port to open:
  Serial.begin(9600);
   // set the data rate for the SoftwareSerial port
  mySerial.begin(9600);
//  mySerial.println("Hello, world?");

  pinMode(STAT_BLUE, OUTPUT); //Status LED Blue
//  pinMode(STAT_GREEN, OUTPUT); //Status LED Green

  pinMode(REFERENCE_3V3, INPUT);
  pinMode(LIGHT, INPUT);

    //Configure the pressure sensor
  myPressure.begin(); // Get sensor online
  myPressure.setModeBarometer(); // Measure pressure in Pascals from 20 to 110 kPa
  myPressure.setOversampleRate(7); // Set Oversample to the recommended 128
  myPressure.enableEventFlags(); // Enable all three pressure and temp event flags

   //Configure the humidity sensor
  myHumidity.begin();

  lastSecond = millis();

  delay(10000);
  while (!Serial) {
    ; // wait for serial port to connect. Needed for native USB port only
  }


  Serial.println("Electric Imp Online!");



}

void loop() { // run over and over
    //soil sensor values sent to serial for tuning
    digitalWrite(7, HIGH);
    int sensorValue;
    sensorValue = analogRead(sensorPin);
    Serial.write("Water Level: ");
    Serial.print(sensorValue);
    digitalWrite(7, LOW);

  //Print readings every second
//  if (millis() - lastSecond >= 1000)
//  {
    digitalWrite(STAT_BLUE, HIGH); //Blink stat LED

    lastSecond += 1000;

    //Check Humidity Sensor
    float humidity = myHumidity.readHumidity();
    int hum = (int) humidity;
//    int humidity = myHumidity.readHumidity();


    if (humidity == 998) //Humidty sensor failed to respond
    {
      Serial.println("I2C communication to sensors is not working. Check solder connections.");

      //Try re-initializing the I2C comm and the sensors
      myPressure.begin();
      myPressure.setModeBarometer();
      myPressure.setOversampleRate(7);
      myPressure.enableEventFlags();
      myHumidity.begin();
    }
    else
    {
      Serial.print("Humidity = ");
      Serial.print(humidity);
      Serial.print("%,");
      float temp_h = myHumidity.readTemperature();
      Serial.print(" temp_h = ");
      Serial.print(temp_h, 2);
      Serial.print("C,");

      //Check Pressure Sensor
      float pressure = myPressure.readPressure();
      Serial.print(" Pressure = ");
      Serial.print(pressure);
      Serial.print("Pa,");

      //Check tempf from pressure sensor
      float tempf = myPressure.readTempF();
      int temp = (int) tempf;
//      int tempf = myPressure.readTempF();
      Serial.print(" temp_p = ");
      Serial.print(tempf, 2);
      Serial.print("F,");

      //Check light sensor
      float light_lvl = get_light_level();
      int light = (int) light_lvl;
//      int light_lvl = get_light_level();
      Serial.print(" light_lvl = ");
      Serial.print(light_lvl);
      Serial.print("V,");

      //Check batt level
      float batt_lvl = get_battery_level();
      Serial.print(" VinPin = ");
      Serial.print(batt_lvl);
      Serial.print("V");

      Serial.println();


    digitalWrite(STAT_BLUE, LOW); //Turn off stat LED

          //include A2 for soil moisture pin
          int soil = sensorValue;
          String stringOne = "S,";
          String stringTemp = stringOne + light;
          String stringTwo = ",";
          String stringHum = stringTwo + temp;
          String stringThree = ",";
          String stringLight = stringThree + hum;
          String stringFour = ",";
          String stringSoil = stringFour + soil;
          String stringEnd = ",X";
          mySerial.println(stringTemp + stringHum + stringLight + stringSoil + stringEnd);
          delay(3500);
  }
}

//Returns the voltage of the light sensor based on the 3.3V rail
//This allows us to ignore what VCC might be (an Arduino plugged into USB has VCC of 4.5 to 5.2V)
float get_light_level()
{
  float operatingVoltage = analogRead(REFERENCE_3V3);

  float lightSensor = analogRead(LIGHT);

  operatingVoltage = 3.3 / operatingVoltage; //The reference voltage is 3.3V

  lightSensor = operatingVoltage * lightSensor;

  return (lightSensor);
}

//Returns the voltage of the raw pin based on the 3.3V rail
//This allows us to ignore what VCC might be (an Arduino plugged into USB has VCC of 4.5 to 5.2V)
//Battery level is connected to the RAW pin on Arduino and is fed through two 5% resistors:
//3.9K on the high side (R1), and 1K on the low side (R2)
float get_battery_level()
{
  float operatingVoltage = analogRead(REFERENCE_3V3);

  float rawVoltage = analogRead(BATT);

  operatingVoltage = 3.30 / operatingVoltage; //The reference voltage is 3.3V

  rawVoltage = operatingVoltage * rawVoltage; //Convert the 0 to 1023 int to actual voltage on BATT pin

  rawVoltage *= 4.90; //(3.9k+1k)/1k - multiple BATT voltage by the voltage divider to get actual system voltage

  return (rawVoltage);
}
