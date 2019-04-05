var r = 5;
var cnt = 700;
var grid = [];
var w = r / Math.sqrt(2);
var active = [];
var order = [];
var cols, rows;

function setup()
{
    createCanvas(500, 500);
    background(0);
    strokeWeight(4);

    // STEP 0
    cols = floor(width /w);
    rows = floor(height /w);
    for (var i=0; i< cols * rows; i++) grid[i] = undefined;

    // STEP 1
    var x = width/2;
    var y = height/2;
    var i = floor(x/w), j = floor(y/w);
    var pos = createVector(x, y);
    grid[i+ j*cols] = pos;
    active.push(pos);
    colorMode(HSB);

}

function draw()
{
    //noLoop();
    for (var mm =0; mm<30; mm++)
    {
        if (active.length > 0)
        {
            var ran = floor(random(active.length));
            var pos = active[ran];
            var found = false;

            for (var i=0; i<cnt; i++)
            {
                var sample = p5.Vector.random2D();
                var m = random(r, 2*r);
                sample.setMag(m);
                sample.add(pos);

                var col = floor(sample.x/w);
                var row = floor(sample.y/w);

                if ( col < 0 || row < 0 || col >=cols || row >= rows) continue;
                if ( grid[col+row*cols] ) continue;

                var chk = true;
                for (var j = -1; j<=1; j++)
                {
                    for (var k = -1; k<=1; k++)
                    {
                        var idx = (col+j) + (row+k)*cols;
                        var neighbor = grid[idx];
                        if ( !neighbor ) continue;

                        var d = p5.Vector.dist(sample, neighbor);
                        if ( d < r) chk = false;
                    }
                }

                if(chk)
                {
                    found = true;
                    grid[col + row*cols] = sample;
                    order.push(sample);
                    active.push(sample);
                    break;
                }
            }

            if( !found ) active.splice(ran, 1);
        }
    }

    for (var i =0; i< order.length; i++)
    {
        if( !order[i] ) continue;
        stroke(i%360, 100, 100);
        //stroke(255);
        strokeWeight(r*0.3);
        point(order[i].x, order[i].y);
    }
    for (var i =0; i< active.length; i++)
    {
        if( !active[i] ) continue;
        stroke(i%360,100 , 100);
        strokeWeight(r*0.3);
        point(active[i].x, active[i].y);
    }
    
   // console.log(active.length);
}