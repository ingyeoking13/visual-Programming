#ifndef HandWriting_hpp
#define HandWriting_hpp
#include <stdio.h>
#include "ofMain.h"
class HandWriting {
public:
	HandWriting() {};
	~HandWriting() {};
	void getLine(std::vector<ofVec2f>& points, ofVec2f start, ofVec2f end)
	{
		float length = (end - start).length();
		float drawLen = 0;
		ofVec2f dir = end - start;
		ofVec2f point = start;
		dir.normalize();
		ofVec2f vert = dir;
		vert.rotate(90);

		float tx = ofRandom(10000);

		while (drawLen < length) {
			float offset = ofMap(ofSignedNoise(tx), -1, 1, -3, 3);
			tx += 0.01;
			points.push_back(point + vert * offset);

			point = point + dir;
			drawLen = (point - start).length();
		}
	}
	void getRect(std::vector<ofVec2f>& points, ofRectangle rect)
	{
		getRectSide(points, rect.getTopLeft(), rect.getTopRight());
		getRectSide(points, points.back(), rect.getBottomRight());
		getRectSide(points, points.back(), rect.getBottomLeft());
		getRectSide(points, points.back(), rect.getTopLeft());
	}
private:
	void getRectSide(std::vector<ofVec2f>& points, ofVec2f start, ofVec2f end)
	{
		std::vector<ofVec2f> buff;
		getLine(buff, start, end);

		for (ofVec2f p : buff) 
		{
			points.push_back(p);
		}
	}
};
#endif /* HandWriting_hpp */
