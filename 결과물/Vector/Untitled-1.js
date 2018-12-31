var m= [];

var x=0, y=100000, z=1000;
function setup()
{
    createCanvas(800, 800);
    frameRate(60);
    for (var i=0; i<20; i++)
    {
        m[i]= new  Mover();
        m[i].loc = createVector(random(width), random(height)); 
        m[i].vel = createVector(random(-5, 5), random(-5, 5));
    }
}

function draw()
{
    background(100, 200, 255);

    for (var i=0; i<20;i++)
    {
        m[i].display();
        m[i].update();
        m[i].chkEdge();
    }
}

class Mover
{
    constructor(loc, vel)
    {
        this.loc = loc;
        this.vel = vel;
    }
    update() {
        this.m = createVector(mouseX, mouseY);
        this.dir = createVector(this.m.x- this.loc.x, this.m.y -this.loc.y);
        this.dir.normalize();
        this.dir.mult(0.5);
        this.acc = this.dir;
        this.vel.add(this.acc);
        this.vel.limit(11);
        this.loc.add(this.vel);
    }
    display() {
        stroke(0,200, 200);  
        fill(
             map(this.loc.x, 0, width, 0, 255),
             map(this.loc.y, 0, height, 0, 255),
       //      map(mag( this.vel.x, this.vel.y ), 5, 11, 0, 255)
       map(noise(x,y,z), 0, 1, 100, 255)
             );
             x+=0.001, y+=0.001, z+=0.001;

        ellipse(this.loc.x, this.loc.y, 30,30);
    }
    chkEdge() {
         if ( this.loc.x > width) this.loc.x =0;
         else if ( this.loc.x<0) this.loc.x =width;
         if ( this.loc.y> height) this.loc.y = 0;
         else if (this.loc.y<0) this.loc.y=height;
    }
}