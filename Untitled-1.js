var symbolSize= 30;
var streams = [];
var mxStream= 90; 
var mxLines = 50;

var lines = [];
function setup()
{
    createCanvas(
        window.innerWidth, 
        window.innerHeight
    );

    for (var i =0; i<mxStream; i++)
    {
        var x = random(0, width);
        var y = random(0, height);
        streams[i] = new Stream(x, y);
        streams[i].generateSymbols();
    }
    for (var i=0; i<mxLines; i++)
    {
        lines[i] = new movingLine( random(width), random(height) );
    }

    textSize(symbolSize);
    background(0);
}

function draw()
{
    background(0,120);
    for (var i=0; i<streams.length; i++)
    {
        streams[i].render();
    }
    for (var i=0; i<lines.length; i++)
    {
        lines[i].render();
        lines[i].force(createVector(0, random(5,10)));
        lines[i].fluidResist_toPrevPoint();
    }
}
