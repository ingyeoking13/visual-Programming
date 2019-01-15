var stringSet = [ '정', '슬', '기', ' '];
class Stream
{
    constructor(x, y)
    {
        this.symbols = [];
        this.totalSymbols = round(random(3, 5));
        this.speed = random(2, 15);
        this.x=x;
        this.y=y;
    }

    generateSymbols()
    {
        for (var i=0; i<= this.totalSymbols; i++)
        {
            var symbol = new Symbol(this.x, this.y, this.speed);
            symbol.setToRandomSymbol();
            this.symbols.push(symbol);
            this.y -= symbolSize;
        }
    }

    render()
    {
        for (var i=0; i<this.symbols.length; i++)
        {
            print(this.symbols[i].value);
            var chk =(round(random(0,30))==1);
            this.symbols[i].render(chk);
        }
    }
}

class Symbol
{
    constructor(x, y, speed)
    {
        this.x= x;
        this.y= y;
        this.value;
        this.speed = speed;
        this.switchInterval = round(random(10,20));
    }

    setToRandomSymbol()
    {
        if (frameCount % this.switchInterval == 0 )
        {
            this.value = String.fromCharCode(
                0x30A0 + round(random(0, 96))
            );
           //this.value = stringSet[round(random(4))];
        }
    }

    render(chk)
    {
        if (chk==true) fill(180, 255, 180);
        else fill(0, 255, 70);
        text(this.value, this.x, this.y);
        this.update();
        this.chkEdge();
        this.setToRandomSymbol();
    }
    update() { this.y += this.speed; }
    chkEdge() { if ( this.y>= height) this.y=0; }
}

class movingLine
{
    constructor(x, y)
    {

        this.prev_loc = createVector(x, y);
        this.loc = createVector(x, y);
        this.acc= createVector(0, 0);
        this.vel = createVector(0, 0);
        this.resist = createVector(0, 0);
        this.prev_vel = createVector(0, 0);
        this.mxSpeed = 5;
        this.C = random(0.1, 0.2);
    }

    render()
    {
        push();
        stroke(180, 255, 180);
        var plx = this.prev_loc.x;
        var ply = this.prev_loc.y;
        var x = this.loc.x;
        var y = this.loc.y;
        line(plx, ply, x, y);
        pop();

        this.update();
        this.chkEdge();
    }

    update()
    {
        this.vel.add(this.acc);
        this.prev_vel.add(this.acc);

        this.prev_vel.add(this.resist);

        this.prev_loc.add(this.prev_vel);
        this.loc.add(this.vel);

        this.prev_vel.limit(this.mxSpeed);
        this.vel.limit(this.mxSpeed);

        this.acc.mult(0);
        this.resist.mult(0);
    }
    force(f) { this.acc.add(f); }
    chkEdge()
    {
        if (this.prev_loc.y >= height)
        {
            this.prev_loc.y =0;
            this.loc.y = 0;
            this.vel.mult(0);
            this.C = random(0.1, 0.2);
        }
    }

    fluidResist_toPrevPoint()
    {
        var iV = this.prev_vel.copy();
        var vpow = iV.mag()*iV.mag();
        this.resist.add(iV.normalize().mult(-1*this.C*vpow));
    }
}