# 190622_CircleCircular
from `Junkiyoshi blog`.  

![.](190622_CircleCircular.gif)

## impressing Part

1. Z축 회전의 의미를 알게되었다. 그림상에서 원 중심을 관통하는 축을 기준으로 회전시키는 것임. 각 스트링 마다 회전 Z축이 다르니 시작위치가 달라 보이는 것이다. 

````C++
this->cam.begin();

float radius = 50;
float rainbow_height = 30;

ofColor color;
for (int i = 0; i < 7; i++)
{
    color.setHsb(i * 42, 255, 255);
    ofSetColor(color);

    ofRotateZ(ofGetFrameNum() * 0.5);

    auto deg = ofMap(ofNoise(i*0.003,ofGetFrameNum() * 0.003), 0, 1, -90, 540);
    if (deg < 0) { deg = 0; }

    ofBeginShape();
    for (int i = 0; i < deg; i++)
    {
        auto x = radius * cos(i * DEG_TO_RAD);
        auto y = radius * sin(i * DEG_TO_RAD);
        ofVertex(x, y);
    }

    for (int i = deg; i >= 0; i--)
    {
        auto x =( radius +rainbow_height )* cos(i * DEG_TO_RAD);
        auto y =( radius +rainbow_height )* sin(i * DEG_TO_RAD);
        ofVertex(x, y);
    }
    radius += rainbow_height + 5;

    ofEndShape(true);
}

this->cam.end();
````