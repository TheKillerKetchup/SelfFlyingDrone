class Point{
    constructor(x,y, userData)
    {
        this.x = x;
        this.y = y;
        this.userData = userData;
    }
}
class Rectangle{
    constructor(x,y,w,h)
    {
        //x, y are the centers
        //revamp this later to where (x,y) is the topleft corner, as it should be
        //the true width and height are both twice of what this guy is saying it is?
        //b/c it stretches w and h in both directions of both axises
        //what a fuckingn ightmare 
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        this.left = this.x-this.w;
        this.right = this.x+this.w;
        this.top = this.y-this.h;
        this.bottom = this.y+this.h;
    }
    containsPoint(point)
    {
        //it has to be after xleft, before xright, after ytop, before ybottom
        return (point.x >= this.left && 
        point.x <= this.right && 
        point.y >= this.top && 
        point.y <= this.bottom);
    }
    intersectsRect(range)
    {
        if(this.right < range.left) return false;
        if(range.right < this.left) return false;
        if(range.top > this.bottom) return false;
        if(this.top > range.bottom) return false;
 
        return true;
    }
    /*
    Range is a circle
    check each of the four edges, which are all convientantly lines.
    if the distance from the line to the range is greater than x, they are seperated -> no intersection
    */
    intersectsCircle(range)
    {
        let r = range.r;
        //console.log((Math.abs(range.x - this.right) > r|| Math.abs(range.x - this.left) > r) ||  (Math.abs(range.y - this.top) > r || Math.abs(range.y - this.bottom) > r));
        return (Math.abs(range.x - this.right) > r|| Math.abs(range.x - this.left) > r) ||  
        (Math.abs(range.y - this.top) > r || Math.abs(range.y - this.bottom) > r);
    }
}
class Circle{
    constructor(x,y,r, userData)
    {
        this.x = x;
        this.y = y;
        this.r = r;
        
        this.rSquared = this.r*this.r;
        this.userData = userData;
    }

    contains(point)
    {
        let r = 0;
        if(point.r) r += point.r;
        if(point.radius) r+= point.radius
        return (dist(this.x,this.y,point.x,point.y) < (r+this.r))
    }

    intersectsRect(range)
    {
        let r = this.r;
        if(Math.abs(this.x - range.right) > r|| Math.abs(this.x - range.left) > r) return false;
        if(Math.abs(this.y - range.top) > r || Math.abs(this.y - range.bottom) > r) return false;
        return true;
    }
    /*
    Range is a circle
    check each of the four edges, which are all convientantly lines.
    if the distance from the line to the range is greater than x, they are seperated -> no intersection
    */
    intersectsCircle(circle)
    {
        return (dist(this.x,this.y,circle.x,circle.y) < (circle.r+this.r));
    }
}