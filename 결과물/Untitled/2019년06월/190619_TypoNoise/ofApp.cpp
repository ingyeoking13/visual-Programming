#include "ofApp.h"

//--------------------------------------------------------------
void ofApp::setup() {
	ofSetColor(39);
	ofBackground(239);

	ofTrueTypeFontSettings settings("malgun.ttf", 44);
	settings.antialiased = true;
	settings.contours = true;
	settings.dpi = 72;
	settings.addRanges(ofAlphabet::Korean);
	this->font.load(settings);

}

//--------------------------------------------------------------
void ofApp::update() {
	ofSeedRandom(39);
}

//--------------------------------------------------------------
void ofApp::draw() {
	vector<string> s =
	{
		u8"안", u8"녕", u8"하", u8"세", u8"요"
	};

	for (int y = 0; y < ofGetWidth(); y+=50)
	{
		for (int x = 0; x < ofGetHeight(); x+=50)
		{
			int idx = ofMap(ofNoise(ofGetFrameNum()*0.005, x*0.0005, y*0.0005), 0, 1, 0, 5);
			this->font.drawString(s[idx], y, x);
		}
	}
}

int main() {
	ofSetupOpenGL(1960, 1020, OF_WINDOW);			// <-------- setup the GL context
	ofRunApp(new ofApp());
}