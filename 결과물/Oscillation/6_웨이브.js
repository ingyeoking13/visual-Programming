var scl=10;
var aa=0;
function setup()
{
    createCanvas(800, 800);
    frameRate(60);
    colorMode(HSB);
}

function draw()
{
    background(255);
    for (var i=0; i<width/scl; i++)
    {
        push();
        var y = (width/2)*cos(TWO_PI*i*scl/width+aa);
        aa+=0.0003;
        
        fill(map(y, -width/2, width/2, 0, 255), 255, 255);
        translate(i*scl, height/2);
        ellipse(0, y, 30, 30);
        pop();
    }
}