var m=[];
var liq;
var idx=0;
var mmm;
function setup()
{
    createCanvas(800, 800);
    frameRate(60);
    mmm= new mouse();
}

function mouseClicked()
{
    m[idx] = new Mover(30, mouseX, mouseY, random(255), random(255), random(255));
    idx++;
}

function draw()
{
    background(100, 200, 255);
    for (var i=0; i<idx; i++)
    {
        for (var j=i+1; j<idx; j++)
        {
            //if ( i== j ) continue;
            var f = m[i].attract(m[j]);
            m[j].force(f);
        }
    }
    for (var i =0; i<idx; i++) 
    {
        mmm.update();
        var f =mmm.attract(m[i]);
        m[i].force(f);

        var tmpx = m[i].loc.x;
        var tmpy = m[i].loc.y;

        m[i].update();
        for (var j=0; j<idx; j++)
        {
            if (i == j) continue;
            if (m[i].collision(m[j]))
            {
                m[i].loc.x = tmpx;
                m[i].loc.y = tmpy;
            }
        }
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
        this.vel.limit(5);
        if(this.loc.x >= width) this.loc.x=width;
        if (this.loc.x <= 0 ) this.loc.x = 0;
        if (this.loc.y <= 0 ) this.loc.y = 0;
        if (this.loc.y >= height) this.loc.y = height;
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
        dist = constrain(dist, 15.0, 20.0);
        var force = (1*mover.mass*this.mass*1.0)/(dist*dist);
        vv.mult(force);
        vv.mult(-1);
        return vv;
    }
    collision(mover)
    {
        var vv = new createVector(this.loc.x - mover.loc.x, this.loc.y - mover.loc.y);
        if (vv.mag() < this.width/2 + mover.width/2) return true;
        return false;
    }
}

class mouse
{
    construct()
    {
        this.x=mouseX;
        this.y=mouseY;
        this.mass= 1000;
        this.G = 10000;
    }

    update()
    {
        this.x = mouseX, this.y = mouseY;
    }
    attract(mover)
    {
        var vv = new createVector(this.x-mover.loc.x,this.y-mover.loc.y);
        var dist = vv.mag();
        vv.normalize();
        dist = constrain(dist, 4.0, 10.0);
        var force = (this.G*mover.mass*this.mass*1.0)/(dist*dist);
        vv.mult(force);
        return vv;
    }

}
