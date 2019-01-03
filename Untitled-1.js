var v=[];
var field;
var mxnumber=100;
function setup()
{
    createCanvas(1200, 900);
    for (var i=0; i<mxnumber; i++)
    {
        v[i] = new Vehicle();
    }
    field = new FlowField();
}

function draw()
{
    background(255);
    //field.display();
    for (var i=0; i<mxnumber; i++)
    {
        v[i].work(v);
        v[i].force(field.lookUp(v[i].loc).div(5));
    }
}