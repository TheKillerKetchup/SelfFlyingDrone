class Point{
    constructor(x,y)
    {
        this.x = x;
        this.y = y;
    }
}
class Circle{
    constructor(x,y,r)
    {
        this.x = x;
        this.y = y;
        this.r = r;
    }
}
class Rectangle{
    //the way this works is basically its drawn from x,y as the center(b/c polygons are different)
    //steal polygons and ellipses from GJK
    constructor(x,y,w,h, angle)
    {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.angle = angle;
        //angle is clockwise, angle is negative b/c 

        this.dirs = [[-1,-1],[1,-1],[1,1],[-1,1]];
        this.points = [];
        this.#createPoints();
    }
    update(ctx, color = "black", lineWidth = 2)
    {
        this.#draw(ctx, color, lineWidth);
    }
    #draw(ctx, color = "black", lineWidth = 2)
    {
        this.#createPoints();

        let p0 = this.points[0];
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        ctx.moveTo(p0.x,p0.y);

        for(let point of this.points)
        {
            ctx.lineTo(point.x,point.y);
        }
        ctx.lineTo(p0.x,p0.y);
        ctx.stroke();
    }
    #createPoints()
    {
        for(let dir of dirs)
        {
            let x = this.x + (this.dirs[0]*this.w/2);
            let y = this.y + (this.dirs[1]*this.h/2);
            let xRot = this.x + (x-this.x)*Math.cos(-angle) - (y-this.y)*Math.sin(-angle);
            let yRot = this.y - (y-this.y)*Math.sin(-angle) - (x-this.x)*Math.cos(-angle);
            let p = new Point(xRot, yRot, this);
            this.points.push(p);
        }
    }
}
class Line{
    constructor(point1,point2)
    {
        this.p1 = point1;
        this.p2 = point2;
    }
}