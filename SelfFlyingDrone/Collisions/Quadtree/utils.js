function drawRect(x,y,w,h,ctx, color = "black",lineWidth = 2)
{
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    ctx.moveTo(x-w,y-h);
    ctx.lineTo(x+w,y-h);
    ctx.lineTo(x+w,y+h);
    ctx.lineTo(x-w,y+h);
    ctx.lineTo(x-w,y-h);
    ctx.stroke();
}

function drawPoint(ctx,p, color = "black", radius = 1)
{
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(p.x,p.y);
    ctx.arc(p.x,p.y,radius,0,Math.PI*2);
    ctx.fill();
}

function dist(x1,y1,x2,y2)
{
    let dX = Math.abs(x1-x2);
    let dY = Math.abs(y1-y2);
    return Math.sqrt((dX*dX)+(dY*dY));
}
