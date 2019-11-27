#include "ofApp.h"
using ui = unsigned int;


void ofApp::setup() {

	ofSetFrameRate(60);
	ofSetWindowTitle("openFrameworks");
	ofBackground(30);

	ofEnableBlendMode(ofBlendMode::OF_BLENDMODE_ADD);
}

void ofApp::update() {
	ofSeedRandom(39);
	this->mesh.clear();
	this->mesh.setMode(OF_PRIMITIVE_LINE_STRIP);

	for (int i = 0; i < 800; i++) {

		auto location = glm::vec3(
			ofMap(ofNoise(ofRandom(1000), ofGetFrameNum() * 0.001), 0, 1, ofGetWidth() * -0.5, ofGetWidth() * 0.5),
			ofMap(ofNoise(ofRandom(1000), ofGetFrameNum() * 0.001), 0, 1, ofGetHeight() * -0.5, ofGetHeight() * 0.5),
			0);

		location = glm::normalize(location) * ofRandom(200, 350);
		this->mesh.addVertex(location);

		ofColor color;
		color.setHsb((int)ofMap(location.x, -350, 350, 240, 240 + 255) % 255, 255, 255, 32);
		this->mesh.addColor(color);
	}

	for (int i = 0; i < this->mesh.getVertices().size(); i++) {

		auto location = this->mesh.getVertices()[i];
		vector<int> near_index_list;
		for (int k = 0; k < this->mesh.getVertices().size(); k++) {

			auto other = this->mesh.getVertices()[k];
			auto distance = glm::distance(location, other);

			if (distance < 50) {

				near_index_list.push_back(k);
			}
		}

		if (near_index_list.size() >= 3) {

			this->mesh.addIndex(near_index_list[0]);
			this->mesh.addIndex(near_index_list[1]);
			this->mesh.addIndex(near_index_list[2]);
		}
	}
}

//--------------------------------------------------------------
void ofApp::draw() {
	ofTranslate(ofGetWidth() / 2, ofGetHeight() / 2);
	this->mesh.draw();
	this->mesh.drawWireframe();
	this->mesh.drawVertices();
}

void ofApp::keyPressed(int key)
{
}

//--------------------------------------------------------------
int main() {

	ofSetupOpenGL(720, 720, OF_WINDOW);
	ofRunApp(new ofApp());
}
