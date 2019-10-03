# 20190926_Waves

![.](./waves.gif)

오랜만이다. 그간 많은 일이 있어 정신을 못차리고... 알고리즘도 대충하고 ... 흑흑 ...  일은 하고 있는데 성장은 멈춘 느낌이랄까 ...   
소스는 아래에... 후후   
 
```c++
vector<glm::vec2> v, v2, v3;
double fv=777, fv2=132, fv3=0;

void ofApp::setup() {

	ofSetFrameRate(60);
	ofSetWindowTitle("openFrameworks");
	//font.loadFont("BMHANNAPro.ttf", 90);

	ofBackground(239);
}

void ofApp::update() {
	ofSeedRandom(39);
	v.clear();

	v.push_back({ 0, ofGetHeight() });
	for (int i = 1; i < ofGetWidth()-1; i+=3)
	{
		v.push_back(glm::vec2(i, ofMap(ofNoise(i * 0.001, ofGetFrameNum()*0.00001,fv+=0.000001), 0, 1, 0, ofGetHeight())));
	}
	v.push_back({ ofGetWidth() - 1, ofGetHeight() });

	v2.clear();

	v2.push_back({ 0, ofGetHeight() });
	for (int i = 1; i < ofGetWidth()-1; i+=3)
	{
		v2.push_back(glm::vec2(i, ofMap(ofNoise(i * 0.001, ofGetFrameNum()*0.00001, fv2+=0.000001), 0, 1, 0, ofGetHeight())));
	}
	v2.push_back({ ofGetWidth() - 1, ofGetHeight()});

	v3.clear();
	v3.push_back({ 0, ofGetHeight() });
	for (int i = 1; i < ofGetWidth()-1; i+=3)
	{
		v3.push_back(glm::vec2(i, ofMap(ofNoise(i * 0.001, ofGetFrameNum()*0.00001, fv3+=0.000001), 0, 1, 0, ofGetHeight())));
	}
	v3.push_back({ ofGetWidth() - 1, ofGetHeight() });
}

//--------------------------------------------------------------
void ofApp::draw() {
	ofSetColor(0, 39, 255, 50);
	ofBeginShape();
	ofVertices(v);
	ofEndShape();

	ofSetColor(233, 233, 39,39);
	ofBeginShape();
	ofVertices(v2);
	ofEndShape();

	ofSetColor(0, 111, 100, 40);
	ofBeginShape();
	ofVertices(v3);
	ofEndShape();
}
```

