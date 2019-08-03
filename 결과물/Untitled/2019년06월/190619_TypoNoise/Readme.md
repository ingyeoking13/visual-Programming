# 190619_TypoNoise
from `Junkiyoshi blog`.  

![.](190619_TypoNoise.gif)

## impressing Part

한글을 쓰는 법을 알게 되었다.
ofTrueTypeFontSettings을 활용하여 여러 문자들을 그릴 수 있다.

````C++
void ofApp::setup() {
	ofSetColor(39);
	ofBackground(239);

	ofTrueTypeFontSettings settings("malgun.ttf", 44);
	settings.antialiased = true;
	settings.contours = true;
	settings.dpi = 72;
	settings.addRanges(ofAlphabet::Korean);
	this->font.load(settings);
}
// ...
void ofApp::draw() {
	vector<string> s =
	{
		u8"안", u8"녕", u8"하", u8"세", u8"요"
	};

	for (int y = 0; y < ofGetWidth(); y+=50)
	{
		for (int x = 0; x < ofGetHeight(); x+=50)
		{
			int idx = ofMap(ofNoise(ofGetFrameNum()*0.005, x*0.0005, y*0.0005), 0, 1, 0, 5);
			this->font.drawString(s[idx], y, x);
		}
	}
}
````