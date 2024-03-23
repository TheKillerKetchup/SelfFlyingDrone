function lerp(A,B,t)
{
    return A + (B-A)*t;
}

//all vectors and points are "3d" -> [x,y,z], but z is zero.
//ellipses are defined as [centerX,centerY,radiusX,radiusY,rotation]
//convex polygons are defined as [centerX,centerY,sides,radius,rotation]
function GJK(shape1, shape2, isEllipse1, isEllipse2)
{
    let dir = createVector([shape1.x,shape1.y,0], [shape2.x,shape2.y,0])
    let simplex = [support(dir,shape1,shape2,isEllipse1,isEllipse2)];
    let set = new Set();
    let mx = 2;
    if(!isEllipse1) mx *= shape1.sides;
    if(!isEllipse2) mx *= shape2.sides;
    dir = createVector(simplex[0],[0,0,0]);
    console.log("begin!");
    while(true)
    {
        A = support(dir,shape1,shape2,isEllipse1,isEllipse2);
        if(set.has(A)) return false;
        console.log("iteration!");
        //console.log(dot(A,dir));
        if(dot(A,dir) <= 0) return false;
        simplex.push(A);
        set.add(A);
        if(handleSimplex(simplex,dir)) return true;
        mx--;
        //if(mx <= 0) break; 
    }
}

/*
here im gonna modify dir and treat it as a global variable b/c it is passed by refernece
if for some reason this does not work in another language, we cna always make a vector class and modify dir that way
*/
function handleSimplex(simplex,dir)
{
    if(simplex.length == 2) return lineCase(simplex, dir);
    return triangleCase(simplex, dir);
}
function triangleCase(simplex, dir)
{
    const [C,B,A] = simplex;
    const AB = createVector(A,B), AC = createVector(A,C), AO = createVector(A,[0,0,0]);
    let ABnormal = tripleCrossProduct(AB,AC,AB), ACnormal = tripleCrossProduct(AC,AB,AC);
    //its in region AB
    ABnormal = normalize(ABnormal);
    ACnormal = normalize(ACnormal);
    if(dot(ABnormal,AO) >= 0)
    {
        simplex.splice(2,1);
        for(let i = 0;i<dir.length;i++)
        {
            dir[i] = ABnormal[i];
        }
        //console.log("triangleABDIR: " + dir);
        return false;
    }else if(dot(ACnormal,AO) >= 0)
    {
        simplex.splice(1,1);
        
        for(let i = 0;i<dir.length;i++)
        {
            dir[i] = ACnormal[i];
        }
        //console.log("triangleACDIR: " + dir);
        return false;
    }
    return true;
}
function lineCase(simplex, dir)
{
    const A = simplex[1];
    const B = simplex[0];
    const AB = createVector(A,B), AO = createVector(A,[0,0,0]);
    let ABnormal = tripleCrossProduct(AB,AO,AB);
    ABnormal = normalize(ABnormal);
    for(let i = 0;i<dir.length;i++)
    {
        dir[i] = ABnormal[i];
    }
    //console.log("lineDIR" + dir);
    return false;
}

function support(dir,shape1, shape2, isEllipse1, isEllipse2)
{
    const dir2 = normalize(dir);
    dir2.forEach((x,i) => {dir[i] = x});
    //console.log("suppDIR: " + dir);
    let s1 = isEllipse1 ? supportEllipse(shape1,dir) : supportPolygon(shape1,dir);
    let negDir = dir.map(x => -x);
    let s2 = isEllipse2 ? supportEllipse(shape2,negDir) : supportPolygon(shape2,negDir);
    //this is supposed to be s1-s2
    //console.log([s1,s2,subtractVectors(s1,s2)]);
    return subtractVectors(s1,s2);
}

function supportPolygon(shape, dir)
{
    //these are all 3-item objects
    let mx = -1000000;
    let points = shape.points;
    let ans = points[0];

    points.forEach(point => {
        //console.log("POINT: " + point);
        const dotProduct = dot(point,dir);
        if(dotProduct > mx)
        {
            mx = dotProduct;
            ans = point;
        }
        //console.log("POINT:" + point);
    })
    //console.log("SUPPORT POLYGON: " + ans);
    return ans;
}
//dir is a unit vector.
//upgrade this to 3d later
function supportEllipse(shape,dir)
{
    let x2 = (shape.hAxis * dir[0]);
    let y2 = (shape.vAxis * dir[1]);
    const angle = shape.offsetAngle;
    //console.log("SUPPORT ELLIPSE init:" + [shape.hAxis,shape.vAxis,angle]);
    //console.log("SUPPORT ELLIPSE init" + [dir[0],dir[1]]);
    //console.log("ADDING to CENTER1:" + [x2,y2]);
    const x3 = x2*Math.cos(angle) - y2*Math.sin(angle);
    const y3 = x2*Math.sin(angle) + y2*Math.cos(angle);
    //console.log("ADDING to CENTER2:" + [x2,y2]);

    let ans = [shape.x+x3,shape.y+y3,0];
    //console.log("SUPPORT ELLIPSE: " + ans);
    return ans;
}

function tripleCrossProduct(a,b,c)
{
    //a,b,c are vectors
    return cross(a,cross(b,c));
}

//theta is clockwise
function rotatePoint(x,y,theta)
{
    const newX = x*Math.cos(theta) + y*Math.sin(theta);
    const newY = -x*Math.sin(theta) + y*Math.cos(theta);
    return [newX, newY, 0];
}

function dot(a,b)
{
    //two lists, assumed to be of equal length

    /*
    //return (a,b) => a.map((x,i) => a[i]*b[i]).reduce((m,n) => m+n);

    .map converts it into two lists -> x are values, i is index
    then it feeds the inidices of so we multiply across each dimension. 
    then we reduce the list to a single value by summation
    */

    //written more understandably
    //console.log(a + " DOT " + b);
    if(a.length != b.length)
    {
        console.log("A and B are not the same length! DOT");
        return 1000;
    }
    let sum = 0;
    for(let i = 0;i<a.length;i++)
    {
        sum += (a[i]*b[i]);
    }
    return sum;
}

function cross(a,b)
{
    //a and b are lists, assumed to be of equal length
    //console.log(a + " CROSS " + b);
    if(a.length != 3 &&  b.length != 3)
    {
        console.log("A and B are not the same length! CROSS");
        return [0,0,0];
    }

    let c = [];

    c[0] = (a[1]*b[2])-(a[2]*b[1]);
    c[1] = (a[2]*b[0])-(a[0]*b[2]);
    c[2] = (a[0]*b[1])-(a[1]*b[0]);

    return c;
}

//turn vector into unit vector
function normalize(v)
{
    /*
    //console.log("VECTOR:" + v);
    let sum = 0;
    for(let i = 0;i<v.length;i++)
    {
        sum += v[i]*v[i];
    }
    sum = Math.sqrt(sum);
    if(sum == 0) return v;

    let ans = v.map(x => x/sum);
    //console.log("SUM:" + sum);
    //console.log("UNIT VECTOR:" + ans);
    return ans;
    */
   let sum = v.reduce((acc, val) => acc + val*val, 0);
   sum = Math.sqrt(sum);
   if(sum == 0) return v.map(() => 0);

   return v.map(x => x/sum);
}

//creates a vector pointing from p1 -> p2
function createVector(point1,point2)
{
    //console.log(point1 + "->" + point2);
    return point1.map((x,i) => point2[i]-point1[i]);
}

function subtractVectors(v1,v2)
{
    return v1.map((x,i) => v1[i]-v2[i]);
}