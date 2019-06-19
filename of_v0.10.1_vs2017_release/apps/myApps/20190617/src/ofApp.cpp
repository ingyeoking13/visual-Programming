#include "ofApp.h"

//--------------------------------------------------------------
void ofApp::setup(){
	ofSetFrameRate(60);
	ofBackground(239);
	ofSetColor(39);
	ofSetLineWidth(3);
}

//--------------------------------------------------------------
void ofApp::update(){
	ofSeedRandom(39);
}

//--------------------------------------------------------------
void ofApp::draw(){
	ofTranslate(ofGetWidth() * 0.5, ofGetHeight() * 0.5);
	ofRotate(90);

	auto radius_min = 60;
	auto radius_max = 110;
	auto radius_span = 5;

	for (int i = 0; i < 3; i++) {

		for (int radius = radius_min; radius < radius_max; radius += radius_span) {

			ofColor color;
			color.setHsb(ofRandom(255), 180, 255);

			auto start_deg = ofGetFrameNum() * ofRandom(3, 8) + ofRandom(720);
			auto len = ofRandom(80, 360);

			vector<glm::vec2> vertices_in, vertices_out;
			auto first = true;
			for (int deg = start_deg; deg < start_deg + len; deg += 1) {

				auto radian = deg * DEG_TO_RAD;
				int position_deg = deg % 720;
				if (position_deg < 360) {

					vertices_in.push_back(
						glm::vec2(radius * cos(radian), radius * sin(radian)) 
						+ 
						glm::vec2((radius_min + radius_max) * -0.5, (i - 1) * 240)
					);
					vertices_out.push_back(
						glm::vec2((radius + radius_span) * cos(radian), (radius + radius_span) * sin(radian)) 
						+ 
						glm::vec2((radius_min + radius_max) * -0.5, (i - 1) * 240)
					);
				}
				else {
					int tmp_radius = ofMap(radius, radius_min, radius_max, radius_max, radius_min);
					vertices_in.push_back(
						glm::vec2(-1 * tmp_radius * cos(radian), tmp_radius * sin(radian)) 
						+
						glm::vec2((radius_min + radius_max) * 0.5, (i - 1) * 240)
					);
					vertices_out.push_back(
						glm::vec2(-1 * (tmp_radius - radius_span) * cos(radian), (tmp_radius - radius_span) * sin(radian)) 
						+ 
						glm::vec2((radius_min + radius_max) * 0.5, (i - 1) * 240)
					);
				}
			}

			reverse(vertices_out.begin(), vertices_out.end());

			ofFill();
			ofSetColor(color);
			ofBeginShape();
			ofVertices(vertices_in);
			ofVertices(vertices_out);
			ofEndShape(true);

			ofNoFill();
			ofSetColor(39);
			ofBeginShape();
			ofVertices(vertices_in);
			ofVertices(vertices_out);
			ofEndShape(true);
		}
	}
}

int main( ){
	ofSetupOpenGL(720,720,OF_WINDOW);			// <-------- setup the GL context
	ofRunApp(new ofApp());
}

//--------------------------------------------------------------
void ofApp::keyPressed(int key){

}

//--------------------------------------------------------------
void ofApp::keyReleased(int key){

}

//--------------------------------------------------------------
void ofApp::mouseMoved(int x, int y ){

}

//--------------------------------------------------------------
void ofApp::mouseDragged(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::mousePressed(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::mouseReleased(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::mouseEntered(int x, int y){

}

//--------------------------------------------------------------
void ofApp::mouseExited(int x, int y){

}

//--------------------------------------------------------------
void ofApp::windowResized(int w, int h){

}

//--------------------------------------------------------------
void ofApp::gotMessage(ofMessage msg){

}

//--------------------------------------------------------------
void ofApp::dragEvent(ofDragInfo dragInfo){ 

}
