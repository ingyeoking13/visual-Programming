#include "ofMain.h"
class Trick
{
public:
	Trick() { }
	~Trick() { }

	void setup()
	{
		ofVec2f d = ofVec2f(0, 1);
		float len = 50;
		int num = 6;

		box.push_back(ofVec2f(0, 0));

		for (int i = 0; i < num; i++)
		{
			ofVec2f org = d;
			box.push_back(org.rotate((360 / num) * i) * len);
		}
		step = 0;
		pos = ofVec2f(ofGetWidth() / 2 + 100, 250);
		fbo.allocate(ofGetWidth(), ofGetHeight(), GL_RGBA, 4);
	}

	void update()
	{
		if (ofGetFrameNum() % 30 == 0) {
			fbo.begin();
			if (step == 0) {
				drawBox(pos);
			}
			else if (step <= 4) {
				pos = pos + box.at(2);
				drawBox(pos);
			}
			else if (step <= 8) {
				pos = pos + box.at(6);
				drawBox(pos);
			}
			else if (step <= 10) {
				pos = pos + box.at(4);
				drawBox(pos);
			}
			else if (step == 11) {
				drawLastBox(pos + box.at(4));
			}
			fbo.end();

			step++;
		}
	}

	void display()
	{
		fbo.draw(0,0);
	}

private:
	void drawBox(ofVec2f c)
	{
		ofFill();
		ofSetColor(255, 242, 124);
		ofBeginShape();
		ofVertex(c + box.at(0));
		ofVertex(c + box.at(1));
		ofVertex(c + box.at(2));
		ofVertex(c + box.at(3));
		ofEndShape();

		ofSetColor(217, 239, 151);
		ofBeginShape();
		ofVertex(c + box.at(0));
		ofVertex(c + box.at(3));
		ofVertex(c + box.at(4));
		ofVertex(c + box.at(5));
		ofEndShape();

		ofSetColor(8, 96, 168);
		ofBeginShape();
		ofVertex(c + box.at(0));
		ofVertex(c + box.at(5));
		ofVertex(c + box.at(6));
		ofVertex(c + box.at(1));
		ofEndShape();


		ofNoFill();
		ofSetLineWidth(3);
		ofSetColor(0);
		ofBeginShape();
		ofVertex(c + box.at(0));
		ofVertex(c + box.at(1));
		ofVertex(c + box.at(2));
		ofVertex(c + box.at(3));
		ofEndShape();

		ofSetColor(0);
		ofBeginShape();
		ofVertex(c + box.at(0));
		ofVertex(c + box.at(3));
		ofVertex(c + box.at(4));
		ofVertex(c + box.at(5));
		ofEndShape();

		ofSetColor(0);
		ofBeginShape();
		ofVertex(c + box.at(0));
		ofVertex(c + box.at(5));
		ofVertex(c + box.at(6));
		ofVertex(c + box.at(1));
		ofEndShape();
	}
	void drawLastBox(ofVec2f c)
	{
		ofFill();
		ofSetColor(255, 242, 124);
		ofBeginShape();
		ofVertex(c + box.at(0));
		ofVertex(c + box.at(1));
		ofVertex(c + box.at(2));
		ofEndShape();

		ofSetColor(8, 96, 168);
		ofBeginShape();
		ofVertex(c + box.at(0));
		ofVertex(c + box.at(5));
		ofVertex(c + box.at(6));
		ofVertex(c + box.at(1));
		ofEndShape();

		ofNoFill();
		ofSetLineWidth(3);
		ofSetColor(0);
		ofBeginShape();
		ofVertex(c + box.at(0));
		ofVertex(c + box.at(1));
		ofVertex(c + box.at(2));
		ofEndShape();

		ofSetColor(0);
		ofBeginShape();
		ofVertex(c + box.at(0));
		ofVertex(c + box.at(5));
		ofVertex(c + box.at(6));
		ofVertex(c + box.at(1));
		ofEndShape();
	}

	vector<ofVec2f> box;
	ofVec2f pos;
	int step;
	ofFbo fbo;

};