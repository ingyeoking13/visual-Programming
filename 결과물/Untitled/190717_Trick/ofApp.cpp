#include "ofApp.h"

void ofApp::setup() 
{

	ofBackground(239);
	ofSetBackgroundAuto(true);
	ofSetVerticalSync(true);

	trick = make_shared<Trick>();
	trick->setup();

}

void ofApp::update() {
	trick->update();
}

void ofApp::draw()
{
	trick->display();
}

int main() {
	ofSetupOpenGL(1920, 1024, OF_WINDOW);			// <-------- setup the GL context
	ofRunApp(new ofApp());
}
