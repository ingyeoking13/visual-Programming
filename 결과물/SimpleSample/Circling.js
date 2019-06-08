
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
    strokeWeight(1);
    stroke(strk);

}
var ddd =0;
function draw()
{
   // background(255);
    if (ddd <= 400) {
        var x = width / 2;
        var y = height / 2;

        strokeWeight(3);
        fill(0,10);
        ellipse(x, y, ddd);

        var tmp = ddd;
        while (tmp > 10) {
            push();
            noStroke();
            noFill();
            //fill(255,10);
            ellipse(x, y, tmp);
            tmp -= 100;
            pop();
        }
        
        ddd += 10;
    }
}