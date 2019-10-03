# 190701_OverlayFonts
from `junkiyoshi blog`

![.](190701_OverlayFonts2.gif)

## impressing Part

1. 텍스트 윤곽을 잡는법을 알게 되었다. 이전 예제에서는 미리 화폭에 글자를 적은 다음, 단위 픽셀 크기만큼 화폭을 순회하며 글자를 적힌 부분을 탐색한다. 그리고 그곳에 글자를 적었다. 그러나 이번 예제에서는 `Contour`라는 개념을 사용한다. `Setting`에서 `Contour` 사용을 체크해주고, `ofTrueTypeFont.getStringAsPoints` 또는 `.getCharacterAsPoints` 함수를 쓰면 해당 글자의 윤곽을 잡아낸다. 이 윤곽은 `ofPath` 자료형 이고 이 자료형은 `polyline`을 포함하고 있다. `polyline`이란 일반적으로 점들의 집합을 나타낸다. `ofBeginShape()`으로 점들을 순회하며 그림을 그린다. 똑똑하고 정교한 접근처럼 느껴진다.  

````C++
void ofApp::setup() {
    //....
	ofTrueTypeFontSettings settings("BMHANNAPro.ttf", 60);
	settings.contours = true;
	settings.antialiased = true;
	settings.addRanges(ofAlphabet::Korean);
	this->font.load(settings);
    //...
}


void ofApp::draw(){
for (int x = -240; x <= 240; x += 70) {
    for (int y = -240; y <= 240; y += 70) {
        for (int z = -50; z <= 50; z +=30) {

            int noise = ofMap(
                ofNoise( x*0.005, y*0.005, z*0.005 + ofGetFrameNum() * 0.005), 
                0, 1, 0, vstr.size() 
            );

            string noise_char = string(vstr[noise]);

            ofPushMatrix();
            ofTranslate(x, y, z);
            ofRotateX(180);

            auto path = font.getStringAsPoints(noise_char, true, false);
            auto outline = path[0].getOutline();

            ofFill();
            ofSetColor(239);
            ofBeginShape();
            for (int line_index = 0; line_index < outline.size(); line_index++) {

                if (line_index != 0) ofNextContour(true); 

                auto vertices = outline[line_index].getVertices();
                ofVertices(vertices);
            }
            ofEndShape(true);

            ofNoFill();
            ofSetColor(39);
            ofBeginShape();
            for (int line_index = 0; line_index < outline.size(); line_index++) {

                if (line_index != 0) ofNextContour(true); 

                auto vertices = outline[line_index].getVertices();
                ofVertices(vertices);
            }
            ofEndShape(true);

            ofPopMatrix();
        }
    }
}
}
````