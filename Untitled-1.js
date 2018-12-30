var period=120;
function setup()
{
    createCanvas(800, 800);
    frameRate(60);
}

function draw()
{
    background(255);
    var x =300*sin(TWO_PI* frameCount/period)
    translate(width/2, height/2);
    line(0, 0, x, 0);
    ellipse(x, 0, 30, 30);

}