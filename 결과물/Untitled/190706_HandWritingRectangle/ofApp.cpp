#include "ofApp.h"

void ofApp::setup() {

	ofSetBackgroundColor(255);
	ofSetLineWidth(3);

	double fps = 60;
	ofSetFrameRate(fps);

	ofSetVerticalSync(true);

	fbo.allocate(ofGetWidth(), ofGetHeight(), 6408, 8);
	fbo.begin();
	ofClear(0);
	fbo.end();

	hw = make_shared<HandWriting>();

	std::vector<ofVec2f> p;
	ofVec2f leftTop = ofVec2f(290, 10);
	float size = 175;
	ofRectangle r = ofRectangle(leftTop.x, leftTop.y, size, size);

	for (int i = 0; i < 5; i++) {
		for (int j = 0; j < 5; j++) {
			p.clear();
			ofRectangle tempRect = r;
			tempRect.scaleFromCenter(0.8);
			hw->getRect(p, tempRect);
			points.push_back(p);
			if ((int)ofRandom(0, 2) == 0) {
				int interval = (int)(tempRect.getWidth() / ofRandom(5, 15));
				for (int offset = interval; offset < tempRect.getWidth(); offset += interval) {
					ofVec2f s = ofVec2f(tempRect.getLeft(), tempRect.getTop() + offset);
					ofVec2f e = ofVec2f(tempRect.getRight(), tempRect.getTop() + offset);

					p.clear();
					hw->getLine(p, s, e);
					points.push_back(p);
				}
			}
			else {
				int interval = (int)(tempRect.getHeight() / ofRandom(5, 15));
				for (int offset = interval; offset < tempRect.getHeight(); offset += interval) {
					ofVec2f s = ofVec2f(tempRect.getLeft() + offset, tempRect.getTop());
					ofVec2f e = ofVec2f(tempRect.getLeft() + offset, tempRect.getBottom());

					p.clear();
					hw->getLine(p, s, e);
					points.push_back(p);
				}
			}
			r.y += size;
		}
		r.x += size;
		r.y = leftTop.y;
	}

	objIdx = 0;
	pointIdx = 0;
}
void ofApp::update() {
	if (objIdx < points.size()) {
		for (int i = 0; i < 10; i++) {
			if (pointIdx < points[objIdx].size() - 1) {
				fbo.begin();
				ofNoFill();
				ofSetColor(0, 0, 0, 200);
				ofSetLineWidth(2);
				ofVec2f s = points[objIdx][pointIdx];
				ofVec2f e = points[objIdx][pointIdx + 1];
				ofDrawLine(s, e);
				fbo.end();

				pointIdx++;
			}
			else {
				objIdx++;
				pointIdx = 0;
				break;
			}
		}
	}
}

void ofApp::draw() 
{
	fbo.draw(0, 0);
}

int main() {
	ofSetupOpenGL(1920, 1024, OF_WINDOW);			// <-------- setup the GL context
	ofRunApp(new ofApp());
}
