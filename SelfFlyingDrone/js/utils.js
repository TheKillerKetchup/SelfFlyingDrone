function lerp(A,B,t)
{
    return A + (B-A)*t;
}
function dist(x1,y1,x2,y2)
{
    return Math.sqrt(
        Math.pow(Math.abs(x1-x2),2) + 
        Math.pow(Math.abs(y1-y2),2)
    )
}
function getIntersection(A,B,C,D)
{
    const topT = (D.x-C.x)*(A.y-C.y) - (D.y-C.y)*(A.x-C.x);
    const topU = (C.y-A.y)*(A.x-B.x) - (C.x-A.x)*(A.y-B.y);
    //the bottom for both is the same
    const bottom = (D.y-C.y)*(B.x-A.x)-(B.y-A.y)*(D.x-C.x);
    
    if(bottom != 0)
    {
        const t = topT/bottom;
        const u = topU/bottom;
        if(t <= 1 && t >= 0 && u >= 0 && u <= 1)
        {
            /*
            return {
                x:lerp(A.x,B.x,t), // = lerp(C.x,D.x,u)  -> cuz yk its an intersection
                y:lerp(C.y,D.y,u),
                offset:t
            }
            */
           return true;
        }
    }
    return false;
}