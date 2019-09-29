#include "ofApp.h"

void ofApp::setup() {

	ofSetFrameRate(60);
	ofSetWindowTitle("openFrameworks");

	ofBackground(239);
	ofSetLineWidth(3);
	ofEnableDepthTest();
}

//--------------------------------------------------------------
void ofApp::update() {


}

//--------------------------------------------------------------
void ofApp::draw() {

	this->cam.begin();

	auto len = 300;
	for (auto z = len * -0.5; z <= len * 0.5; z += 10) {

		vector<glm::vec3> vertices_1, vertices_2;
		for (auto param = len * -0.5; param <= len * 0.5; param += 3) {

			auto height_1 = ofMap(ofNoise(param * 0.005, ofGetFrameNum() * 0.01 + z * 0.005), 0, 1, len * -0.35, 0);
			auto height_2 = ofMap(ofNoise(param * 0.005, ofGetFrameNum() * 0.01 + z * 0.005), 0, 1, 0, len * 0.35);
			vertices_1.push_back(glm::vec3(param, height_1, z));
			vertices_2.push_back(glm::vec3(param, height_2, z));
		}

		vertices_1.push_back(glm::vec3(len * 0.5, len * -0.5, z));
		vertices_1.push_back(glm::vec3(len * -0.5, len * -0.5, z));

		ofFill();
		ofSetColor(39);
		ofBeginShape();
		ofVertices(vertices_1);
		ofEndShape(true);

		ofNoFill();
		ofSetColor(239);
		ofBeginShape();
		ofVertices(vertices_1);
		ofEndShape(true);

		vertices_2.push_back(glm::vec3(len * 0.5, len * 0.5, z));
		vertices_2.push_back(glm::vec3(len * -0.5, len * 0.5, z));

		ofFill();
		ofSetColor(39);
		ofBeginShape();
		ofVertices(vertices_2);
		ofEndShape(true);

		ofNoFill();
		ofSetColor(239);
		ofBeginShape();
		ofVertices(vertices_2);
		ofEndShape(true);
	}

	this->cam.end();
}

//--------------------------------------------------------------
int main() {

	ofSetupOpenGL(720, 720, OF_WINDOW);
	ofRunApp(new ofApp());
}
