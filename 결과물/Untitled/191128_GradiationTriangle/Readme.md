# Gradiation Triangle  

from `junkiyoshi` work

![.](./191128_GradiationTriangle.gif)

![.](./191128_GradiationTriangle2.gif)  

처음으로 Mesh에 대해 공부하게 된 작품이다. 소스는 junkiyoshi의 것을 그대로 올린다.   

`Mesh`는 `vec3`의 집합이다. 다만, 다른 점은 점 집합(오히려 순열이라는 개념이 맞다.)에 대해 그리는 작업을 정의 내릴수 있다. [참고](https://openframeworks.cc/documentation/3d/ofMesh/)   

아래소스는 우선 랜덤하게 vec3 정점들을 만든다. 그리고 각 정점들이 가져야할 색을 가지게 만든다.  
```cpp
for (int i = 0; i < 800; i++) {

    auto location = glm::vec3(
        ofMap(ofNoise(ofRandom(1000), ofGetFrameNum() * 0.001), 0, 1, ofGetWidth() * -0.5, ofGetWidth() * 0.5),
        ofMap(ofNoise(ofRandom(1000), ofGetFrameNum() * 0.001), 0, 1, ofGetHeight() * -0.5, ofGetHeight() * 0.5),
        0);

    location = glm::normalize(location) * ofRandom(200, 350);
    this->mesh.addVertex(location);

    ofColor color;
    color.setHsb((int)ofMap(location.x, -350, 350, 240, 240 + 255) % 255, 255, 255, 32);
    this->mesh.addColor(color);
}
```

그 뒤 임의의 정점에 대해 가장 가까운 점 두개의 인덱스를 넣고, 그리고 자기 자신도 넣는다. (소스에서는 자기 자신을 굳이 체크하지 않고 거리가 0인점을 활용하여 자동으로 포함하게 해놓았다.) 

```cpp
for (int i = 0; i < this->mesh.getVertices().size(); i++) {

    auto location = this->mesh.getVertices()[i];
    vector<int> near_index_list;
    for (int k = 0; k < this->mesh.getVertices().size(); k++) {

        auto other = this->mesh.getVertices()[k];
        auto distance = glm::distance(location, other);

        if (distance < 50) {

            near_index_list.push_back(k);
        }
    }

    if (near_index_list.size() >= 3) {

        this->mesh.addIndex(near_index_list[0]);
        this->mesh.addIndex(near_index_list[1]);
        this->mesh.addIndex(near_index_list[2]);
    }
}
```
mesh의 기본 모드는 `OF_PRIMITIVE_TRIANGLE`이므로 세 개의 정점 정보가 삼각형을 이루며 그려진다. 다만, 그 정점 간 어떻게 촘촘히 빈틈없이 연결되는 지점이 있는 곳이 있는 반면, 비어있는 곳이 있다. 이런 곳은 어떤 논리때문에 생기는 걸까?    
`mesh`가 아직은 세세한 동작까지는 정의내리긴 내 수준에선 어려운 것 같다.  
