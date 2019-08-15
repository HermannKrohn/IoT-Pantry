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

byte categoryBlock[18];
byte itemNameBlock[18];

void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);

  SPI.begin();
  mfrc522.PCD_Init();

  for(byte i = 0; i < 6; i++){
    key.keyByte[i] = 0xFF;
  }

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

  if(!mfrc522.PICC_IsNewCardPresent()){
    return;
  }

  if(!mfrc522.PICC_ReadCardSerial()){
    return;
  }

  int statusRead1 = readBlock(10, itemNameBlock);
  int statusRead2 = readBlock(9, categoryBlock);

  if(statusRead1 == 1 || statusRead2 == 1){
    Serial.println("An error occured while reading");
    memset(categoryBlock,0,sizeof(categoryBlock));
    memset(itemNameBlock,0,sizeof(itemNameBlock));
    // Halt PICC
    mfrc522.PICC_HaltA();
    // Stop encryption on PCD
    mfrc522.PCD_StopCrypto1();
    return;
  }
  
  // Halt PICC
  mfrc522.PICC_HaltA();
  // Stop encryption on PCD
  mfrc522.PCD_StopCrypto1();

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
    //Create JSON object to send as body
    StaticJsonDocument<200> doc;
    doc["userID"] = 28;
    doc["category"] = categoryBlock;
    doc["itemName"] = itemNameBlock;
    doc["pin"] = 4111;
    doc["UID"] = UIDString;
    String jsonString;
    jsonString = doc.as<String>();      
    
    http.begin("http://10.185.7.38:3001/hardware/new-item");
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
      Serial.println("Item added to pantry");
    }else{
      Serial.println("Item was not added to pantry");
    }
    doc.clear();

  }else{
     Serial.println("A connection error occured");
  }
  delay(1000);
}

int readBlock(int blockNumber, byte readBlock[]){
  int largestMultipleOf4 = blockNumber/4*4;
  int trailerBlock = largestMultipleOf4+3;
  
  byte status = mfrc522.PCD_Authenticate(MFRC522::PICC_CMD_MF_AUTH_KEY_A, trailerBlock, &key, &(mfrc522.uid));

  if(status != MFRC522::STATUS_OK){
    Serial.print("PCD_Authenticate() failed");
    return 1;
  }

  byte bufferSize = 18;

  status = mfrc522.MIFARE_Read(blockNumber, readBlock, &bufferSize);
  if(status != MFRC522::STATUS_OK){
    Serial.print("MIFARE_Read() failed ");
    return 1;
  }
  return 2;
}


