#pragma once

#include "ofMain.h"

class ofApp : public ofBaseApp{

	public:
		void setup();
		void update();
		void draw();

		ofEasyCam cam;
		ofFbo fbo;
		ofPixels pixels;
		vector<glm::vec2> locations;
		int span = 10;

};
