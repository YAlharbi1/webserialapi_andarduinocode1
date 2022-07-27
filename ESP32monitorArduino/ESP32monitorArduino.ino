#include <WiFi.h>
#include <ESPAsyncWebServer.h>
#include <WebSerial.h>

const char* ssid = "Salah5G";
const char* password = "";

AsyncWebServer server(80);

void setup() {
  
  Serial.begin(115200);
  WiFi.begin(ssid,password);

  if (WiFi.waitForConnectResult() != WL_CONNECTED){
  Serial.println("Can't initialize");
  return;
  }

  Serial.println(WiFi.localIP());

  WebSerial.begin(&server);

  server.begin();
}

void loop() {
  char str[20];
  int value; 
  gets(str);
  value=strcmp(str,"يمين");  
   if (value==0){
    Serial.write(str);
   }
   value=strcmp(str,"يسار");  
   if (value==0){
    Serial.write(str);
   }
 

}
