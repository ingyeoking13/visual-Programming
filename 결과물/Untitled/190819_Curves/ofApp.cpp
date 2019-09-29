#include "ofApp.h"

void ofApp::setup() {

	ofSetFrameRate(60);
	ofSetWindowTitle("openFrameworks");

	ofBackground(239);
	for (int i=0; i<ofGetWidth(); i++)
	{
		height.push_back(rand());
	}
}

//--------------------------------------------------------------
void ofApp::update() {
	for (int i = 0; i < timeSteps; i++) {
		if (a.chkCollisionWithRect(b))
		{
			double v1 = a.CollisionWithRect(b);
			double v2 = b.CollisionWithRect(a);
			a.vel.x = v1;
			b.vel.x = v2;
			cnt++;
			chk = true;
		}
		if (a.chkCollisionWithWall())
		{
			a.CollisionWithWall();
			cnt++;
			chk = true;
		}
		a.update();
		b.update();
	}
}

//--------------------------------------------------------------
void ofApp::draw() {
	if (chk)
	{
		str = string(itoa(cnt, s, 10));
		chk = false;
	}

	ofSetColor(39);
	ofDrawRectangle(a.pos, a.width, a.width);
	ofDrawLine(100, 0, 100, ofGetHeight());
	ofSetColor(139);
	ofDrawRectangle(b.pos, b.width, b.width);

	ofSetColor(39);
	font.drawString(str, ofGetWidth() / 2, ofGetHeight() / 2);
	font.drawString(
		u8"Power : " +
		ofToString(ppow), ofGetWidth() / 2, ofGetHeight() / 2 - 100);
	font.drawString(
		u8"key 'd', 'u'", ofGetWidth() / 2, ofGetHeight() / 2 - 200);
}

void ofApp::keyPressed(int key)
{
	switch(key)
	{ 
	case 'u' :
		ppow++;
		if (ppow == 10) ppow--;
		setup();
		break;
	case 'd' :
		ppow--;
		if (ppow == 0) ppow++;
		setup();
		break;
	}
	
}

//--------------------------------------------------------------
int main() {
	ofSetupOpenGL(1420, 960, OF_WINDOW);
	ofRunApp(new ofApp());
}
