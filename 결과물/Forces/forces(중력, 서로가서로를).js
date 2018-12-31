var m=[];
var liq;
var idx=0;
function setup()
{
    createCanvas(800, 800);
    frameRate(60);
}

function mouseClicked()
{
    m[idx] = new Mover(30+idx*3, mouseX, mouseY, random(255), random(255), random(255));
    idx++;
}

function draw()
{
    background(100, 200, 255);
    for (var i=0; i<idx; i++)
    {
        for (var j=0; j<idx; j++)
        {
            if ( i== j ) continue;
            var f = m[i].attract(m[j]);
            m[j].force(f);
        }
    }
    for (var i =0; i<idx; i++) 
    {
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
    attract(mover)
    {
        var vv = new createVector(this.loc.x-mover.loc.x,this.loc.y-mover.loc.y);
        var dist = vv.mag();
        vv.normalize();
        dist = constrain(dist, 4.0, 10.0);
        var force = (0.7*mover.mass*this.mass*1.0)/(dist*dist);
        vv.mult(force);
        return vv;
    }
}
