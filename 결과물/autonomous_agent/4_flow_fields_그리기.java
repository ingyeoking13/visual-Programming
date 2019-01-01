ArrayList<vehicle> v = new ArrayList();
int mxnumber=(int)1e2;
int offSet=0; // 벽 
FlowField flow;
int clickchk=0;
float zoff=0;
void setup()
{
    size(1600, 900);
    frameRate(60);
    colorMode(HSB, 255);
    background(255);
    flow = new FlowField();
}

void mousePressed(){clickchk=1;}
void mouseReleased(){clickchk=0;}
  
void draw()
{

    flow.display();
    for (int i=0; i<v.size(); i++)
    {
        PVector tmp = flow.lookUp(v.get(i).loc);
        v.get(i).force(tmp);
        v.get(i).update();
        v.get(i).chkedge();
        v.get(i).display();
    }
    if ( clickchk == 1 ) v.add(new vehicle(mouseX, mouseY));
}

class vehicle
{
  PVector vel = new PVector(3, 3);
  PVector loc = new PVector(width/2, height/2);
  PVector acc = new PVector(0, 0);
  float mxspeed = 0.3;
  float mxforce = 0.3;
  int mylen =5;
  float angle =0;
  float cnt = random(1e9);
  float col;
  float predictAbility = 30;
  
  PVector prev_loc = new PVector(0, 0);
  public vehicle(float x, float y){ 
    this.loc.x = x; this.loc.y =y;
    prev_loc.x = x; prev_loc.y =y;
    this.col = (int)(noise(x+y)*255);
  };
  void seek(PVector target)
  {
        PVector desired = PVector.sub(target,this.loc);
        float dist = desired.mag();
        desired.normalize();
        if (dist < 100)
        {
            float m = map(dist, 0, 100, 0, this.mxspeed);
            desired.mult(m);
        } else desired.mult(this.mxspeed);

        PVector steer = PVector.sub(desired, this.vel);
        steer.limit(this.mxforce);
        this.force(steer);
  }
    
    void update()
    {
        this.vel.add(this.acc);
        this.vel.limit(this.mxspeed);
        this.prev_loc = this.loc;
        this.loc.add(this.vel);
        this.acc.mult(0);
    }
    void force(PVector f)
    {
        this.acc.add(f);
    }
    void display()
    {
        pushMatrix();
        translate(this.loc.x, this.loc.y);

        rotate(this.vel.heading()-PI/2);
        pushMatrix();
        this.col+=0.1;
        if (this.col > 255) this.col=0;
        stroke(this.col, 255 ,255 ,5);
        line(0, 0, prev_loc.x-loc.x, prev_loc.y - loc.y);
        popMatrix();

        popMatrix();
    }
    void chkedge()
    {
   
        if (this.loc.x <=0) 
        {
          this.loc.x =width;
          prev_loc.x = loc.x; 
        }
        else if (this.loc.x>=width) 
        {
          this.loc.x=0;
          prev_loc.x = loc.x;
        }
        if (this.loc.y<=0) 
        {
          this.loc.y=height;
          prev_loc.y = loc.y;
        }
        else if ( this.loc.y >=height) 
        {
          this.loc.y=0;
          prev_loc.y = loc.y;
        }
      
    }
    PVector futurelocation()
    {
        PVector tt = this.vel.copy();
        return PVector.add(this.loc, tt.limit(1).mult(this.predictAbility));
    }
    PVector pursuit() // return expected Location
    {
        PVector newLocation = this.futurelocation();
        float rand = map(noise(this.cnt+=random(0.01)), 0, 1, 0, 360);
        float dx = this.predictAbility * cos(rand);
        float dy = this.predictAbility * sin(rand);
        PVector ret = new PVector(newLocation.x-dx, newLocation.y-dy);
        return ret;
    }
}

class FlowField
{
  int resolution =30;
  int row = height/this.resolution;
  int col = width/this.resolution;
  PVector[][] field = new PVector[row][col];
  
  public FlowField() 
  {
  }
  void display()
  {
        float xoff=0;
        for (int i=0; i<this.row; i++)
        {
            float yoff=0;
            for (int j=0; j<this.col; j++)
            {
                float angle = map(noise(xoff, yoff, zoff+=0.000005), 0, 1, 0, TWO_PI);
                field[i][j]= new PVector(cos(angle), sin(angle));
                yoff+=0.01;
            }
            xoff+=0.01;
        }
    }
    PVector lookUp(PVector lookup)
    {
      
      int r = int(constrain(lookup.x/resolution, 0, row-1));
      int c = int(constrain(lookup.y/resolution, 0, col-1));
      return field[r][c].copy();
    }
}