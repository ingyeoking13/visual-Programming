var m=[];
var liq;
var x=0, y=1e4, z=1e3;
function setup()
{
    createCanvas(500, 800);
    frameRate(60);
    for (var i =0; i<20; i++)
    {
        var sz = random(20, 50); 
        m[i] = new Mover( sz, i*25, 0,
                        map(noise(x+=0.1, y+=0.1, z+=0.1), 0 ,1 , 30, 100),
                        map(noise(z+=0.1, y+=0.1, x+=0.1), 0 ,1 , 100, 130),
                        map(noise(y+=0.1, x+=0.1, z+=0.1), 0 ,1 , 50, 200)
                        );
    }
    liq = new Liquid(0, height/2, width, height);
}

function draw()
{
    background(100, 200, 255);
    var c = 1;
    liq.display();

    for (var i =0; i<20; i++)
    {
        var frictionv = new createVector(m[i].vel.x, m[i].vel.y);
        frictionv.normalize();
        frictionv.mult(-1);
        frictionv.mult(c);

        if( m[i].isInside() )
        { 
            m[i].drag();
        }

        m[i].update();
        m[i].display();
        m[i].force(new createVector(frictionv.x, frictionv.y));
        m[i].force(new createVector(0, 0.5*(m[i].mass)));
        m[i].force(new createVector(0.05,0));
        m[i].chkedge();
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
    chkedge()
    {
        if (this.loc.x<0 ) this.loc.x=0, this.vel.x *= -1;
        else if (this.loc.x >width) this.loc.x=width, this.vel.x *= -1;

        if(this.loc.y>height) this.loc.y=height, this.vel.y *= -1;
        else if (this.loc.y<0) this.loc.y = 0, this.vel.y *= -1;
    }
    drag() // liquid, air의 저항력을 계산 (유체 기체 저항력)
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

class Liquid
{
    constructor(x, y, w, h)
    {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.c=1.5;
    };

    display()
    {
        fill(220);
        rect(this.x, this.y, this.w, this.h);
    }
}
