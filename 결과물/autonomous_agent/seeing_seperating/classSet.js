class Vehicle
{
    constructor()
    {
        this.vel = createVector(3,3);
        this.acc = createVector(0, 0);
        this.loc = createVector(random(width),random(height));
        this.size= 20;
        this.mxspeed = random(2, 4);
        this.col = random(255);
        this.mxforce = random(0.15, 0.30);
        this.chk=0;
    }
    work(v)
    {

        var steering = this.seperate(v);
        this.force(steering);
        this.update();

        steering = this.seek(createVector(mouseX, mouseY));
        this.force(steering);
        this.update();

        this.display();
        this.chkedge();
    }

    force(f) { this.acc.add(f); }
    update() 
    {
        this.vel.add(this.acc);
        this.vel.limit(this.mxspeed);
        this.loc.add(this.vel);
        this.acc.mult(0);
    }
    display()
    {
        push();
        translate(this.loc.x, this.loc.y);
        rotate(this.vel.heading()-PI/2);
        colorMode(HSB, 255);
        fill(this.col, 255, 255);
        ellipse(0, 0, this.size, this.size);
        pop();
    }
    seek(v)
    {
        var desiredVelocity =  p5.Vector.sub(v,this.loc) ;
        desiredVelocity.normalize();
        desiredVelocity.mult(this.mxspeed);

        var steering = p5.Vector.sub(desiredVelocity, this.vel);
        steering.limit(this.mxforce);
        return steering;
    }
    seperate(vehicles)
    {
        var desiredDist = this.size;
        var sum=createVector(0,0);
        var count= 0;
        for (var i=0; i<vehicles.length; i++)
        {
            var dist = p5.Vector.dist(this.loc, vehicles[i].loc);

            if (dist > 0 && dist < desiredDist)
            {
                var diff = p5.Vector.sub(this.loc, vehicles[i].loc);
                diff.normalize();
                sum.add(diff);
                count++;
            }
        }
        if (count > 0)
        {
            sum.div(count);
            sum.setMag(this.mxspeed);
            var steering = p5.Vector.sub(sum, this.vel);
            steering.limit(this.mxforce);
            return steering.mult(10);
        }
        return createVector(0, 0);
    }
    chkedge()
    {
        if(this.loc.x<=0 ) this.loc.x = width;
        else if (this.loc.x>= width) this.loc.x = 0;

        if(this.loc.y <=0 ) this.loc.y = height;
        else if (this.loc.y >= height) this.loc.y= 0;
    }
}