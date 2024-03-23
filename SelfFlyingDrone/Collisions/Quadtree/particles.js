class Particle{
    constructor(x,y,r)
    {
        this.x = x;
        this.y = y;
        this.r = r;

        this.highlighted = false;
    }
    
    intersectsCircle(particle)
    {
        //console.log(dist(this.x,this.y,particle.x,particle.y) + "vs" + (this.r+particle.r))
        return dist(this.x,this.y,particle.x,particle.y) < (this.r+particle.r);
    }
    
    update(ctx, color = "black", jiggleX = 1, jiggleY = 1)
    {
        if(this.highlighted) color = "red";
        this.#move(ctx,color);
        this.#jiggle(jiggleX,jiggleY);
    }
    #move(ctx,color = "black")
    {
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc(this.x,this.y,this.r,0,Math.PI*2);
        ctx.fill();
    }
    #jiggle(x,y)
    {
        this.x += Math.random()*(2*x) - x;
        this.y += Math.random()*(2*y) - y;
    }
}

class Box
{
    constructor(x,y,w,h)
    {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
}