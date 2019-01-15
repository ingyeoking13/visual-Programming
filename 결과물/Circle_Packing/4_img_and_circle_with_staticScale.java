class Circle 
{
  float x;
  float y;
  float radius;
  color myColor;
  
  boolean growing = true;
  
  Circle(float x, float y, color col)
  {
    this.x=x;
    this.y=y;
    this.radius = 1;
    myColor = col;
  }
  void render()
  {
    pushMatrix();
    
    //stroke(255);
    noStroke();
    //noFill();
    fill(myColor);
    strokeWeight(1);
    ellipse(x, y, radius*2, radius*2);
    popMatrix();
  }
  
  void grow()
  {
    if (growing) radius = radius+1;
  }
  
  boolean chkEdge()
  {
    if (radius >7 ) return false; // mx radius added.
    if ( x+radius >= width || x-radius <= 0 || y+radius >= height || y-radius <=0 ) return false;
    return true;
  }
  boolean touch(Circle bc)
  {
    float dist = dist(x, y, bc.x, bc.y);
    if (dist <= bc.radius+radius) return true;
    return false;
  }
}

ArrayList<Circle> circles;
PImage img;
int scalex=7;
int scaley=7;
void setup()
{
  background(0);
  size(400,581);
  img = loadImage("C:\\Users\\yohan\\Desktop\\origin_img6.jpg");
  img.loadPixels();
  
  circles = new ArrayList<Circle>();
  for (int i=0; i<width/scalex; i++)
  {
    for (int j=0; j<height/scaley; j++)
    {
      circles.add(new Circle(i*scalex, j*scaley, img.pixels[i*scalex+j*width*scaley]));
     }
  }
  
}

void draw()
{
 background(0);
 frameRate(5);
  for (Circle c : circles)
  {
     c.render();
     boolean tmp = c.chkEdge();
     if (!tmp) c.growing = false;
     
     for (Circle cc : circles)
     {
       if (c == cc) continue;
       if (c.touch(cc)) c.growing = false;
       
     }
     c.grow();
  }
}