var inc = 0.005;
var scl = 5;
var fr;
var zz=0;

var cols, rows;
var mm;
var cnv;
var gif;
var capturer;
function setup()
{
    //frameRate(30);
    mm = createCanvas(600, 600);
    cnv = mm.canvas;
    background(255);
    cols = floor(width/scl);
    rows = floor(height/scl);
    fr = createP();

    var start_rec = createButton("Start Recording");
    start_rec.mousePressed(startt);

    var stop_rec = createButton("Stop Recording");
    stop_rec.mousePressed(stopp);
    capturer = new CCapture({ 
        format: 'gif', 
        quality: '30',
        workersPath : 'addons/ccapture.js-master/src/'
     }); 

    start_rec.position(500, 500);
    stop_rec.position(650, 500);
    
}

function startt()
{
    capturer.start();
    draw();
}
function stopp()
{
    capturer.stop();
    capturer.save();
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
            line(0, 0, scl/2, random(100));
            pop();

        }
        yy+=inc;
    }
    zz+=inc;

    fr.html(frameRate());
    capturer.capture(cnv);

}
