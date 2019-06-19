#include "ofApp.h"
#include "ofxDelaunay.h"

ofxDelaunay delaunay;
vector<glm::vec2> vec2list;

//--------------------------------------------------------------
void ofApp::setup(){
	ofSetFrameRate(60);
	ofBackground(239);
	ofSetColor(39);
	ofSetLineWidth(1);
	ofTranslate(ofGetWidth() * 0.5, ofGetHeight() * 0.5);
	for (int i = 0; i <1000; i++)
	{
		float x = ofRandom(ofGetWidth());
		float y = ofRandom(ofGetHeight());
		vec2list.push_back(glm::vec2(x, y));
	}
}

//--------------------------------------------------------------
void ofApp::update(){
	ofSeedRandom(39);
}

//--------------------------------------------------------------
void ofApp::draw(){
	camera.begin();
	for (int i = 0; i < vec2list.size(); i++)
	{
		auto x = vec2list[i].x;
		auto y = vec2list[i].y;
		x += ofMap(ofNoise(ofGetFrameNum() * 0.005, ofRandom(1000)), 0, 1, -10, 10);
		y += ofMap(ofNoise(ofGetFrameNum() * 0.005, ofRandom(1000)), 0, 1, -10, 10);
		ofPoint randomPoint(x, y);
		delaunay.addPoint(randomPoint);
	}
	delaunay.triangulate();

	delaunay.triangleMesh.drawWireframe();
	camera.end();
}

int main( ){
	ofSetupOpenGL(1280,720,OF_WINDOW);			// <-------- setup the GL context
	ofRunApp(new ofApp());
}
