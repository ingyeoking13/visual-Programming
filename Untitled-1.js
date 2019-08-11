var grid;// = [[1,1,1],[1,1,1],[1,1,1]];
var next;

var dA = 1.0;
var dB = 0.5;
var feed= 0.055;
var k = 0.062;


function setup() 
{
    createCanvas(480, 320); 
    pixelDensity(1);
    grid = [];
    next = [];
    for (var x = 0; x< width; x++)
    {
        grid[x] = [];
        next[x] = [];
        for (var y = 0; y < height; y++)
        {
            grid[x][y] = { a: random(1), b: random(1) };
            next[x][y] = { a: 0, b: 0 };
        }
    }
}
var ddd =0;
function draw()
{
    background(51);
    loadPixels();

    for (var x = 0; x< width; x++)
    {
        for (var y = 0; y < height; y++)
        {
            next[x][y].a = grid[x][y].a
                +
            next[x][y].b = grid[x][y].b *1.01;
            grid[x][y].a = next[x][y].a;
            grid[x][y].b = next[x][y].b;
        }
    }

    for (var x = 0; x< width; x++)
    {
        for (var y = 0; y < height; y++)
        {
            var pix = (x+y*width)*4;
            pixels[pix+0] = next[x][y].a*255;
            pixels[pix+1] = 0;
            pixels[pix+2] = next[x][y].b*255;
            pixels[pix+3] = 255;
        }
    }
    updatePixels();

}