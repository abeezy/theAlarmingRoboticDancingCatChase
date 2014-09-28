/*
  AnalogReadSerial
  Reads an analog input on pin 0, prints the result to the serial monitor.
  Attach the center pin of a potentiometer to pin A0, and the outside pins to +5V and ground.
 
 This example code is in the public domain.
 */
int first1 = -1;
int first2 = -1;
int first3 = -1;
int numPets = 0;
int first = first1;
const int motorPin = 9;
char softPot = A0;
char impIn = A5;
boolean on = false;
const int impOut = 12;

// the setup routine runs once when you press reset:
void setup() {
  // initialize serial communication at 9600 bits per second:
  Serial.begin(9600);
  pinMode(motorPin, OUTPUT);
}

// the loop routine runs over and over again forever:
void loop() {
  // read the input on analog pin 0:
  int impOn = analogRead(impIn);
  if (impOn > 450 && impOn < 800) {
    if (on == false) {
      digitalWrite(motorPin, HIGH);
      on = true;
    } else {
      int sensorValue = analogRead(softPot);
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
        Serial.println("I should not be run unless pet");
        digitalWrite(motorPin, LOW);
        digitalWrite(impOut, HIGH);
        numPets = 0;
        first1 = -1;
        first2 = -1;
        first3 = -1;
        first = first1;
        delay(200);
        digitalWrite(impOut, LOW);
      } else if (numPets < 3) {
        if (first < 0 && sensorValue > 0 && sensorValue < 200) {
          Serial.println("I'm setting first");
          first = sensorValue;
          Serial.println("low: ");
          Serial.println(first);
        } else if (first > 0 && sensorValue > 700){
          numPets++;
          Serial.println("**************Stroke number: ");
          Serial.println(numPets);
        }
      }
    }
  } else {
    digitalWrite(motorPin, LOW);
    on = false;
  }
  delay(100);  // delay in between reads for stability
}
