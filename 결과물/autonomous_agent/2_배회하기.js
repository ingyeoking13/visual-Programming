var v=[];
var mxnumber=5e2;
function setup()
{
    createCanvas(1200, 800);
    frameRate(60);
    colorMode(HSB);
    for(var i =0; i<mxnumber; i++) v[i] = new vehicle();
}

function draw()
{
    background(255);
    for (var i=0; i<mxnumber; i++)
    {
        var tmp = v[i].pursuit();
        v[i].seek(tmp);
        v[i].update();
        v[i].display(tmp);
        v[i].chkedge();
    }
}

class vehicle
{
    constructor()
    {
        this.vel = createVector(3, 3);
        this.loc = createVector(width/2, height/2);
        this.acc = createVector(0, 0);
        this.mxspeed = 3;
        this.mxforce = 0.05;
        this.col=random(1e9);
        this.mylen = 5;
        this.angle = 0;
        this.cnt =random(100000);
        this.predictAbility = 30; // pixel
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
        this.vel.limit(this.mxspeed);
        this.loc.add(this.vel);
        this.acc.mult(0);
    }
    force(f)
    {
        this.acc.add(f);
    }
    display(desired)
    {
        push();
        translate(this.loc.x, this.loc.y);

        rotate(this.vel.heading()-PI/2);
        push()
        noStroke();
        fill(map(noise(this.col+=0.01),0,1, 0, 255), 255, 255);
        triangle(-this.mylen, -this.mylen*6, this.mylen,-6*this.mylen, 0, 0);
        fill(255);
        pop();

        var futurePoint = this.futurelocation();
        var offseX = this.loc.x;
        var offseY = this.loc.y;
        var circleX = futurePoint.x - offseX;
        var circleY = futurePoint.y - offseY;

        /*
        ellipse(circleX, circleY, this.predictAbility*2, this.predictAbility*2);
        line(0, 0, circleX, circleY);
        line(circleX, circleY, desired.x-offseX, desired.y-offseY);
        fill(0, 0, 0);
        ellipse(desired.x-offseX, desired.y- offseY, 5,5);
        */
        pop();
    }
    chkedge()
    {
        if (this.loc.x <=0) this.loc.x =width;
        else if (this.loc.x >= width) this.loc.x =0;

        if (this.loc.y<=0) this.loc.y = height;
        else if (this.loc.y >=height) this.loc.y=0;
    }
    futurelocation()
    {
        var tt = this.vel.copy();
        return p5.Vector.add(this.loc, tt.limit(1).mult(this.predictAbility));
    }
    pursuit() // return expected Location
    {
        var newLocation = this.futurelocation();
        var rand = map(noise(this.cnt+=random(0.0001)), 0, 1, 0, 360); // 여길 수정하면 좀더 제한적인 방향으로 이동할 수 있음
        var dx = this.predictAbility * cos(rand);
        var dy = this.predictAbility * sin(rand);
        var ret =  createVector(newLocation.x+dx, newLocation.y+dy);
        return ret;
    }
}