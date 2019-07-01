# 190622_TypoTiles
from `Junkiyoshi blog`.  

![.](tile.gif)
![.](190622_TypoTiles.gif)

## Issue

1. 한글 모드에선 크기 130 이상으론 안됨.. 왜?   
해당 폰트에서 130 이상 크기가 안될 줄 알았는데 해당 폰트의 큰 크기의 영어는 
잘만 수행됨. 여러 구문을 삭제하면서 진행해보았지만 런타임 에러 ..   



## impressing Part

1. `ofFbo`의 활용법을 조금 알게 되었음, 레이어로 사용.  

````C++
ofFbo fbo;
fbo.allocate(ofGetWidth(), ofGetHeight());
fbo.begin();
ofClear(0);
ofTranslate(ofGetWidth() * 0.5, ofGetHeight() * 0.5);

string word = "Hi, GUYS";
font.drawString(word, font.stringWidth(word) * -0.5, font.stringHeight(word) * 0.5);
fbo.end();
````

2. ofFbo 레이어에 써내려간 임의의 그림에 대해 픽셀기반으로 추적하는 트릭을 알게 되었음.  

````C++
ofPixels pixels;
fbo.readToPixels(pixels);

this->span = 10;
for (int x = 0; x < fbo.getWidth(); x += this->span) {

	for (int y = 0; y < fbo.getHeight(); y += this->span) {

		if (pixels.getColor(x, y) != ofColor(0, 0)) {

			this->locations.push_back(glm::vec2(x - ofGetWidth() * 0.5, ofGetHeight() - y - ofGetHeight() * 0.5));
		}
	}
}
````

3. 사각형(타일)을 돌려서 그리는 법은 화폭을 돌려서 그린다. 3차원에선 `ofRotateX`,
`ofRotateY`를 쓸 수 있다. 그리고 사각형을 띄우는 것 또한 랜덤하게 구현해서 
사용한다. 이러한 사고가 재밌음.  
한가지 더는, 타일을 3차원의 두께를 가진 것 처럼 보이기 위해 두 사각형을 
겹쳐서 그린다. 옆에서 보면 평평하지만, 위에서 보면 마치 두께있는 타일과 같이 
보인다. 


````C++
void ofApp::setup() {
	ofSetLineWidth(2);
	ofEnableDepthTest();
	ofSetRectMode(ofRectMode::OF_RECTMODE_CENTER);
}
void ofApp::draw() {
	this->cam.begin();

	float threshold = 0.8;
	for (auto& location : this->locations) {

		float noise_value = ofNoise(location.x * 0.005, location.y * 0.005, ofGetFrameNum() * 0.005);
		int z = 0;
		float rotate_x = 0.f;
		if (noise_value > threshold) {

			z += ofMap(noise_value, threshold, 1.0, 0, 300);
			rotate_x = ofMap(noise_value, threshold, 1.0, 0, 360 * 5);
		}

		auto draw_location = glm::vec3(location, z);

		ofPushMatrix();
		ofTranslate(draw_location);
		ofRotateX(rotate_x);
		ofRotateY(rotate_x);

		ofFill();
		ofSetColor(239);
		ofDrawRectangle(glm::vec3(), this->span-2, this->span - 2);

		ofNoFill();
		ofSetColor(39);
		ofDrawRectangle(glm::vec3(), this->span, this->span);

		ofPopMatrix();
	}
	this->cam.end();
}
````

