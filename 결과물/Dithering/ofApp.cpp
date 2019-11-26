#include "ofApp.h"
using ui = unsigned int;

ofImage image;

void ofApp::setup() {

	ofSetFrameRate(60);
	ofSetWindowTitle("openFrameworks");

	ofBackground(239);
	image.load("angelinaDanilova.jpg");
	ofSetWindowShape(image.getHeight(), image.getWidth());

	image.setImageType(OF_IMAGE_GRAYSCALE);
	for (ui i = 0; i < image.getHeight(); i++)
	{
		for (ui j = 0; j < image.getWidth(); j++)
		{
			ofColor col = image.getColor(j, i);

			double factor =1;
			int oldR = col.r;
			int oldG = col.g;
			int oldB = col.b;

			int newR = round((factor* col.r)/ 255.0) * (255.0/factor);
			int newG = round((factor* col.g)/ 255.0) * (255.0/factor); 
			int newB = round((factor* col.b)/ 255.0) * (255.0/factor);

			double errorR = col.r - newR;
			double errorG = col.g - newG;
			double errorB = col.b - newB;

			image.setColor(j, i, ofColor(newR, newG, newB));

			if (j + 1 < image.getWidth())
			{
				ofColor right = image.getColor(j + 1, i);
				image.setColor(j + 1, i,
					ofColor(right.r + errorR * 7.0 / 16,
						right.g + errorG * 7.0 / 16,
						right.b + errorB * 7.0 / 16.0));
			}

			if (j - 1 >= 0 && i + 1 < image.getHeight())
			{
				ofColor downLeft = image.getColor(j - 1, i + 1);
				image.setColor(j - 1, i + 1,
					ofColor(downLeft.r + errorR * 3.0 / 16,
						downLeft.g + errorG * 3.0 / 16,
						downLeft.b + errorB * 3.0 / 16.0));
			}

			if (i + 1 < image.getHeight())
			{
				ofColor down = image.getColor(j, i + 1);
				image.setColor(j, i + 1,
					ofColor(down.r + errorR * 5.0 / 16,
						down.g + errorG * 5.0 / 16,
						down.b + errorB * 5.0 / 16.0));
			}

			if (j + 1 < image.getWidth() && i + 1 < image.getWidth())
			{
				ofColor downRight = image.getColor(j + 1, i + 1);
				image.setColor(j + 1, i + 1,
					ofColor(downRight.r + errorR * 1.0 / 16,
						downRight.g + errorG * 1.0 / 16,
						downRight.b + errorB * 1.0 / 16.0));
			}
		}
	}
	image.update();
}

//--------------------------------------------------------------
void ofApp::update() {
}

//--------------------------------------------------------------
void ofApp::draw() {
	this->cam.begin();
	image.draw(-image.getWidth()/2, -image.getHeight()/2);
	this->cam.end();
}

void ofApp::keyPressed(int key)
{
	if (key == OF_KEY_UP) this->cam.move(0, -50,0);
	if (key == OF_KEY_DOWN) this->cam.move(0, 50,0);
	if (key == OF_KEY_LEFT) this->cam.move(-50, 0,0);
	if (key == OF_KEY_RIGHT) this->cam.move(50, 0,0);

}

//--------------------------------------------------------------
int main() {

	ofSetupOpenGL(720, 720, OF_WINDOW);
	ofRunApp(new ofApp());
}
