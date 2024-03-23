function SAT(polygon1,polygon2)
{
    const axises = getAxises(polygon1).concat(getAxises(polygon2));
    for(let axis of axises)
    {
        let proj1 = projectPolygon(polygon1,axis);
        let proj2 = projectPolygon(polygon2,axis);
        if(proj1.min > proj2.max || proj2.min > proj1.max) return false;
    }
    return true;
}


function projectPolygon(polygon,axis)
{
    let min = 1000000, max = -1000000;
    for(let point of polygon.points)
    {
        let dot = (point.x * axis.x) + (point.y*axis.y);
        min = Math.min(min,dot);
        max = Math.max(max,dot);
    }
    return {min:min,max:max};
}

function getAxises(polygon)
{
    let axises = [];

    for(let i = 0;i<polygon.points.length;i++)
    {
        let p1 = polygon.points[i];
        let p2 = polygon.points[(i+1 == polygon.points.length) ? 0:1];
        //(-dy,dx)
        let dy = p2.y-p1.y, dx = p2.x-p1.x;
        let normal = {x:(dy*-1),y:dx};
        axises.push(normal);
    }
}