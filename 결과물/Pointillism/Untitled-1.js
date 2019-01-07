
var smallPoint=20;
var largePoint=60;
var width , height;
var z=0;
var colors=[];
var angle=0;

function setup()
{
    createCanvas(1200, 900);
    width=20, height=15;
    noStroke();
    colors.push(color(255, 200, 0, 10));
    colors.push(color(237, 70, 47, 3));
}

function draw()
{
    for (var i=0; i<5; i++)
    {
    var v = p5.Vector.random2D();

    var wave = map(sin(angle), -1, 1, 0, 4);

    v.mult(random(1, 20*wave));
    var pointillize = random(smallPoint, largePoint);
    var x = mouseX + v.x;
    var y = mouseY + v.y;
    fill(colors[z]);
    ellipse(x, y, pointillize, pointillize);
    }
    if (random(0,1)<0.3)
    {
        z=0;
    }
    else z=1;
    angle+=0.02;
}