class Controls
{
    constructor(controlType)
    {
        this.forward = false;
        this.reverse = false;
        this.left = false;
        this.right = false;
        this.controlType = controlType;
        switch(this.controlType)
        {
            case "KEYS":
                this.#addListeners();
                break;
        }

    }
    #addListeners()
    {
        document.onkeydown=(evt)=>
        {
            switch(evt.key)
            {
                case "w":
                case "ArrowUp":
                    this.forward = true;
                    break;
                case "s":
                case "ArrowDown":
                    this.reverse = true;
                    break;
                case "a":
                case "ArrowLeft":
                    this.left = true;
                    break;
                case "d":
                case "ArrowRight":
                    this.right = true;
                    break;
            }
        }
        document.onkeyup=(evt)=>
        {
            switch(evt.key)
            {
                case "w":
                case "ArrowUp":
                    this.forward = false;
                    break;
                case "s":
                case "ArrowDown":
                    this.reverse = false;
                    break;
                case "a":
                case "ArrowLeft":
                    this.left = false;
                    break;
                case "d":
                case "ArrowRight":
                    this.right = false;
                    break;
            }
        }
    }
}