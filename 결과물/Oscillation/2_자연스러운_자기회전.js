var mov;
function setup()
{
    createCanvas(800, 800);
    frameRate(60);
    mov = new Mover(width/2, height/2);
}

function draw()
{
    background(255);
    mov.update(mouseX, mouseY);
    mov.display();
}

class Mover
{
    constructor(x, y) { 
        this.loc = new createVector(width/2-x, width/2-y); 
        this.vel = new createVector(0, 0);
        this.acc = new createVector(0,0);
        this.angle =0;
    }
    display(x, y)
    {
        fill(200);

        var tmp = map(noise(this.angle),0, 1, 0, 255);
        var tmp2 = map(noise(this.angle+1e3),0, 1, 0, 255);
        var tmp3 = map(noise(this.angle+1e5),0, 1, 0, 255);

        push();
        fill(tmp, tmp3, tmp2);
        translate(this.loc.x, this.loc.y);
        rectMode(CENTER);
        rotate(this.angle);
        rect(0, 0,50,20);
        pop();

    }
    update(x, y)
    {
        var vv = new createVector(x-this.loc.x, y-this.loc.y);
        vv.normalize();
        vv.mult(0.15);

        this.acc.add(vv);

        this.vel.add(this.acc);
        this.vel.limit(5);
        this.angle = this.vel.heading();
        this.acc.mult(0);
        this.loc.add(this.vel)
    }
}