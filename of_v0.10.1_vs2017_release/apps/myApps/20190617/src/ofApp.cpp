#include "ofApp.h"
#include <algorithm>
using ui = unsigned int;


void ofApp::setup() {

	ofSetFrameRate(60);
	ofSetWindowTitle("openFrameworks");
	ofBackground(39);
	ofSetLineWidth(3);
}

void ofApp::update() {

	ofSeedRandom(39);
}


//--------------------------------------------------------------
void ofApp::draw() {


		for (ui radLen = 50; radLen <= 200; radLen += 30)
		{
			vector<glm::vec2> v, revv;
			vector<glm::vec2> inner_v, inner_revv;

			ui st_deg = ofGetFrameNum()*0.3 * ofRandom(3, 8)+ ofRandom(720);
			ui len = ofRandom(100, 360);

			for (ui i = st_deg; i < st_deg + len; i++)
			{
				double rad = i * DEG_TO_RAD;
				v.push_back({ cos(rad) * radLen, sin(rad) * radLen });
				revv.push_back({ cos(rad) * (radLen - 10), sin(rad) * (radLen - 10) });

			}

			st_deg = ofGetFrameNum()*0.3 * ofRandom(3, 8)+ ofRandom(720);
			len = ofRandom(100, 360);

			for (ui i = st_deg; i < st_deg + len; i++)
			{
				double rad = i * DEG_TO_RAD;
				inner_v.push_back({ cos(rad) * (radLen-3), sin(rad) * (radLen-3) });
				inner_revv.push_back({ cos(rad) * (radLen - 7), sin(rad) * (radLen - 7) });
			}

			ofPushMatrix();
			ofTranslate(ofGetWidth() / 2, ofGetHeight() / 2);
			ofSetColor(239);

			reverse(revv.begin(), revv.end());
			ofBeginShape();
			ofVertices(v);
			ofVertices(revv);
			ofEndShape(true);

			reverse(inner_revv.begin(), inner_revv.end());

			ofSetColor(39);
			ofBeginShape();
			ofVertices(inner_v);
			ofVertices(inner_revv);
			ofEndShape(true);
			ofPopMatrix();
		}
}

void ofApp::keyPressed(int key)
{
}

//--------------------------------------------------------------
int main() {

	ofSetupOpenGL(720, 720, OF_WINDOW);
	ofRunApp(new ofApp());
}
