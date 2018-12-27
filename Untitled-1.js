var m;
var liq;
var x=0, y=1e4, z=1e3;
var a;
function setup()
{
    createCanvas(500, 800);
    frameRate(60);
    m = new Mover(); 
    a = new Attract();
}

function draw()
{
    background(100, 200, 255);
    var c = 1;
    var f = a.attract(m);
    m.force(f);
    m.display();
    m.update();
    a.display();
}

class Mover
{
    constructor(sz, x,y,  r, g, b)
    {
        this.loc = new createVector(x, y);
        this.vel = new createVector(0,0);

        this.width=sz;
        this.height=sz;

        this.r = r;
        this.g = g;
        this.b = b;
        this.acc=new createVector(0,0);
        this.mass=sz;
    }
    update()
    {
        this.vel.add(this.acc);
        this.loc.add(this.vel);
        this.acc.mult(0);
    }
    force(f)
    {
        var tmp = new createVector(f.x/this.mass, f.y/this.mass);
        this.acc.add(tmp);
    }
    display()
    {
        fill(this.r, this.g, this.b);
        stroke(150,150,150);
        ellipse(this.loc.x, this.loc.y, this.width, this.height);
    }
    drag() // liquid의 저항력을 계산 (유체 기체 저항력)
    {
        var spd = this.vel.mag();
        var dragMag = liq.c * spd * spd;

        var dragV = new createVector(this.vel.x, this.vel.y); 

        dragV.mult(-1);
        dragV.normalize();
        dragV.mult(dragMag);

        this.force(dragV);
    }
    isInside()
    {
        if ( this.loc.y >= liq.y) return true;
        return false;
    }
}

class Attract
{
    constructor()
    {
        this.loc = createVector(width/2, height/2);
        this.mass=20;
    }

    display()
    {
        stroke(0);
        fill(200, 200, 200);
        ellipse(this.loc.x, this.loc.y, mass*2, mass*2);
    }
}
