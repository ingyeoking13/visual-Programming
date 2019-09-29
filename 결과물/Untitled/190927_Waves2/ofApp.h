#pragma once

#include "ofMain.h"
#include "movingRec.cpp"

class ofApp : public ofBaseApp{

	public:
		void setup();
		void update();
		void draw();

		ofTrueTypeFont font;
		ofSoundPlayer sound;

		ofEasyCam cam;
};
