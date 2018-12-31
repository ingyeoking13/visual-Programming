var v=[];
function setup()
{
    createCanvas(800, 800);
    frameRate(60);
    colorMode(HSB);
    v[0] = new vehicle();
    v[1] = new vehicle();
}

function draw()
{
    background(255);
    for (var i=0; i<2; i++)
    {
        if (i== 0) v[i].flee(createVector(mouseX,mouseY));
        else v[i].seek(createVector(mouseX, mouseY));
        v[i].update();
        v[i].display();
        v[i].chkedge();
    }
}

class vehicle
{
    constructor()
    {
        this.vel = createVector(0, 0);
        this.loc = createVector(width/2, height/2);
        this.acc = createVector(0, 0);
        this.mxspeed = 4;
        this.mxforce = 0.5;
        this.mylen = 5;
        this.angle = 0;
        this.cnt =0;
    };
    seek(target)
    {
        var desired = p5.Vector.sub(target,this.loc);
        var dist = desired.mag();
        desired.normalize();
        if (dist < 100)
        {
            var m = map(dist, 0, 100, 0, this.mxspeed);
            desired.mult(m);
        } else desired.mult(this.mxspeed);

        var steer = p5.Vector.sub(desired, this.vel);
        steer.limit(this.mxforce);

        this.force(steer);
    }
    flee(target)
    {
        var desired = p5.Vector.sub(target,this.loc);
        if (desired.mag() >=100) 
        {
            this.vel.mult(0.95);
            return;
        }
        desired.normalize();
        desired.mult(this.mxspeed);

        var steer = p5.Vector.sub(desired, this.vel);
        steer.limit(this.mxforce);

        this.force(steer.mult(-1));

    }
    update()
    {
        this.vel.add(this.acc);
        this.loc.add(this.vel);
        this.acc.mult(0);
    }
    force(f)
    {
        this.acc.add(f);
    }
    display()
    {
        push();

        translate(this.loc.x, this.loc.y);
        //line(0, 0, this.vel.x*10, this.vel.y*10);
        rotate(this.vel.heading()-PI/2);
        fill(map(noise(this.cnt+=0.001),0,1, 0, 255), 255, 255);
        triangle(-this.mylen, -this.mylen*4, 
            this.mylen, -4*this.mylen, 0, 0);
        pop();
    }
    chkedge()
    {
        if (this.loc.x <=0) this.loc.x =width;
        else if (this.loc.x >= width) this.loc.x =0;

        if (this.loc.y<=0) this.loc.y = height;
        else if (this.loc.y >=height) this.loc.y=0;
    }
}