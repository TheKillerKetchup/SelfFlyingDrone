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
function getPolyIntersections(poly1,poly2)
{
    let prev1 = poly1[0];
    let prev2 = poly2[0];
    //let contactPoints = [];

    poly1.forEach(point1 => {
        poly2.forEach(point2 => {
                //const contactPoint = getIntersection(prev1,point1,prev2,point2);
                if(getIntersection(prev1,point1,prev2,point2)) return true;//contactPoints.push(contactPoint);
                prev2 = point2;
            });
            prev1 = point1;
        });
    //console.log(poly1.length,poly2.length);
    //return contactPoints.length !== 0 ? true : null;
    return false;
}

function getContactPoints(shape1,shape2)
{
    //we loop through all the points of both of the polygons
    //console.log(allContactPoints.length);

    shape1.polygons.forEach(poly1 => {
        shape2.polygons.forEach(poly2 => {
                //const contactPoints = getPolyIntersections(poly1,poly2);
                if(getPolyIntersections(poly1,poly2)) return true;//allContactPoints.push(contactPoints);
                //console.log(allContactPoints.length);
            });
        });

    //console.log(allContactPoints.length);
    return false;
}
