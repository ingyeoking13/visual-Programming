var r = 3;
var cnt = 30;
var grid = [];
var w = r / Math.sqrt(2);
var active = [];
var drawed = [];
var cols, rows;

var clicked = false;

function setup()
{
    createCanvas(500,200);
    background(255);
    strokeWeight(4);

    // STEP 0
    cols = floor(width /w);
    rows = floor(height /w);
    for (var i=0; i< cols * rows; i++) grid[i] = undefined;
    strokeWeight(r*0.3);
}

function mouseClicked()
{
    clicked=true;
    // STEP 1
    var x = mouseX;
    var y = mouseY;
    var i = floor(x/w), j = floor(y/w);
    var pos = createVector(x, y);
    grid[i+ j*cols] = pos;
    active.push(pos);
}

function draw()
{
    
    for (var mm =0; mm<50; mm++)
    {
        if(active.length > 0)
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
                    drawed.push(sample);
                    active.push(sample);
                    break;
                }
            }

            if( !found ) active.splice(ran, 1);
        }
    }

    while(drawed.length > 0 )
    {
        var cur = drawed.shift();
        point(cur.x, cur.y);
    }

}