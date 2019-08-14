#include <SPI.h>
#include <MFRC522.h>

#define SS_PIN 2 //d4
#define RST_PIN 4//d2

MFRC522 mfrc522(SS_PIN, RST_PIN); //Init reader
MFRC522::MIFARE_Key key;

int block = ;//This is the block number the program will read/write. DO NOT WRITE INTO 'sector trailer' BLOCK SINCE IT CAN MAKE THE BLOCK UNUSABLE.
byte writeContent[16] = {""}; //16 characters

void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);
  SPI.begin();
  mfrc522.PCD_Init();
  Serial.println("Scan a MIFARE card");

  for(byte i = 0; i < 6; i++){
    key.keyByte[i] = 0xFF;
  }

}

void loop() {
  // put your main code here, to run repeatedly:
  if(!mfrc522.PICC_IsNewCardPresent()){
    return;
  }

  if(!mfrc522.PICC_ReadCardSerial()){
    return;
  }

  writeBlock(block, writeContent);
}

void writeBlock(int blockNumber, byte writeContent[]){
  int largestMultipleOf4 = blockNumber/4*4;
  int trailerBlock = largestMultipleOf4+3;

  if(blockNumber > 2 && (blockNumber+1)%4 == 0){
    Serial.println("Error: Attempted to write to trailer block");
    return;
  }

  byte status = mfrc522.PCD_Authenticate(MFRC522::PICC_CMD_MF_AUTH_KEY_A, trailerBlock, &key, &(mfrc522.uid));

  if(status != MFRC522::STATUS_OK){
    Serial.print("PCD_Authenticate() failed");
    return;
  }

  status = mfrc522.MIFARE_Write(blockNumber, writeContent, 16);//The last parameter is the number of bytes in a block

  if(status != MFRC522::STATUS_OK){
    Serial.print("MIFARE_Write() failed");
    return;
  }
}

