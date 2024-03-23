const myCanvas = document.getElementById("myCanvas");
const ctx = myCanvas.getContext("2d");
let w = window.innerWidth;
let h = window.innerHeight;
myCanvas.width = w;
myCanvas.height = h;
let boundary = new Rectangle(w/2,h/2,w,h, ctx);
let qt = new QuadTree(boundary,5);
let particles = [];
let range = new Rectangle(100,100,100,100);

for(let i = 0;i<500;i++)
{
    let p = new Particle(Math.random()*w,Math.random()*h,5);
    particles.push(p); 
    //console.log(p.r);
}


document.onmousemove=(evt)=>{
    range = new Rectangle(evt.x,evt.y,100,100);
}


animate();

function animate()
{
    w = window.innerWidth;
    h = window.innerHeight;
    ctx.clearRect(0,0,w,h);

    let boundary = new Rectangle(w/2,h/2,w,h, ctx);
    let qt = new QuadTree(boundary,5);

    for(let p of particles)
    {
        //console.log(p.r);
        let point = new Point(p.x,p.y,p);
        qt.insert(point);

        p.update(ctx);
        p.highlighted = false;
    }
    //qt.drawQuery(range);
    
    for(let p of particles)
    {
        
        
        let range = new Circle(p.x,p.y,p.r*2);
        let points = qt.queryCircle(range,[]);
        
        //console.log(p.r);
        //let range = new Rectangle(p.x,p.y,p.r*2,p.r*2);
        //let points = qt.queryRect(range,[]);
        //console.log(points.length);
        for(let point2 of points)
        {
            let other = point2.userData;
            if(p == other) continue;
            if(p.intersectsCircle(other)) p.highlighted = true;
        }
    }
    
    qt.show(ctx);
    requestAnimationFrame(animate);
}