#include "ofApp.h"

void ofApp::setup() 
{
	ofSetBackgroundColor(239);
	ofSetColor(39);

	ofTrueTypeFont font;

	font.loadFont("BMHANNAPro.ttf", 180);

	fbo.allocate(ofGetWidth(), ofGetHeight());
	fbo.begin();

	ofTranslate(ofGetWidth()*0.5, ofGetHeight()*0.5);
	string str = u8"ABCD, HELLO!";
	font.drawString(str, font.stringWidth(str) * -0.5, font.stringHeight(str) * 0.5);
	fbo.end();

}

void ofApp::update() {
	ofSeedRandom(39);
}

void ofApp::draw() 
{
	fbo.draw(0, 0);

	int w = ofGetWidth();
	int h = ofGetHeight();

	ofPushMatrix();
	ofSetColor(239);
	ofTranslate(0.5 * w, 0.5 * h);

	ofRotate(45);
	for (int i = 1; i <= 20; i++)
	{
		auto noise = ofNoise(i*0.1, ofGetFrameNum() * 0.0005, ofRandom(10)*0.05);

		auto lineWidth = ofMap(noise, 0, 1, 1, 20);
		int height = i*lineWidth+10 + ofGetFrameNum()*20;

		height = height%(2*h)-h;

		ofSetLineWidth(lineWidth);
		ofDrawLine(glm::vec2(-0.5*w, height), glm::vec2(1.5*w, height));
	}
	ofPopMatrix();
}

int main() {
	ofSetupOpenGL(1920, 1024, OF_WINDOW);			// <-------- setup the GL context
	ofRunApp(new ofApp());
}
