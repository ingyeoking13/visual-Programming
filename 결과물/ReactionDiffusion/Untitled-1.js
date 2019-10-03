var grid;
var next;
var pixelsa;

var DiffusionRateA = 1.0;
var DiffusionRateB = 0.5;
var feedRateA = 0.085;
var killRateB = 0.062;

function setup()
{
    createCanvas(250, 250);
    pixelDensity(1);

    grid=[];
    next=[];

    for (var x = 0; x< width; x++)
    {
        grid[x] = [];
        next[x] = [];

        for (var y = 0; y<height; y++)
        {
            grid[x][y] ={a:1, b:0};
            next[x][y] ={a:1, b:0};
        }
    }
    for (var x = 50; x<55; x++)
        for (var y= 50; y<55; y++)
            grid[x][y].b =1;
}

function draw()
{

    loadPixels();
    var piexlesa =[]; 
    for (var i =0; i<pixels.height; i++)
    {
        pixelsa[i] =[];
    }

    pixelsa = pixels;
    for (var time=0; time<20; time++)
    {

        for (var x=1; x< width-1; x++)
        {
            for (var y=1; y<height-1; y++)
            {
                var a = grid[x][y].a; 
                var b = grid[x][y].b;

                next[x][y].a = a
                        + (DiffusionRateA*laplaceA(x,y)) 
                        - (a*b*b)
                        + (feedRateA*(1-a));

                next[x][y].b = b
                        + (DiffusionRateB*laplaceB(x,y))
                        + (a*b*b)
                        - ((killRateB+feedRateA)*b);

                if (next[x][y].a>1) next[x][y].a =1;
                if (next[x][y].a<0) next[x][y].a =0;

                if (next[x][y].b>1) next[x][y].b =1;
                if (next[x][y].b<0) next[x][y].b =0;
            }
        }


        for (var x = 0; x< width; x++)
        {
            for (var y = 0; y<height; y++)
            {
                var pix = (x+ y*width)*4;
                var c = floor((next[x][y].a - next[x][y].b)*255);
                c = constrain(c, 0, 255);
;
                pixelsa[pix+0] = c;
                pixelsa[pix+1] = c;
                pixelsa[pix+2] = c;
                pixelsa[pix+3] = 255;

            }
        }

        grid = next;
    }
    pixels = pixelsa;

    updatePixels();
}

function laplaceA(x, y)
{
    var ret=0;
    ret += grid[x][y].a*-1;

    for (var i=-1; i<=1; i++ )
    {
        if ( i == 0) continue;
        ret += grid[x+i][y].a * 0.2;
        ret += grid[x][y+i].a * 0.2;
    }

    for (var i=-1; i<=1; i++)
    {
        for (var j=-1; j<=1; j++)
        {
            if ( i== 0 || j==0 ) continue;
            ret += grid[x+i][y+j].a*0.05;
        }
    }
    return ret;
}

function laplaceB(x,y)
{
    var ret=0;
    ret += grid[x][y].b *-1
    for (var i=-1; i<=1; i++ )
    {
        if ( i == 0) continue;
        ret += grid[x+i][y].b * 0.2;
        ret += grid[x][y+i].b * 0.2;
    }

    for (var i=-1; i<=1; i++)
    {
        for (var j=-1; j<=1; j++)
        {
            if ( i== 0 || j==0 ) continue;
            ret += grid[x+i][y+j].b*0.05;
        }
    }
    return ret;

}