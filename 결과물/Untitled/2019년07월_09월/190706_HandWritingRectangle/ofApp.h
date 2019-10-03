#pragma once

#include "ofMain.h"
#include "HandWriting.hpp"

class ofApp : public ofBaseApp{

	public:
		void setup();
		void update();
		void draw();

		std::shared_ptr<HandWriting> hw;
		std::vector<std::vector<ofVec2f>> points;
		int objIdx;
		int pointIdx;

		ofFbo fbo;
};
