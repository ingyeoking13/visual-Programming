#pragma once
#include "ofMain.h"

class myRect
{
public:

	double mass; 
	double width;
	glm::dvec2 vel;

	glm::dvec2 pos;

	myRect(int x, int y, int w)
	{
		pos.x = x;
		pos.y = y;
		width = w;
	}
	myRect() {};

	void update()
	{
		pos.x += vel.x;
		pos.y += vel.y;
	}

	bool chkCollisionWithRect(myRect other)
	{
		double dist = (pos.x - other.pos.x);
		return abs(dist) <= width;
	}

	bool chkCollisionWithWall()
	{
		return pos.x <= 100;
	}

	double CollisionWithRect(myRect other)
	{
		double sumM = mass + other.mass;
		double newV = (mass - other.mass) / sumM * vel.x;
		newV += (2 * other.mass / sumM) * other.vel.x;
		return newV;
	}

	void CollisionWithWall()
	{
		vel.x = -vel.x;
	}
};