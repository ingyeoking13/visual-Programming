#include "ofApp.h"

vector<string> vstr =
{
	u8"가", u8"나", u8"다" ,
	u8"라", u8"마", u8"바",
	u8"사", u8"아", u8"자",
	u8"차", u8"카", u8"타",
	u8"파", u8"하"
};

void ofApp::setup() {

	ofSetBackgroundColor(239);
	ofEnableDepthTest();
	ofSetLineWidth(3);
	ofTrueTypeFontSettings settings("BMHANNAPro.ttf", 60);
	settings.contours = true;
	settings.antialiased = true;
	settings.addRanges(ofAlphabet::Korean);
	this->font.load(settings);
}
void ofApp::update() {
}

void ofApp::draw() {
	cam.begin();

	for (int x = -240; x <= 240; x += 70) {
		for (int y = -240; y <= 240; y += 70) {
			for (int z = -50; z <= 50; z +=30) {

				int noise = ofMap(
					ofNoise( x*0.005, y*0.005, z*0.005 + ofGetFrameNum() * 0.005), 
					0, 1, 0, vstr.size() 
				);

				string noise_char = string(vstr[noise]);

				ofPushMatrix();
				ofTranslate(x, y, z);
				ofRotateX(180);

				auto path = font.getStringAsPoints(noise_char, true, false);
				auto outline = path[0].getOutline();

				ofFill();
				ofSetColor(239);
				ofBeginShape();
				for (int line_index = 0; line_index < outline.size(); line_index++) {

					if (line_index != 0) ofNextContour(true); 

					auto vertices = outline[line_index].getVertices();
					ofVertices(vertices);
				}
				ofEndShape(true);

				ofNoFill();
				ofSetColor(39);
				ofBeginShape();
				for (int line_index = 0; line_index < outline.size(); line_index++) {

					if (line_index != 0) ofNextContour(true); 

					auto vertices = outline[line_index].getVertices();
					ofVertices(vertices);
				}
				ofEndShape(true);

				ofPopMatrix();
			}
		}
	}
	cam.end();
}

int main() {
	ofSetupOpenGL(1920, 1024, OF_WINDOW);			// <-------- setup the GL context
	ofRunApp(new ofApp());
}