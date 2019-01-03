class Vehicle
{
    constructor()
    {
        this.vel = createVector(3,3);
        this.acc = createVector(0, 0);
        this.loc = createVector(random(width),random(height));
        this.size= 10;
        this.mxspeed = random(3, 5);
        this.col = random(255);
        this.mxforce = random(0.15, 0.30);
        this.chk=0;
    }
    work(path)
    {
        var normpoint = this.pursuit(path);

        push();
        colorMode(HSB, 255);
        if (this.chk==0) fill(this.col, 255, 255);
        else fill(255, 255, 255);
        ellipse(normpoint.x, normpoint.y, 15, 15);
        pop();

        if (this.chk==1) this.seek(normpoint);
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
        triangle(-this.size/2, -this.size*4, this.size/2,-this.size*4, 0,0);
        pop();
    }
    pursuit(path)
    {
        var predict = this.vel.copy();
        predict.normalize();
        predict.mult(25);

        var predictLoc = p5.Vector.add(this.loc, predict);

        // distance perpendicular between predictLoc and Path Line 
        var truenormpoint=createVector(path.points[0]);
        var mxx=1e9;
        var j=0;
        for (var i=0; i<path.points.length-1; i++)
        {
            if ( predictLoc.x < path.points[i].x || predictLoc.x > path.points[i+1].x ) continue;
            var a = p5.Vector.sub(predictLoc, path.points[i]);
            var b = p5.Vector.sub(path.points[i+1], path.points[i]);

            b.normalize();
            b.mult(a.dot(b));

            var normpoint = p5.Vector.add(path.points[i], b);

            if ( normpoint.x < min(path.points[i].x,path.points[i+1].x) || normpoint.x >= max(path.points[i+1].x, path.points[i].x))
            {
                normpoint = path.points[i+1].copy();
            }

            var dd = p5.Vector.dist(normpoint, predictLoc);

            if ( dd < mxx) 
            {
                mxx = dd;
                truenormpoint = normpoint.copy();
                j=i;
            }
        }

        // retrieve target point
        var dir = p5.Vector.sub(path.points[j+1], path.points[j]);
        dir.normalize();
        dir.mult(10);
        var target = p5.Vector.add(dir, truenormpoint);

        push();
        fill(255, 0, 0);
        ellipse(predictLoc.x, predictLoc.y, 5, 5);
        line(predictLoc.x, predictLoc.y, truenormpoint.x, truenormpoint.y);
        
        fill(150);
        ellipse(truenormpoint.x, truenormpoint.y, 5, 5);

        fill(0);
        ellipse(target.x, target.y, 10, 10);
        pop();
        var dist = p5.Vector.dist(truenormpoint, predictLoc);

        if ( dist <= path.radius/2) this.chk=0;
        else this.chk=1;

        return target;
    }
    seek(v)
    {
        var desiredVelocity =  p5.Vector.sub(v,this.loc) ;
        desiredVelocity.normalize();
        desiredVelocity.mult(this.mxspeed);

        var steering = p5.Vector.sub(desiredVelocity, this.vel);
        steering.limit(this.mxforce);
        this.force(steering);
    }
    chkedge()
    {
        if(this.loc.x<=0 ) this.loc.x = width;
        else if (this.loc.x>= width) this.loc.x = 0, this.loc.y=this.loc.y*1/2;

        if(this.loc.y <=0 ) this.loc.y = height;
        else if (this.loc.y >= height) this.loc.y= 0;
    }
}

class Path
{
    constructor()
    {
        this.radius=40;
        this.s = createVector(0, height/3);
        this.e = createVector(width, 2*height/3);
        this.points= []
        var mxx = 4;
        for (var i=0; i<mxx; i++)
        {
            this.points[i] = createVector(width/(mxx+2)*(i+1), random(100, height-100));
        }
        this.points[0] = this.s;
        this.points[mxx] = this.e;
    }


    display()
    {
        for (var i=0; i<this.points.length-1; i++)
        {
            strokeWeight(this.radius);
            stroke(0,100);
            line(this.points[i].x, this.points[i].y, this.points[i+1].x, this.points[i+1].y);
            strokeWeight(1);
            stroke(0);
            line(this.points[i].x, this.points[i].y, this.points[i+1].x, this.points[i+1].y);
        }
    }
}