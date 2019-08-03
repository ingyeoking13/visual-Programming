#include "ofApp.h"
#include <time.h>

void ofApp::setup() {
	ofSetFrameRate(60);
	ofSetLineWidth(2);
	ofSetRectMode(ofRectMode::OF_RECTMODE_CENTER);
	ofBackground(239);
	fbo.allocate(ofGetWidth(), ofGetHeight());
}
void ofApp::update() {
	ofSeedRandom(39);

	fbo.begin();

	ofTranslate(ofGetWidth() * 0.5, ofGetHeight() * 0.5);
	ofClear(239);
	ofFill();
	ofSetColor(39);

	float radius = 50;
	float rainbow_height = 40;

	for (int i = 0; i <7; i++)
	{
		ofRotateZ(ofGetFrameNum() * 0.5);

		auto deg = ofMap(ofNoise(i*0.01,ofGetFrameNum() * 0.01), 0, 1, -180, 540);
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
		radius += rainbow_height + 20;

		ofEndShape(true);
	}

	fbo.end();

	fbo.readToPixels(pixels);
	locations.clear();

	for (int x = 0; x < fbo.getWidth(); x += (span))
	{
		for (int y = 0; y < fbo.getHeight(); y += (span))
		{
			if (pixels.getColor(x, y) == ofColor(39))
			{
				locations.push_back(glm::vec2(x-ofGetWidth()*0.5, y-ofGetHeight()*0.5));
			}
		}
	}
}

void ofApp::draw() {

	this->cam.begin();

	double threshold = 0.8;
	for (auto item : locations)
	{
		ofPushMatrix();
		auto noise = ofNoise(item.x*0.005,  item.y* 0.005, ofGetFrameNum() * 0.005);
		int zz= 0; float xx =0;
		if (noise > threshold)
		{
			zz = ofMap(noise, threshold, 1, 0, 80);
			xx = ofMap(noise, threshold, 1, 0, 360 * 5);
		}

		ofTranslate(glm::vec3(item.x, item.y, zz));
		ofRotateX(xx);
		ofRotateY(xx);
		ofFill();
		ofSetColor(239);
		ofDrawRectangle(glm::vec3(0,0,0), span-2, span-2);


		ofNoFill();
		ofSetColor(39);
		ofDrawRectangle(glm::vec3(0, 0,0), span, span);

		ofPopMatrix();
	}
	this->cam.end();
}

int main() {
	ofSetupOpenGL(1920, 1024, OF_WINDOW);			// <-------- setup the GL context
	ofRunApp(new ofApp());
}