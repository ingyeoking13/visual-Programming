#include "ofApp.h"
#include <time.h>

vector<glm::vec2> locations;
int width=30;

void ofApp::setup() {
	ofSetFrameRate(60);
	ofSetLineWidth(3);
	ofSetColor(39);
	ofBackground(239);
	ofEnableDepthTest();
	locations =
	{
		glm::vec2(0, -50),
		glm::vec2(0, -100),
		glm::vec2(0, -150),
		glm::vec2(0, -200),
		glm::vec2(0, -250),
		glm::vec2(0, -300),
		glm::vec2(0, -350),
		glm::vec2(0, -400),
		glm::vec2(0, 0),
		glm::vec2(0, +50),
		glm::vec2(0, +100),
		glm::vec2(0, +150),
		glm::vec2(0, +200),
		glm::vec2(0, +250),
		glm::vec2(0, +300),
		glm::vec2(0, +350),
		glm::vec2(0, +400)
	};
}
void ofApp::update() {
	ofSeedRandom(39);
}

void ofApp::draw() {
	this->cam.begin();

	auto force = sin(ofNoise(ofGetFrameNum() * 0.007)*PI);
	if (force <= -0.8) force = -0.8;

	for (int i = 0; i < locations.size(); i++)
	{

		int sz = locations.size();

		ofPushMatrix();
		auto x = locations[i].y, y = locations[i].x;

		ofTranslate(x*(force+1), y);

		auto noise = ofNoise(i * 0.1, ofGetFrameNum() * 0.001, ofRandom(10)*0.001);
		if (noise >= 0.3)
		{
			ofRotateX(ofMap(noise, 0.3, 1, 0, 360 * 3));
		}
		auto m = width * 3;

		ofFill();
		ofSetColor(39);
		ofDrawBox(glm::vec3(0, 0, 0), width,m, m);

		ofNoFill();
		ofSetColor(239);
		ofDrawBox(glm::vec3(0, 0, 0), width,m, m);

		ofPopMatrix();
	}

	this->cam.end();
}

int main() {
	ofSetupOpenGL(1920, 1024, OF_WINDOW);			// <-------- setup the GL context
	ofRunApp(new ofApp());
}