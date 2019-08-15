#include <ArduinoJson.h>
#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>
#include <SPI.h>
#include <MFRC522.h>
#include <ESP8266HTTPClient.h>

#define SS_PIN 2
#define RST_PIN 0

MFRC522 mfrc522(SS_PIN, RST_PIN); //Init reader
MFRC522::MIFARE_Key key;

ESP8266WiFiMulti wifiMulti;
HTTPClient http;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);

  SPI.begin();
  mfrc522.PCD_Init();

  WiFi.mode(WIFI_STA);
  wifiMulti.addAP("WeWork", "P@ssw0rd");

  Serial.print("Connecting to WiFi...");
  while(wifiMulti.run() != WL_CONNECTED){
    Serial.print(".");
    delay(1000);
  }

  Serial.println();
  Serial.print("Connected to: ");
  Serial.println(WiFi.SSID());
  Serial.print("IP address:\t");
  Serial.println(WiFi.localIP());

}

void loop() {
  // put your main code here, to run repeatedly:
  if(!mfrc522.PICC_IsNewCardPresent()){
//    Serial.println("Returning 1");
    return;
  }

  if(!mfrc522.PICC_ReadCardSerial()){
//    Serial.println("Returning 2");
    return;
  }

  String UIDString = "";
  for (byte i=0; i < mfrc522.uid.size; i++)
  {
    if (mfrc522.uid.uidByte[i] < 0x10){
      UIDString += " 0";
    }else{
      UIDString += " ";
    }
    UIDString += String(mfrc522.uid.uidByte[i], HEX);
  }
  
  if(wifiMulti.run() == WL_CONNECTED){
    StaticJsonDocument<200> doc;
    doc["pin"] = 4111;
    doc["userID"] = 28;
    doc["UID"] = UIDString;
    String jsonString;
    jsonString = doc.as<String>();

    http.begin("http://10.185.7.38:3001/hardware/remove-item");
    http.addHeader("Content-Type", "application/json");
    int httpCode = http.POST(jsonString);
    String payload = http.getString();
    http.end();

    Serial.println(httpCode);
    Serial.println(payload);

    doc.clear();

    DeserializationError error = deserializeJson(doc, payload);

    if(error){
      Serial.print(F("deserializeJson() failed: "));
      Serial.println(error.c_str());
      return;
    }

    if(doc["status"] == "Success"){
      Serial.println("Item removed from pantry");
    }else{
      Serial.println("An issue occured");
    }
    doc.clear();
  }else{
    Serial.println("A connection error occured");
  }
  delay(2000);
}
