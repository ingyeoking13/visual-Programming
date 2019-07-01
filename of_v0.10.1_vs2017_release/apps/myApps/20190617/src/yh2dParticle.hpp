#include "ofMain.h"

class Mover
{
private:
	glm::vec2 location;
	glm::vec2 velocity;
	glm::vec2 acceleration;
public:

	float radius;
	Mover() : radius(1)
	{
		location = glm::vec2(0, 0);
	};

	Mover(float x, float y, float radius) : radius(radius)
	{
		location = glm::vec2(x, y);
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
		float x = location.x, y = location.y;

		for (int i = 0; i < radius; i++)
		{
			for (int j = 0; j < radius; j++)
			{
				if (i % 2 && j % 2) ofDrawCircle(x + i, y + j, 1);
			}
		}
	};

	void checkEdge()
	{
		float x = location.x, y = location.y;
		float w = ofGetWidth(), h = ofGetHeight();

		if (x + radius > w) x = w - radius, velocity.x =-velocity.x;
		if (x - radius < 0 ) x = radius, velocity.x = -velocity.x;

		if (y + radius > h) y= h - radius, velocity.y = -velocity.y;
		if (y - radius < 0) y = radius, velocity.y = -velocity.y;
	}
};
class Heart 
{
private: 

public:


};