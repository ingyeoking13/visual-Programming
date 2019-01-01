var v=[];
var mxnumber=5e2;
var offSet=100; // 벽 
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
    push();
    rectMode(CENTER);
    translate(width/2, height/2);
    colorMode(RGB);
    fill(150);
    rect(0, 0, width-offSet, height-offSet);
    pop();
    for (var i=0; i<mxnumber; i++)
    {
        var tmp = v[i].pursuit();
        v[i].seek(tmp);
        v[i].update();
        v[i].chkedge();
        v[i].display(tmp);
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
        this.mxforce = 0.01;
        this.mylen = 5;
        this.angle = 0;
        this.cnt =random(10000000);
        this.col =random(1e5);
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
        triangle(-this.mylen, -this.mylen*4, this.mylen,-4*this.mylen, 0, 0);
        fill(255);
        pop();

        var futurePoint = this.futurelocation();
        var offseX = this.loc.x;
        var offseY = this.loc.y;
        var circleX = futurePoint.x - offseX;
        var circleY = futurePoint.y - offseY;

        /*
        ellipse(circleX, circleY, this.predictAbility, this.predictAbility);
        line(0, 0, circleX, circleY);
        line(circleX, circleY, desired.x-offseX, desired.y-offseY);
        fill(0, 0, 0);
        ellipse(desired.x-offseX, desired.y- offseY, 5,5);
        */
        pop();
    }
//휴,... 이건 좀 힘드네
//스무스한 예측을 위해 noise 를 통해 생성했는데
//그 것을 향해 가는 이전의 관성 acc 와 
//벽에 부딪혔을 때의 desired의 변환에 대한 acc의 제한의 절대적차 또는 비율적 차에 
//따라 현상이 다름.
//mxforce는 예측타겟에 대한 관성인데, 낮게잡아야하고
//벽에 의한 힘.. 에 대한 반대로 향하는 힘은 제한이 높아야함... 그래야 스무스해 
    chkedge()
    {
        var hitDesireableBounce = 1e2; // 벽에 부딪혔을 때 desire target을 바꿈
        if (this.loc.x <offSet/2)
        {
            var d = createVector(this.mxspeed, this.vel.y);
            var steer = p5.Vector.sub(d, this.vel);
            steer.limit(this.mxforce).mult(15);
            this.force(steer);
        }
        else if (this.loc.x>width-offSet/2)
        {
            var d = createVector(this.mxspeed-width, this.vel.y);
            var steer = p5.Vector.sub(d, this.vel);
            steer.limit(this.mxforce).mult(15);
            this.force(steer);
        }

        if (this.loc.y<offSet/2) 
        {
            var d = createVector(this.vel.x, this.mxspeed);
            var steer = p5.Vector.sub(d, this.vel);
            steer.limit(this.mxforce).mult(15);
            this.force(steer);
        }
        else if ( this.loc.y >height-offSet/2) 
        {
            var d = createVector(this.vel.x, this.mxspeed-height);
            var steer = p5.Vector.sub(d, this.vel);
            steer.limit(this.mxforce).mult(15);
            this.force(steer);
        }
    }
    futurelocation()
    {
        var tt = this.vel.copy();
        return p5.Vector.add(this.loc, tt.limit(1).mult(this.predictAbility));
    }
    pursuit() // return expected Location
    {
        var newLocation = this.futurelocation();
        var rand = map(noise(this.cnt+=random(0.0001)), 0, 1, 0, 360);
        var dx = this.predictAbility * cos(rand);
        var dy = this.predictAbility * sin(rand);
        var ret =  createVector(newLocation.x-dx, newLocation.y-dy);
        return ret;
    }
}