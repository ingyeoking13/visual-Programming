class Vehicle
{
    constructor()
    {
        this.vel = createVector(3,3);
        this.acc = createVector(0, 0);
        this.loc = createVector(random(width),random(height));
        this.size= 20;
        this.mxspeed = random(1, 2);
        this.col = random(255);
        this.mxforce = random(0.15, 0.30);
        this.chk=0;
    }
    work(v)
    {

        var steering = this.seperate(v);
        this.force(steering.mult(5));
        this.update();

        steering = this.align(v);
        this.force(steering.mult(2));
        this.update();

        steering = this.cohesion(v);
        this.force(steering.mult(2));
        this.update();

        this.display();
        this.chkedge();
    }

    force(f) { 
        this.acc.add(f);
     }
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
            return steering;
        }
        return createVector(0, 0);
    }
    align(vehicles)
    {
        var influenceDist = this.size*3;
        var sum = createVector(0, 0);
        var cnt =0;
        for (var i=0; i<vehicles.length; i++)
        {
            var dist = p5.Vector.dist(this.loc, vehicles[i].loc);
            if ( dist >0 && dist < influenceDist)
            {
                sum.add(vehicles[i].vel);
                cnt++;
            }
        }
        if (cnt>0)
        {
            sum.div(cnt);

            sum.setMag(this.mxspeed);
            var steering = p5.Vector.sub(sum, this.vel);
            steering.limit(this.mxforce);
            return steering;
        }
        else return createVector(0, 0);
    }

    cohesion(vehicles)
    {
         var influenceDist = this.size*1;
        var sum = createVector(0, 0);
        var cnt =0;
        for (var i=0; i<vehicles.length; i++)
        {
            var dist = p5.Vector.dist(this.loc, vehicles[i].loc);
            if ( dist >0 && dist < influenceDist)
            {
                sum.add(vehicles[i].loc);
                cnt++;
            }
        }
        if (cnt>0)
        {
            sum.div(cnt);
            return this.seek(sum);
        }
        else return createVector(0, 0);
    }
    chkedge()
    {
        if(this.loc.x<=0 ) this.loc.x = width;
        else if (this.loc.x>= width) this.loc.x = 0;

        if(this.loc.y <=0 ) this.loc.y = height;
        else if (this.loc.y >= height) this.loc.y= 0;
    }
}
class FlowField
{
  
    constructor() 
    {
        this.resolution =20;
        this.row = height/this.resolution;
        this.col = width/this.resolution;
        this.field = [];
        for (var i=0; i<this.row; i++) {
            this.field[i] = [];
            for (var j=0; j<this.col; j++) this.field[i][j] = createVector(0, 0);
        }
        this.zoff=0;
    }
    display()
    {
        var xoff=0;
        for (var i=0; i<this.row; i++)
        {
            var yoff=0;
            for (var j=0; j<this.col; j++)
            {
                var angle = map(noise(xoff, yoff, this.zoff+=0.0000005), 0, 1, 0, TWO_PI);
                this.field[i][j]= createVector(cos(angle), sin(angle));
                push();
                stroke(0);
                translate(j*this.resolution, i*this.resolution);
                line(0, 0, cos(angle)*this.resolution, sin(angle)*this.resolution);
                pop();
                yoff+=0.01;
            }
            xoff+=0.01;
        }
    }
    lookUp(lookup)
    {
      
      var r = int(constrain(lookup.x/this.resolution, 0, this.row-1));
      var c = int(constrain(lookup.y/this.resolution, 0, this.col-1));
      return this.field[r][c].copy();
    }
}