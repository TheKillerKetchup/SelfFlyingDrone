class Polygon
{
    constructor(x,y, sides, radius, velocity = 3,angleOffset = 0, controlType)
    {
        //points is an array of points - 2-item objects with an x and a y
        this.x = x;
        this.y = y;
        this.sides = sides;
        this.radius = radius;
        this.angleOffset = angleOffset;
        this.controlType = controlType;
        this.velocity = velocity;

        this.controls = new Controls(controlType);
        this.damaged = false;
        this.points = [];
    }
    update(ctx)
    {
        this.#move();
        this.draw(ctx);
    }

    #move()
    {
        if(this.controls.forward) this.y -= this.velocity;
        if(this.controls.left) this.x -= this.velocity;
        if(this.controls.right) this.x += this.velocity;
        if(this.controls.backward) this.y += this.velocity;
    }
    draw(ctx)
    {
        ctx.strokeStyle = "white";
        if(this.damaged) ctx.strokeStyle = "red";
        ctx.lineWidth = 2;

        ctx.beginPath();
        this.points = [];
        for(let i = 0;i<=this.sides;i++)
        {
            const angle = ((Math.PI * 2 ) / this.sides) * i + this.angleOffset;
            const posX = this.x + (this.radius*Math.cos(angle));
            const posY = this.y + (this.radius*Math.sin(angle));
            this.points.push([posX,posY,0]);

            i == 0 ? ctx.moveTo(posX,posY):ctx.lineTo(posX,posY);
        }
        ctx.stroke();
        ctx.fill();
    }
}
class Ellipse{
    constructor(x,y,hAxis,vAxis, velocity = 3, offsetAngle = 0, controlType)
    {
        this.x = x;
        this.y = y;
        this.hAxis = hAxis;
        this.vAxis = vAxis;
        this.offsetAngle = offsetAngle;
        this.controlType = controlType;

        this.controls = new Controls(controlType);
        this.damaged = false;
    }

    update(ctx)
    {
        this.#move();
        this.draw(ctx);
    }

    #move()
    {
        if(this.controls.forward) this.y -= this.velocity;
        if(this.controls.left) this.x -= this.velocity;
        if(this.controls.right) this.x += this.velocity;
        if(this.controls.backward) this.y += this.velocity;
    }

    draw(ctx)
    {
        ctx.strokeStyle = "white";
        ctx.lineWidth = 2;

        ctx.beginPath();
        
        ctx.ellipse(this.x,this.y,this.hAxis,this.vAxis,this.offsetAngle, 0, Math.PI*2);

        ctx.stroke();
        ctx.fill();

    }
}