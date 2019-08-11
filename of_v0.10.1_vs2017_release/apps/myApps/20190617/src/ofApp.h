#pragma once

#include "ofMain.h"
#include "movingRec.cpp"

class ofApp : public ofBaseApp{

	public:
		void setup();
		void update();
		void draw();
		void keyPressed(int key);

		myRect a, b;
		ofTrueTypeFont font;
		ofSoundPlayer sound;
};
