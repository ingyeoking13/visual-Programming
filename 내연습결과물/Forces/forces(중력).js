var m=[];
var liq;
var a;
function setup()
{
    createCanvas(800, 800);
    frameRate(60);
    for (var i=0; i<10; i++)
    {
        m[i] = new Mover(30+i*3, width/2-80+i*3, height/2-80+i , random(255), random(255), random(255));
    }
    a = new Attractor();
}

function mouseDragged()
{
    a.clicked();
}


function draw()
{
    background(100, 200, 255);
    a.display();
    for (var i=0; i<10; i++)
    {
        var f = a.attract(m[i]);
        m[i].force(f);
        m[i].update();
        m[i].display();
    }
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
}

class Attractor
{
    constructor()
    {
        this.loc = new createVector(width/2, height/2);
        this.mass=40;
        this.sz = this.mass*2;
        this.col=70;
        this.G=0.4;
    }
    display()
    {
        stroke(0);
        fill(this.col);
        ellipse(this.loc.x, this.loc.y, this.sz, this.sz);
    }
    clicked()
    {
        if (mouseX >= a.loc.x-a.sz/2 && mouseX <= a.loc.x+a.sz/2
            && mouseY >= a.loc.y-a.sz/2 && mouseY <= a.loc.y +a.sz/2)
        {
            this.loc.x= mouseX;
            this.loc.y= mouseY;
            this.col=250;
        }else this.col=70;
    }

    attract(mover)
    {
        var vv = new createVector(this.loc.x-mover.loc.x,this.loc.y-mover.loc.y);
        var dist = vv.mag();
        vv.normalize();
        dist = constrain(dist, 4.0, 10.0);
        var force = (this.G*mover.mass*this.mass*1.0)/(dist*dist);
        vv.mult(force);
        return vv;
    }
}
