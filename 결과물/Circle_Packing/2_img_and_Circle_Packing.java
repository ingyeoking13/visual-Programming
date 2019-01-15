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
    
    stroke(255);
    //noStroke();
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
    if (radius >10 ) return false; // mx radius added.
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
ArrayList<Circle> spots;

PImage img;
void setup()
{
  background(0);
  size(1222,749);
  img = loadImage("C:\\Users\\yohan\\Desktop\\origin_img3.PNG");
  img.loadPixels();
  spots = new ArrayList<Circle>();
  
  for (int x=0; x< img.width; x++)
  {
    for (int y=0; y< img.height; y++)
    {
      int idx = x+ y*img.width;
      color c = img.pixels[idx];
      float b = brightness(c);
      if ( b> 1) 
      {
        spots.add(new Circle(x, y, c));
      }
    }
  }
  
  circles = new ArrayList<Circle>();
  
}

void draw()
{
 background(0);
  
  int stopCount=0;
  for (int i=0; i<5; i++)
  {
    Circle nc = newCircle();
    if (nc != null ) circles.add(nc);
    else 
    {
      i--;
      stopCount++;
    }
    
    if (stopCount>=100) noLoop();
  }
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

Circle newCircle()
{
  boolean check_inside = false;
  
  int r = int(random(spots.size()));
  Circle spot = spots.get(r);
  float new_x = spot.x;
  float new_y = spot.y;
  for (Circle c : circles )
  { 
    float dist = dist(c.x, c.y, new_x, new_y);
    if (dist < c.radius) 
    {
      check_inside= true;
      break;
    }
  }
  if (!check_inside) return new Circle(new_x, new_y, spot.myColor);
  return null;
}