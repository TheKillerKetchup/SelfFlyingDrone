const myCanvas = document.getElementById("myCanvas");
const ctx = myCanvas.getContext("2d");
const w = window.innerWidth;
const h = window.innerHeight
myCanvas.width = w;
myCanvas.height = h;
let boundary = new Rectangle(w/2,h/2,w,h);
let qt = new QuadTree(boundary,5);
let particles = [];



/*
for(let i = 0;i<500;i++)
{
    let p = new Point(Math.random()*w,Math.random()*h);
    qt.insert(p);
}

/*
let range = new Rectangle(100,100,100,100);


animate();

document.onmousemove=(evt)=>{
    range = new Rectangle(evt.x,evt.y,100,100);
}
function drawQuery(q)
{
    drawRect(q.x,q.y,q.w,q.h,ctx, "green");
    let points = qt.query(q, []);
    //console.log(points);
    for(let p of points)
    {
        drawPoint(ctx,p,"green", 2.5);
    }
}
*/
/*
function animate()
{
    /*
    document.onmousedown=(evt)=>
    {
        for(let i = 0;i<5;i++)
        {
            let p = new Point(evt.x + (Math.random()*10) - 5,evt.y + (Math.random() * 10) - 5);
            qt.insert(p);
        }
    }
    
    //clearRect(0,0,myCanvas.width,myCanvas.height);
    qt.show(ctx);

    document.onkeydown=(evt)=>
    {
        
        switch(evt.keyCode){
            case 32:
                let range = new Rectangle(Math.random()*myCanvas.width,Math.random()*myCanvas.height,100,100);
                drawRect(range.x,range.y,range.w,range.h,ctx, "green");
                let points = [];
                qt.query(range,points);
                //console.log(points);
                for(let p of points)
                {
                    drawPoint(ctx,p,"green");
                }
            default:
                break;
        }
    }
    
    
    ctx.clearRect(0,0,myCanvas.width,myCanvas.height);
    //qt.show(ctx);


    
    requestAnimationFrame(animate);
}
*/

