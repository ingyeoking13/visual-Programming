# 190619_junkiyoshi
from `Junkiyoshi blog`.  

![hi](190619_junkiyoshi.gif)

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
    ofTranslate(ofGetWidth() * 0.5, ofGetHeight() * 0.5);
	ofRotate(90);

	auto radius_min = 60;
	auto radius_max = 110;
	auto radius_span = 5;

	for (int i = 0; i < 3; i++) {

		for (int radius = radius_min; radius < radius_max; radius += radius_span) {

			ofColor color;
			color.setHsb(ofRandom(255), 180, 255);

            //2
			auto start_deg = ofGetFrameNum() * ofRandom(3, 8) + ofRandom(720);
			auto len = ofRandom(80, 360);

			vector<glm::vec2> vertices_in, vertices_out;
			auto first = true;
            for (int deg = start_deg; deg < start_deg + len; deg += 1) {

				auto radian = deg * DEG_TO_RAD;
				int position_deg = deg % 720;
				if (position_deg < 360) {

					vertices_in.push_back(
						glm::vec2(radius * cos(radian), radius * sin(radian)) 
						+ 
						glm::vec2((radius_min + radius_max) * -0.5, (i - 1) * 240)
					);
					vertices_out.push_back(
						glm::vec2((radius + radius_span) * cos(radian), (radius + radius_span) * sin(radian)) 
						+ 
						glm::vec2((radius_min + radius_max) * -0.5, (i - 1) * 240)
					);
				}
				else {
					int tmp_radius = ofMap(radius, radius_min, radius_max, radius_max, radius_min);
					vertices_in.push_back(
						glm::vec2(-1 * tmp_radius * cos(radian), tmp_radius * sin(radian)) 
						+
						glm::vec2((radius_min + radius_max) * 0.5, (i - 1) * 240)
					);
					vertices_out.push_back(
						glm::vec2(-1 * (tmp_radius - radius_span) * cos(radian), (tmp_radius - radius_span) * sin(radian)) 
						+ 
						glm::vec2((radius_min + radius_max) * 0.5, (i - 1) * 240)
					);
				}
			}
			

            //1
			reverse(vertices_out.begin(), vertices_out.end());

			ofFill();
			ofSetColor(color);
			ofBeginShape();
			ofVertices(vertices_in);
			ofVertices(vertices_out);
			ofEndShape(true);

			ofNoFill();
			ofSetColor(39);
			ofBeginShape();
			ofVertices(vertices_in);
			ofVertices(vertices_out);
			ofEndShape(true);
		}
	}
	
````
## Impressing part
1. 끈을 만드는 전략 
````c++
void ofApp::draw()
{

    vector<glm::vec2> vertices_in, vertices_out;
    //.... push vertex ...
    reverse(vertices_out.begin(), vertices_out.end());
    ofFill();
    ofSetColor(color);
    ofBeginShape();
    ofVertices(vertices_in);
    ofVertices(vertices_out);
    ofEndShape(true);

}
````
이번 작품에서 나의 시선을 끌었던 것은 바로 끈이 자유롭게 곡선을 이루면서 그리는 것이였다.  
전략은 점들을 `vertices` 벡터에 넣어놓고, `ofBeginShape()`함수를 이용하여 점들간 연결한다. 어떠한 형태의 점들이 모이건 그것을 이용해 외형을 그려가는 것이다. `ofVertices()` 함수는 `glm::vec2` 자료형(점)의 벡터를 받아들인다. `ofEndShape(true)`는 시작점과 끝점을 마감한다. 

2. 점들이 움직이는 방법 
````C++
void ofApp::update(){ 
    ofSeedRandom(39); 
}
void ofApp::draw(){

//for ( int i = 0; i<3; i++ )  for(int radius;;) 가 감싸고 있다. i는 도형의 index. 
auto start_deg = ofGetFrameNum() * ofRandom(3, 8) + ofRandom(720);
auto len = ofRandom(80, 360);

for (int deg = start_deg; deg < start_deg + len; deg += 1) {

    auto radian = deg * DEG_TO_RAD;
    int position_deg = deg % 720;
    if (position_deg < 360) {
        //2.1
        vertices_in.push_back(
            glm::vec2(radius * cos(radian), radius * sin(radian)) 
            + 
            glm::vec2((radius_min + radius_max) * -0.5, (i - 1) * 240)
        );
        vertices_out.push_back(
            glm::vec2((radius + radius_span) * cos(radian), (radius + radius_span) * sin(radian)) 
            + 
            glm::vec2((radius_min + radius_max) * -0.5, (i - 1) * 240)
        );
    }
    else {
        int tmp_radius = ofMap(radius, radius_min, radius_max, radius_max, radius_min);
        vertices_in.push_back(
            glm::vec2(-1 * tmp_radius * cos(radian), tmp_radius * sin(radian)) 
            +
            glm::vec2((radius_min + radius_max) * 0.5, (i - 1) * 240)
        );
        vertices_out.push_back(
            glm::vec2(-1 * (tmp_radius - radius_span) * cos(radian), (tmp_radius - radius_span) * sin(radian)) 
            + 
            glm::vec2((radius_min + radius_max) * 0.5, (i - 1) * 240)
        );
    }
}
}

````
이 부분이 가장 인상적이다. 특히 8자라는 것을 동적으로 그리기 위해 점들을 어떻게 나열하는 가에 대한 고민이 담겨 있다.   
8자는 생각해보면 두 원을 위아래로 결합한것과 같다. 
임의의 점이 한 원 위에 있다면 그 점을 표현하기위해 0~359 라는 수 범위는 적절한 범위가 될 것이다. 따라서 두 원을 그리기 위해선 0~719가 적절한 수의 범위가 될것이다.  
아래 그림은 0~359 수 범위에 대해서만 점들을 수집한뒤 그리기를 수행 한것이다.  

![gif2](190619_junkiyoshi_half.gif)

선들이 꾸준히 앞으로 갈 수 있는 이유는 `ofGetFrameNum()`함수 덕분이다. 선들이 크게 도는 자리일 수록 더 빨리 움직인다는 느낌을 받는다. 
그것은 선이 안쪽으로 들어갈때는 radius가 역전되므로, 점들이 더 촘촘한 경향을 띄기 때문 인것으로 생각된다. 변수 len이 바뀌어서가 아니다. 
이 작품은 소스의 명료함이나 완성된 모습을 봤을 때 굉장히 마음에 든다. 

![hi](190619_junkiyoshi.gif)