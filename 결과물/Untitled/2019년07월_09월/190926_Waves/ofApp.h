#pragma once

#include "ofMain.h"
#include "movingRec.cpp"

class ofApp : public ofBaseApp{

	public:
		void setup();
		void update();
		void draw();

		myRect a, b;
		ofTrueTypeFont font;
		ofSoundPlayer sound;
};
