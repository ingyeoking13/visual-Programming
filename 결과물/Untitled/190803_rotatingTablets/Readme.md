# 190803_rotatingTablets


![.](190803_rotatingTablets.gif) 

## source part

````C++
vector<glm::vec3> top, bottom;
vector<glm::vec3> a, b, c, d;

void ofApp::setup() {

	ofSetFrameRate(60);
	ofSetWindowTitle("openFrameworks");

	ofBackground(239);

	int radius = 50, depth = 15, span = 5;

	for (auto deg = 0; deg < 360; deg += span) {
		top.push_back(glm::vec3(radius * cos(deg * DEG_TO_RAD), radius * sin(deg * DEG_TO_RAD), depth * 0.5));
		bottom.push_back(glm::vec3(radius * cos(deg * DEG_TO_RAD), radius * sin(deg * DEG_TO_RAD), depth * -0.5));

		a.push_back(glm::vec3(radius * cos(deg * DEG_TO_RAD), radius * sin(deg * DEG_TO_RAD), depth * 0.5 + 1));
		b.push_back(glm::vec3(radius * cos((deg + span) * DEG_TO_RAD), radius * sin((deg + span) * DEG_TO_RAD), depth * 0.5 + 1));
		c.push_back(glm::vec3(radius * cos((deg + span) * DEG_TO_RAD), radius * sin((deg + span) * DEG_TO_RAD), depth * -0.5 - 1));
		d.push_back(glm::vec3(radius * cos(deg * DEG_TO_RAD), radius * sin(deg * DEG_TO_RAD), depth * -0.5 - 1));
	}

	ofEnableDepthTest();
}
void ofApp::update() {
	ofSeedRandom(39);
}
void ofApp::draw() {

	this->cam.begin();

	for (int x = -300; x <= 300; x += 150) {

		for (int y = -300; y <= 300; y += 150) {

			ofPushMatrix();
			ofTranslate(x, y);

			auto rotate = ofMap(ofNoise(x * 0.005, y * 0.005, ofGetFrameNum() * 0.005), 0, 1, -360, 360);
			ofRotateY(rotate);
			ofRotateX(rotate);

			ofSetColor(39);
			for (int i = 0; i<a.size(); i++)
			{
				ofBeginShape();
				ofVertex(a[i]);
				ofVertex(b[i]);
				ofVertex(c[i]);
				ofVertex(d[i]);
				ofEndShape(true);
			}
			ofSetColor(239);

			ofBeginShape();
			ofVertices(top);
			ofEndShape(true);

			ofBeginShape();
			ofVertices(bottom);
			ofEndShape(true);

			ofPopMatrix();
		}
	}
	this->cam.end();
}
````

원과 원통 부분을 그린다. 원통을 그린 것은 a, b, c, d 로 묶어서 그린다.  
참 재밌다. `junkiyoshi`는 참 소스를 깔끔하게 짜서 좋다.   
