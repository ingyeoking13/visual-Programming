var v=[];
var mxnumber=50;
function setup()
{
    createCanvas(1200, 900);
    for (var i=0; i<mxnumber; i++)
    {
        v[i] = new Vehicle();
    }
}

function draw()
{
    background(255);
    for (var i=0; i<mxnumber; i++)
    {
        v[i].work(v);
    }
}