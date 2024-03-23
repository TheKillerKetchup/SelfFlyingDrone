class QuadTree{
    constructor(boundary, n)
    {
        this.boundary = boundary;
        this.capacity = n;
        
        this.points = [];
        this.divided = false;
    }
    subdivide()
    {
        //NW,NE,SW,SE
        let {x,y,w,h} = this.boundary;

        let nW = new Rectangle(x - w / 2, y - h / 2, w/2, h/2);
        this.northWest = new QuadTree(nW,this.capacity);
        let nE = new Rectangle(x + w / 2, y - h / 2, w/2, h/2);
        this.northEast = new QuadTree(nE,this.capacity);
        let sW = new Rectangle(x - w / 2, y + h / 2, w/2, h/2);
        this.southWest = new QuadTree(sW,this.capacity);
        let sE = new Rectangle(x + w / 2, y + h / 2, w/2, h/2);
        this.southEast = new QuadTree(sE,this.capacity);

        this.divided = true;
        //console.log(this.points);

        if(!this.points) return;
        for(let p of this.points)
        {
            this.insert(p);
        }

    }

    insert(point)
    {
        //console.log(this.boundary.contains(point));
        if(!this.boundary.containsPoint(point)) return false;

        //console.log("inserting point" + point);
        if(this.points.length < this.capacity)
        {
            //console.log("successfully inserted!");
            this.points.push(point);
            return true;
        } else {
            if(!this.divided)
            {
                this.subdivide();
            }
            //console.log("attempting to insert into divisions");
            if(this.northEast.insert(point)) return true;
            if(this.northWest.insert(point)) return true;
            if(this.southEast.insert(point)) return true;
            if(this.southWest.insert(point)) return true;
        }
    }

    queryRect(range, found)
    {
        //range is also a rectangle
        if(!found) found = [];
        if(!this.boundary.intersectsRect(range)){
            return;
        }

        //console.log("in here!");
        if(this.divided)
        {
            this.northWest.queryRect(range,found);
            this.northEast.queryRect(range,found);
            this.southWest.queryRect(range,found);
            this.southEast.queryRect(range,found);
        }else{
            for(let p of this.points)
            {
                if(range.containsPoint(p))
                {
                    found.push(p);
                }
            }
        } 
        return found;
    }
    queryCircle(range,found)
    {
        //range is also a rectangle
        if(!found) found = [];
        if(!this.boundary.intersectsCircle(range)) return found;

        if(this.divided)
        {
            this.northWest.queryCircle(range,found);
            this.northEast.queryCircle(range,found);
            this.southWest.queryCircle(range,found);
            this.southEast.queryCircle(range,found);
        }else{
            for(let p of this.points)
            {
                if(range.contains(p))
                {
                    found.push(p);
                }
            }
        } 
        return found;
    }

    show(ctx)
    {
        const {x,y,w,h} = this.boundary;
        drawRect(x,y,w,h,ctx);
        if(this.divided)
        {
            this.northWest.show(ctx);
            this.northEast.show(ctx);
            this.southWest.show(ctx);
            this.southEast.show(ctx);
        }
        /*
        for(let p of this.points)
        {
            drawPoint(ctx,p);
        }
        */

    }

    drawQuery(q)
    {
        drawRect(q.x,q.y,q.w,q.h,ctx, "green");
        let points = this.queryRect(q);
        //console.log(points);
        for(let p of points)
        {
            drawPoint(ctx,p,"green", 2.5);
        }
    }
}