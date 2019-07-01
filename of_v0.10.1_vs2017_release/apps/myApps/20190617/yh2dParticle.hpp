#include "ofMain.h"

class Mover
{
public:
	float radius;

	glm::vec2 location;
	glm::vec2 velocity;
	glm::vec2 acceleration;

	Mover() : radius(1)
	{
		location = glm::vec2(0, 0);
	};

	Mover(float x, float y, float radius) : radius(radius)
	{
		location = glm::vec2(x, y);
	};

	Mover(glm::vec2 location, float radius) : location(location), radius(radius)
	{
	};

	void update()
	{
		checkEdge();
		velocity += acceleration;
		location += velocity;
		acceleration = glm::vec2(0, 0);
	};

	void force(glm::vec2 f)
	{
		acceleration += f;
	};

	void display()
	{
		ofDrawCircle(location.x, location.y, radius);
	};

	void checkEdge()
	{
		float x = location.x, y = location.y;
		if (x+radius > ofGetWidth() || x-radius < 0) velocity.x = -velocity.x;
		if (y+radius > ofGetWidth() || y-radius < 0 ) velocity.y = -velocity.y;
	}
};