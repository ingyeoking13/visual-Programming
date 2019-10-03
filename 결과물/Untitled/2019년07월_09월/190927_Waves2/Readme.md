# 190927_Waves2

from `junkiyoshi` blog 

![.](waves.gif)

결과물이 참 흥미롭다.  
z축을 활용하여 웨이브를 겹겹히 쌓은 것이고, 
특히 겹겹히 표현되는 웨이브가 잔상처럼 움직이는 것도 인상적이다.  
잔상처럼 움직이는 것은 단지 z에 대해서만 변화값을 가지기 때문이다.  
같은 draw함수 실행 단위안에서는 `ofGetFrameNum()`은 같은 수를 반환하기에 ...

````c++
void ofApp::draw() {

	this->cam.begin();

	auto len = 300;
	for (auto z = len * -0.5; z <= len * 0.5; z += 10) {

		vector<glm::vec3> vertices_1, vertices_2;
		for (auto param = len * -0.5; param <= len * 0.5; param += 3) {

			auto height_1 = ofMap(ofNoise(param * 0.005, ofGetFrameNum() * 0.01 + z * 0.005), 0, 1, len * -0.35, 0);
			auto height_2 = ofMap(ofNoise(param * 0.005, ofGetFrameNum() * 0.01 + z * 0.005), 0, 1, 0, len * 0.35);
			vertices_1.push_back(glm::vec3(param, height_1, z));
			vertices_2.push_back(glm::vec3(param, height_2, z));
		}

		vertices_1.push_back(glm::vec3(len * 0.5, len * -0.5, z));
		vertices_1.push_back(glm::vec3(len * -0.5, len * -0.5, z));

		ofFill();
		ofSetColor(39);
		ofBeginShape();
		ofVertices(vertices_1);
		ofEndShape(true);

		ofNoFill();
		ofSetColor(239);
		ofBeginShape();
		ofVertices(vertices_1);
		ofEndShape(true);

		vertices_2.push_back(glm::vec3(len * 0.5, len * 0.5, z));
		vertices_2.push_back(glm::vec3(len * -0.5, len * 0.5, z));

		ofFill();
		ofSetColor(39);
		ofBeginShape();
		ofVertices(vertices_2);
		ofEndShape(true);

		ofNoFill();
		ofSetColor(239);
		ofBeginShape();
		ofVertices(vertices_2);
		ofEndShape(true);
	}

	this->cam.end();
}
````

