/*
  AnalogReadSerial
  Reads an analog input on pin 0, prints the result to the serial monitor.
  Attach the center pin of a potentiometer to pin A0, and the outside pins to +5V and ground.
 
 This example code is in the public domain.
 */
//int highest = 1;
int first1 = -1;
int first2 = -1;
int first3 = -1;
int numPets = 0;
int first = first1;
const int motorPin = 9;

// the setup routine runs once when you press reset:
void setup() {
  // initialize serial communication at 9600 bits per second:
  Serial.begin(9600);
  pinMode(motorPin, OUTPUT);
}

// the loop routine runs over and over again forever:
void loop() {
  // read the input on analog pin 0:
  int sensorValue = analogRead(A0);
  switch (numPets) {
    case 0:
      break;
    case 1:
      first = first2;
      first2 = 100;
      break;
    case 2:
      first = first3;
      first3 = 100;
      break;
    case 3:
      Serial.println("I've been pet!");
      break;
  }

  if (numPets == 3) {
    digitalWrite(motorPin, LOW);
  } else if (numPets < 3) {
    if (first < 0 && sensorValue > 0 && sensorValue < 200) {
      first = sensorValue;
      Serial.println("low: ");
      Serial.println(first);
    } else if (first > 0 && sensorValue > first && sensorValue > 700){
      numPets++;
      Serial.println("**************Stroke number: ");
      Serial.println(numPets);
    }
  }
  delay(100);        // delay in between reads for stability
}
