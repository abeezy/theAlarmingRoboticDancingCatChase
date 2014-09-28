const int ltMotorPin = 9;
//const int rtMotorPin = 6;

void setup() {
  // initialize serial communication at 9600 bits per second:
  Serial.begin(9600);
}

void loop() {
  analogWrite(ltMotorPin, 254);
//  analogWrite(rtMotorPin, 254);
}
