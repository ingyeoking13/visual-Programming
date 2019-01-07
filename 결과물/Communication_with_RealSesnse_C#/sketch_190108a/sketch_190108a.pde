import processing.net.*;

Client myClient;
int dataIn;
static int reading_size = (640/5+1)*(480/8);
static int reading_width = 640/5+1;
static int reading_height = 480/8;

byte[] reading = new byte[reading_size];
byte[] reading2 = new byte[4];
void setup()
{
  size(1200, 720);
  myClient = new Client(this, "127.0.0.1", 5204);
  if ( !myClient.active() ) exit();
  
  noStroke();
  //colorMode(HSB);
  rectMode(CENTER);
}

void draw()
{
  if (myClient.available() > 0)
  {
    background(255);
    myClient.readBytes(reading);
   // println(reading2);
    
    for (int i=0; i<reading_width; i++)
    {
      for (int j=0; j<reading_height; j++)
      {
        pushMatrix();
        translate(i*5, j*8);
        fill(ret(reading[j*reading_width + i]));
        rect(0, 0, 10, 16);
        popMatrix();
      }
    }
    
    myClient.clear(); 
  }
}

color ret(byte rb)
{
  int H=150, S = 255, B= 255;
  String s = " .,:=/nhBXW";

  int len = s.length();
  for (int i=0; i<len; i++)
  {
    if (s.charAt(i) == (char)rb)
    {
      H= 255- i*3;
      S= 255- i*10;
      if ( S<0 ) S=0;
      B = i*5;
      break;
    }
  }
  println((char)rb + " = " + H );
  return color(H,S,B, 55);
}
