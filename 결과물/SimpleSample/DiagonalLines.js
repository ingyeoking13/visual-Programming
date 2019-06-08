var bckground = 255;
var strk = 0;
var aangle;
function blackBackground() {
    bckground = 0;
    strk = 255;
    setup();
}

function whiteBackground() {
    bckground = 255;
    strk = 0;
    setup();
}
function setup() {

    aangle = HALF_PI *0.3;
    var cvs = createCanvas(windowWidth, 140); 
    //cvs.parent("sketch-div");
    strokeWeight(0.2);
    stroke(strk);

}
var ddd =0;
function draw()
{
        for (var i = 0; i < 50; i++) {
            push();
            translate(i * 4, 0);
            rotate(aangle);
            line(0, 0, width, 0);
            pop();
        }
        for (var i = 0; i < 50; i++) {
            push();
            var sx = (1 / tan(aangle)) * height;
            translate(sx + i * 4, height);
            rotate(-aangle);
            line(0, 0, width, 0);
            pop();
        }
    
}