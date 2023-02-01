const canvas = document.getElementById('MyCan');
canvas.width = innerWidth
canvas.height = innerHeight
const ctx = canvas.getContext('2d');
let particalArray=[];
let adjustX=-9;
let adjustY=-5;
var data;


const Mouse={
    x:null,
    y:null,
    radius:innerWidth*0.08
}


window.addEventListener('resize', resizeCanvas);
function resizeCanvas() {
    canvas.width = window.innerWidth ;
    canvas.height = window.innerHeight;
    init();
}

window.addEventListener('mousemove',function(e){
    Mouse.x=e.x;
    Mouse.y=e.y;

})




function OnChangeText() {
    text=document.getElementById('text').value;
    ctx.fillStyle='white'
    ctx.font='18px Verdana';
    ctx.fillText(text,10,25);
    data=ctx.getImageData(0,0,280,30);
    ctx.strokeStyle='white'
    //ctx.strokeRect(0, 0, 280, 30);
    init();
}

class Particle{
    constructor(x,y) {
        this.x=x;
        this.y=y;
        this.size=5;
        this.baseX=this.x;
        this.baseY=this.y;
        this.density=(Math.random()*30)+7;
        this.color= '#196719';
        //this.color='white';

        
    }
    draw(){
        ctx.fillStyle=this.color
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
        ctx.closePath();
        ctx.fill();

    }
    update(){
        let dx=Mouse.x-this.x;
        let dy = Mouse.y-this.y;
        let dis=Math.sqrt(dx*dx+dy*dy);
        let forceX=dx/dis;
        let forceY=dy/dis;
        let macDis=Mouse.radius;
        let force=(macDis-dis)/macDis;
        let dirX=forceX * force *this.density;
        let dirY=forceY * force *this.density;

        if (dis<Mouse.radius) {
            this.x-=dirX;
            this.y-=dirY;  
        }
        else{
            if (this.x!==this.baseX) {
                let dx=this.x-this.baseX;
                this.x-=dx/10;
            }
            if (this.y!==this.baseY) {
                let dy=this.y-this.baseY;
                this.y-=dy/10;
            }
        }
    }
    
}


function init() {
    particalArray=[];
    for(let y=0,y2=data.height;y<y2;y++){
        for (let x=0,x2=data.width;x<x2;x++) {
            if (data.data[(y*4*data.width)+(x*4)+3]>128) {
                let posX=x + adjustX;
                let posY=y+ adjustY;
                particalArray.push(new Particle(posX*19,posY*29))
                //particalArray.push(new Particle(posX*19.5,posY*29))
            }
        }
    }
    animate();
}


function animate() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    connect();
    for (let i = 0; i < particalArray.length; i++) {
        particalArray[i].draw();
        particalArray[i].update();
        
    }
    
    requestAnimationFrame(animate)
}

function connect() {
    let opacityVal=1;
    for (let a = 0; a < particalArray.length; a++) {
        for (let b = 0; b < particalArray.length; b++) {
            // let dx=Mouse.x-this.x;
            // let dy = Mouse.y-this.y;
            // let dis=Math.sqrt(dx*dx+dy*dy);
            let dx=particalArray[a].x-particalArray[b].x;
            let dy=particalArray[a].y-particalArray[b].y;
            let dis=Math.sqrt(dx*dx+dy*dy);
           
            if (dis<45) {
                //ctx.strokeStyle=particalArray[a].color;
                opacityVal=1-(dis/45);
               // ctx.strokeStyle='rgba(255,255,255,'+opacityVal+')';
               ctx.strokeStyle='rgba(30,123,30,'+opacityVal+')';
                ctx.lineWidth=2;
                ctx.beginPath();
                ctx.moveTo(particalArray[a].x,particalArray[a].y);
                ctx.lineTo(particalArray[b].x,particalArray[b].y);
                ctx.stroke();
            }
        }
        
    }
}

function RandomRGB() {
    let color='#';
    let rand =Math.random();
    if (rand<0.3333) {
        color+='ff0000';
    }
    else if(rand<0.6666){
        color+='00ff00';
    }
    else{
        color+='0000ff'
    }
    return color;
}

function RandomColor() {
    var randomColor = Math.floor(Math.random()*16777215).toString(16);
    while(randomColor<6){
        randomColor = Math.floor(Math.random()*16777215).toString(16);
    }
    return '#'+randomColor;
    
}