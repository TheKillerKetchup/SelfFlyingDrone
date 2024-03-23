const myCanvas = document.getElementById("myCanvas");

myCanvas.width = window.innerWidth*0.9;
myCanvas.height = window.innerHeight;

const droneDummy = new Drone(100,100,20,20, 30);
const drone = new Drone(500,500, 20, 20, 30, 0.1, 0.2, 0.05, 0.1, 0.001, "KEYS");
const gameCtx = myCanvas.getContext("2d");

let cP = [];
animate();

function animate(time)
{
    //console.log(t);
    gameCtx.save();

    //droneCtx.translate(0,-drone.y+window.innerHeight*0.5);
    gameCtx.clearRect(0,0,window.innerWidth,window.innerHeight);
    drone.update(gameCtx,[droneDummy]);
    droneDummy.update(gameCtx,[]);    



    gameCtx.restore();

    requestAnimationFrame(animate);
}