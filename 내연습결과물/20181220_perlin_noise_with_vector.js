var inc = 0.055;
var scl = 20;
var fr;
var zz=0;

var cols, rows;
var mm;
function setup()
{
    //frameRate(30);
    mm = createCanvas(1000, 1000);
    background(255);
    cols = floor(width/scl);
    rows = floor(height/scl);
    fr = createP('');
}

var t=0;

function draw()
{
    background(255);
    randomSeed(1);
    var yy=0;
    var xx;
    for ( var y =0; y<rows; y++)
    {
         xx=0;
        for ( var x = 0; x<cols; x++)
        {
            var angle = noise(xx, yy,zz) * TWO_PI;
            var v = p5.Vector.fromAngle(angle);
            xx+=inc;
            push();
            translate(x*scl, y*scl);
            rotate(v.heading());
            stroke((noise(xx,  yy, zz)*255)%100+random(150), (noise(xx, yy, zz)*255%200+30)%100, (noise(xx, yy,zz)*255%100+random(150)));
            line(0, 0, scl/2, 10);
            pop();

        }
        yy+=inc;
    }
    zz+=inc;

    fr.html(frameRate());
}
