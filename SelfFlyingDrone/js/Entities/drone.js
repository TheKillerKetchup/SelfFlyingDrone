//make it 3d someday.
class Drone{
    constructor(x, y, bodyLength, bodyWidth,
        propellerLength, propellorWidth,
        accelerationFront = 0, brakeFront = 0,
        accelerationSide = 0, brakeSide = 0,
        drag = 0,
        controlType = "DUMMY")
    {
        this.x = x;
        this.y = y;
        this.bodyLength = bodyLength;
        this.bodyWidth = bodyWidth;
        this.propellerLength = propellerLength;
        this.propellorWidth = propellorWidth;
        //this.height = height; // Height of the drone, important for 3D collision
        this.aFront = accelerationFront;
        this.brakeFront = brakeFront;
        this.aSide = accelerationSide;
        this.brakeSide = brakeSide;
        this.drag = drag;
        //this.aVertical = accelerationVertical; // Upwards acceleration
        //this.brakeVertical = brakeVertical; // Braking/deceleration for vertical movement
        this.controlType = controlType; // Manual or AI-based control
        
        //so the idea is probably to tilt the entire x/y axis
        //we can't use the old car idea b/c drones move x and y
        //add turning manuevers much later
        this.velocity = { x: 0, y: 0}; // Current velocity in each direction
        //this.batteryLevel = 100; // Battery level in percentage
        this.floor = 0.005;

        this.controls = new Controls(this.controlType);

        //first four are the 4 diagonal directions
        //last four are the corners of the rect
        this.dirs = [
            [-1,-1],
            [1,1],
            [-1,1],
            [1,-1],
            [0,1],
            [1,1],
            [1,0],
            [0,0]
        ]
        this.polygons = [];
        this.damaged = false;
    }

    update(ctx,obstacles)
    {
        this.#assessDamage(obstacles);
        this.#move();
        this.draw(ctx);
    }
    #move()
    {
        //moving forward
        if(this.velocity.y <= 0)
        {
            //console.log("Moving forward!");
            if(this.controls.forward == true)
            {
                this.velocity.y -= this.aFront;
            }
            if(this.controls.reverse == true)
            {
                this.velocity.y += this.brakeFront;
            }
        }
        //moving backwards
        if(this.velocity.y >= 0)
        {
            if(this.controls.forward == true)
            {
                this.velocity.y -= this.brakeFront;
            }
            if(this.controls.reverse == true)
            {
                this.velocity.y += this.aFront;
            }
        }
        //moving left 
        if(this.velocity.x <= 0)
        {
            if(this.controls.left == true)
            {
                this.velocity.x -= this.aFront;
            }
            if(this.controls.right == true)
            {
                this.velocity.x += this.brakeFront;
            }
        }
        //moving right
        if(this.velocity.x >= 0)
        {
            if(this.controls.left == true)
            {
                this.velocity.x -= this.brakeFront;
            }
            if(this.controls.right == true)
            {
                this.velocity.x += this.aFront;
            }
        }
        //console.log(this.velocity);


        this.velocity.x -= (this.drag)*Math.pow(this.velocity.x,3);
        this.velocity.y -= (this.drag)*Math.pow(this.velocity.y,3);

        if(Math.abs(this.velocity.x) <= this.floor) this.velocity.x = 0;
        if(Math.abs(this.velocity.y) <= this.floor) this.velocity.y = 0;

        this.x += this.velocity.x;
        this.y += this.velocity.y;
        //console.log(this.velocity);
    }

    #createShapes()
    {
        //so basically its the 5 rectangles
        let dirs = [[-1,-1],[1,-1],[1,1],[-1,1]];
        
        let bodyRect = new Rectangle(this.x,this.y,this.bodyWidth,this.bodyLength);
        this.polygons.push(bodyRect);
        for(let dir of dirs)
        {
            let x = this.x + (dir[0]*this.bodyWidth/2);
            let y = this.y + (dir[1]*this.bodyLength/2);
            let propeller = new Rectangle(x,y,this.propellorLength,this.propellerWidth);
        }
        
    }
    #assessDamage(obstacles)
    {

    }

    draw(ctx)
    {
        this.polygon = [];
        ctx.save();

        ctx.fillStyle = "grey";
        ctx.strokeStyle = "black";
        if(this.damaged)
        {
            ctx.fillStyle = "red";
            ctx.strokeStyle = "red";
        }
        ctx.lineWidth = 2;

        //ctx.translate(this.x,this.y);

        //the 4 propellers
        for(let i = 0;i<=3;i++)
        {
            const dir = this.dirs[i];
            const x1 = (this.x+this.bodyLength/2);
            const y1 = (this.y+this.bodyLength/2);
            const x2 = (this.x+this.bodyLength/2) + (dir[0]*this.propellerLength);
            const y2 = (this.y+this.bodyWidth/2) + (dir[1]*this.propellerLength);

            this.polygons.push([{x:x1,y:y1},{x:x2,y:y2}]);
            ctx.beginPath();
            ctx.moveTo(x1,y1);
            ctx.lineTo(x2,y2);
            ctx.stroke();
            ctx.fill();
        }
        
        this.#createShapes();

        ctx.beginPath();
        ctx.rect(this.x,this.y,this.bodyWidth,this.bodyLength);
        ctx.fill();
        ctx.stroke();
        
            
        
        ctx.restore();
    }
}
class dronePropellers
{
    constructor(x,y,length,width)
    {
        this.x = x;
        this.y = y;
        this.length = length;
        this.width = width;

    }
}
class droneBody
{
    constructor(x,y,length,width, angle)
    {

    }
}