class Point{
    constructor(x,y)
    {
        this.x = x;
        this.y = y;
    }
}
class Rectangle{
    constructor(x,y,w,h)
    {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        this.dirs = [[-1,-1],[1,-1],[1,1],[-1,1]];
        this.points = [];
        for(let dir of dirs)
        {
            let p = new Point(x+(dir[0]*w/2)+(dir[1]*h/2));
            this.points.push(p);
        }
    }
}