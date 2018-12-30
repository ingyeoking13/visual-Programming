var mov;
var theta=0;
var r =0;
function setup()
{
    createCanvas(800, 800);
    frameRate(60);
}

function draw()
{
    //background(255);
    var tmp = map(noise(theta), 0, 1, 50, 200);
    var tmp2 = map(noise(theta), 0, 1, 50, 200);
    var tmp3 = map(noise(theta, theta), 0, 1, 50, 200);


    var x = r*cos(theta);
    var y = r*sin(theta);
    translate(width/2, height/2);
    stroke(255);
    fill(tmp, tmp2, tmp3);

    ellipse(x,y, 5, 5);
    theta+=0.008;
    r+=0.05;

}