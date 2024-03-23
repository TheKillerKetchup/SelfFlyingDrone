const canvas = document.getElementById("myCanvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const shape1 = new Polygon(100,100,85,100, 3,0, "WASD");
const shape2 = new Polygon(500,500,4,85);
const ctx = myCanvas.getContext("2d");

animate(0);

function animate(time)
{
    ctx.save();

    ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
    shape1.update(ctx);
    shape2.update(ctx);
    if(!shape1.damaged && GJK(shape1,shape2,false,false))
    {
        shape1.damaged = true;
        console.log("collision detected!");
    }

    ctx.restore();
    requestAnimationFrame(animate);
}