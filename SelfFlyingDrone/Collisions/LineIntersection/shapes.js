class Line
{
    constructor(point1,point2)
    {
        //both objects with properties a and b
        this.point1 = point1;
        this.point2 = point2;
    }
    draw(ctx)
    {
        ctx.strokeStyle = "white";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(this.point1.x,this.point1.y);
        ctx.lineTo(this.point2.x,this.point2.y);
        ctx.stroke();
        drawDot(ctx,this.point1,this.point1.name);
        drawDot(ctx,this.point2,this.point2.name);
    }
}