function lerp(A,B,t)
{
    return A + t*(B-A);
}
//this is for two lines!
function getIntersection(A,B,C,D)
{
    const topT = (D.x-C.x)*(A.y-C.y) - (D.y-C.y)*(A.x-C.x);
    const topU = (C.y-A.y)*(A.x-B.x) - (C.x-A.x)*(A.y-B.y);
    //the bottom for both is the same
    const bottom = (D.y-C.y)*(B.x-A.x)-(B.y-A.y)*(D.x-C.x);

    if(bottom != 0)
    {
        const u = topU/bottom;
        const t = topT/bottom;
        if(t <= 1 && t > 0 && u > 0 && u <= 1)
        {
            return {
                x:lerp(A.x,B.x,t),
                y:lerp(C.y,D.y,u),
                offset:t
            }
        }
    }
    //they dont intersect
    return null;
}
function drawDot(ctx,A, label, isRed = false, radius = 15)
    {
        ctx.fillStyle = isRed ? "red":"white";
        ctx.beginPath();   
        ctx.arc(A.x,A.y,radius,0,Math.PI*2);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = "black";
        ctx.font = "bold 16px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(label,A.x,A.y);
        //if I do ctx.fill() again it will refill that circle. not sure why but it does
    }