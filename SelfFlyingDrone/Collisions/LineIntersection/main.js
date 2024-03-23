const myCanvas = document.getElementById("myCanvas");
myCanvas.height = window.innerHeight;
myCanvas.width = window.innerWidth;
const ctx = myCanvas.getContext("2d");

const A = {x:100,y:200, name:"A"};
const B = {x:500,y:500, name:"B"};
const C = {x:75,y:400, name:"C"};
const D = {x:650,y:300, name:"D"};
const line1 = new Line(A,B);
const line2 = new Line(C,D);

let t = 0;
animate();

function animate()
{
    line1.draw(ctx);
    line2.draw(ctx);

    //console.log("uwu");
    const point = getIntersection(A,B,C,D);
    //console.log(point);
    if(point)
    {
        drawDot(ctx,point,"I");
    }

    t+= 0.005;
    requestAnimationFrame(animate);
}