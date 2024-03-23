class Controls{
    constructor(controlType)
    {
        this.controlType = controlType;
        this.forward = false;
        this.backward = false;
        this.left = false;
        this.right = false;

        switch(controlType)
        {
            case "WASD":
                this.#addWASD();
                break;
            case "KEYS":
                //
                this.#addKEYS();
                break;
            default:
                //go fuck yourself
                console.log("no control type!");
                break;    
        }
    }
    #addWASD()
    {
        document.onkeydown=(evt)=>
        {
            switch(evt.key)
            {
                case "w":
                    this.forward = true;
                    break;
                case "a":
                    this.left = true;
                    break;
                case "s":
                    this.backward = true;
                    break;
                case "d":
                    this.right = true;
                    break;
                default:
                    //console.log("listening for wasd, got nothing >_< uwu");
                    break;

            }
        }
        document.onkeyup=(evt)=>
        {
            switch(evt.key)
            {
                case "w":
                    this.forward = false;
                    break;
                case "a":
                    this.left = false;
                    break;
                case "s":
                    this.backward = false;
                    break;
                case "d":
                    this.right = false;
                    break;
                default:
                    //console.log("listening for wasd, got nothing >_< uwu");
                    break;

            }
        }
    }

    #addKEYS()
    {
        document.onkeydown=(evt)=>
        {
            switch(evt.key)
            {
                case "ArrowUp":
                    this.forward = true;
                    break;
                case "ArrowLeft":
                    this.left = true;
                    break;
                case "ArrowRight":
                    this.right = true;
                    break;
                case "ArrowDown":
                    this.backward = true;
                    break;
                default:
                    //console.log("listening for keys, got nothing >_< uwu");
                    break;

            }
        }
        document.onkeyup=(evt)=>
        {
            switch(evt.key)
            {
                case "ArrowUp":
                    this.forward = false;
                    break;
                case "ArrowLeft":
                    this.left = false;
                    break;
                case "ArrowRight":
                    this.right = false;
                    break;
                case "ArrowDown":
                    this.backward = false;
                    break;
                default:
                    //console.log("listening for keys, got nothing >_< uwu");
                    break;

            }
        }
    }
}