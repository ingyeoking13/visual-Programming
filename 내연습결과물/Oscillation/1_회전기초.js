var len =50;
var x=0;
var acc=0.0001;
var vel=0;
var mov=[];
var att;
var cnt=30;

function mouseClicked()
{
    att.clicked();
}

function setup()
{
    createCanvas(800, 800);
    frameRate(60);
    rectMode(CENTER);
    att = new Attractor(30);
    for ( var i =1; i<=cnt; i++)
    {
        mov[i] = new Mover(i*10, i*10, i*5);
    }
}

function draw()
{
    background(255);
    att.display();
    for (var i=1; i<=cnt; i++)
    {
        var f = att.getForce(mov[i]);
        mov[i].force(f);
        mov[i].update();
        mov[i].display();
    }
}

class Mover
{
    constructor(x, y, mass)
    {
        this.loc = new createVector(width/2-x, width/2-y);
        this.mass = mass;
        this.vel= new createVector(0, 0);
        this.acc = new createVector(0, 0);
        this.angle=0;
    }

    display()
    {
        fill(200);
        var tmp = map(noise(this.angle),0, 1, 0, 255);
        var tmp2 = map(noise(this.angle+1e3),0, 1, 0, 255);
        var tmp3 = map(noise(this.angle+1e5),0, 1, 0, 255);
        push();
        stroke(tmp, tmp3, tmp2);

        translate(this.loc.x, this.loc.y);
        rotate(this.angle);
        rect(0, 0, this.mass, this.mass);
        pop();
    }
    update()
    {
        this.vel.add(this.acc);
        this.loc.add(this.vel);
        var tmp  = this.vel.x/10.0;
        tmp = constrain(tmp, -0.1, 0.1);
        this.angle += tmp;
        this.acc.mult(0);
    }
    force(f) { 
        this.acc.add(f.x/this.mass, f.y/this.mass); 
    }
}
class Attractor
{
    constructor(mass) 
    {
         this.mass = mass;
         this.x= width/2;
         this.y = height/2;
         this.G = 0.4;
    }
    display() { ellipse(this.x,this.y, this.mass*3, this.mass*3); }
    clicked()
    {
        this.x= mouseX;
        this.y= mouseY;
    }

    getForce(mover)
    {
        var ret = new createVector(this.x-mover.loc.x, this.y-mover.loc.y);
        var G = 0.5;

        var dist = ret.mag();
        dist = constrain(dist, 15, 20);
        var F = (G*this.mass*mover.mass*1.0)/(dist*dist);

        ret.normalize();
        ret.mult(F);

        print(ret);
        return ret;
    }
}