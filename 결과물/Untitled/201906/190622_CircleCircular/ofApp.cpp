#include "ofApp.h"

//--------------------------------------------------------------
void ofApp::setup() {
	ofBackground(239);
}

void ofApp::update() {
}

void ofApp::draw() {
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
}

int main() {
	ofSetupOpenGL(1960, 1020, OF_WINDOW);			// <-------- setup the GL context
	ofRunApp(new ofApp());
}