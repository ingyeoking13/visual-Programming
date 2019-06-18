# Untitled

## 190617
from `Junkiyoshi blog`.  

![hi](190617_junkiyoshi.gif)

````c++
void ofApp::setup(){
	ofSetFrameRate(60);
	ofBackground(229);
	ofSetColor(39);
	ofSetLineWidth(3);
}
void ofApp::update(){
	ofSeedRandom(39);
}
void ofApp::draw(){
	auto radius = 20;
	auto span = 120;
	auto threshold = 120;

	vector<glm::vec2> locations;
	for (auto x = span * 0.5; x < ofGetWidth(); x += span) {

		for (auto y = span * 0.5; y < ofGetHeight(); y += span) {

			auto location = glm::vec2(
				x + ofMap(ofNoise(ofRandom(1000), ofGetFrameNum() * 0.005), 0, 1, -span * 0.5 + radius, span * 0.5 - radius),
				y + ofMap(ofNoise(ofRandom(1000), ofGetFrameNum() * 0.005), 0, 1, -span * 0.5 + radius, span * 0.5 - radius));
			locations.push_back(location);
		}
	}

	for (auto location : locations) {

		ofSetColor(ofColor(0, 255, 200));
		for (auto other : locations) {

			if (location == other) { continue; }

			auto distance = glm::distance(location, other);
			if (distance < threshold) {

				auto direction_rad = std::atan2(other.y - location.y, other.x - location.x);
				auto direction = direction_rad * RAD_TO_DEG;
				auto width = ofMap(distance, 0, threshold, 360, 0);

				ofNoFill();
				ofBeginShape();
				for (auto deg = direction - width * 0.5; deg <= direction + width * 0.5; deg++) {

					ofVertex(location.x + radius * cos(deg * DEG_TO_RAD), location.y + radius * sin(deg * DEG_TO_RAD));
				}
				ofEndShape();

				ofDrawLine(location + glm::vec2(radius * cos(direction * DEG_TO_RAD), radius * sin(direction * DEG_TO_RAD)),
					other + glm::vec2(radius * cos((180 + direction) * DEG_TO_RAD), radius * sin((180 + direction) * DEG_TO_RAD)));
			}
		}

		ofFill();
		ofSetColor(39);
		ofDrawCircle(location, radius * 0.65);
		ofSetColor(229);
		ofDrawCircle(location, radius * 0.35);
		ofSetColor(39);
		ofDrawCircle(location, radius * 0.25);
	}
}
````
## impressing part
1. perlin noise를 만드는 방법the way generating perlin noise
````c++
void ofApp::update(){
	ofSeedRandom(39);
}
void ofApp::draw()
{
    auto radius = 20;
	auto span = 120;
	auto threshold = 120;

	vector<glm::vec2> locations;
	for (auto x = span * 0.5; x < ofGetWidth(); x += span) {

		for (auto y = span * 0.5; y < ofGetHeight(); y += span) {

			auto location = glm::vec2(
				x + ofMap(ofNoise(ofRandom(1000), ofGetFrameNum() * 0.005), 0, 1, -span * 0.5 + radius, span * 0.5 - radius),
				y + ofMap(ofNoise(ofRandom(1000), ofGetFrameNum() * 0.005), 0, 1, -span * 0.5 + radius, span * 0.5 - radius));
			locations.push_back(location);
		}
	}
    //....
}
````
화면에 일정한 너비와 높이 간격으로 점을 찍는데, 매 frame 마다 일정한 간격 내에서 움직여야한다. 
매 frame 마다 2차원 perlin noise를 사용한다. 1차원으로 하게 되면 각 원끼리의 움직임의 단조로움을 구성하기 때문인 것 같다.   
값 0~1을 다음 두 간격 -span * 0.5 + radius, span *0.5 - radius로 매핑한다. 
따라서 원의 중심은 {x +- 각 원이 배치된 너비 높이 간격 ,y +- 각 원이 배치된 너비 높이 간격} 이 된다. 

2. 원과 원을 잇는 선, 그리고 그 선을 중심으로 하는 호(arc)의 발생
````C++
for (auto location : locations) {

    for (auto other : locations) {

        if (location == other) { continue; }

        auto distance = glm::distance(location, other);
        if (distance < threshold) {

            auto direction_rad = std::atan2(other.y - location.y, other.x - location.x);
            auto direction = direction_rad * RAD_TO_DEG;
            auto width = ofMap(distance, 0, threshold, 360, 0);

            //2.1
            ofNoFill();
            ofBeginShape();
            for (auto deg = direction - width * 0.5; deg <= direction + width * 0.5; deg++) {

                ofVertex(location.x + radius * cos(deg * DEG_TO_RAD), location.y + radius * sin(deg * DEG_TO_RAD));
            }
            ofEndShape();

            //2.2
            ofDrawLine(location + glm::vec2(radius * cos(direction_rad), radius * sin(direction_rad)),
                other + glm::vec2(radius * cos((180 + direction) * DEG_TO_RAD), radius * sin((180 + direction) * DEG_TO_RAD)));
        }
    }
    //....
}
````
2.1 부분은 상대 원과 충분히 가까울 때 그 방향으로 호를 생성하는 부분이다. 
beginShape()로 생성하는데 두 원이 이루는 각 +- 두 원 사이에 거리에 비례한 길이 만큼 호를 긋는다.

2.2 는 호 중앙 부분과 상대 호 중앙 부분에 직선을 긋는 수식이다. 상대의 호 중앙을 지정하는데 ( 180 + direction )을 사용하는 것이 인상적이다.   
전체적으로 자연스러운 라디안-각도 변환 사용이 인상적이다.
