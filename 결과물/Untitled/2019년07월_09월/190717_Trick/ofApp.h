#pragma once

#include "ofMain.h"
#include "Trick.hpp"

class ofApp : public ofBaseApp{

	public:
		void setup();
		void update();
		void draw();

		ofFbo fbo;

		shared_ptr<Trick> trick;
};
