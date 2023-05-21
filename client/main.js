import bot from './assets/bot.svg';
import user from './assets/bot.svg';

const form = document.querySelector('form');
const chatContainer = document.querySelector('#chat_container');


let loadInterval;

function loader(element){
    element.textContent = '';
    loadInterval = setInterval(() => {
        element.textContent += ".";
        if(element.textContent === "....")
            element.textContent = "";

    },300)
}


function typeText(element,text){
    let index = 0;
    let interval = setInterval(() => {
        if (index <text.length){
            element.innerHTML += text.charAt(index);
            index++;
        }else{
            clearInterval(interval);
        }
    },20)

}

function generateUniqueId() {
    const timestamp = Date.now();
    const randomNumber = Math.random();
    const hexadecimalString = randomNumber.toString(16);

    return 'id-${timestamp}-${hexadecimalString}';
}

function chatstripe(isAi, value, uniqueId) {
    return (
        `
        <div class="wrapper ${isAi && 'ai'}">
          <div class="chat">
            <div class="profile">
              <img src="${isAi ? 'bot' : 'user'}" alt="${isAi ? 'bot' : 'user'}" />
            </div>
            <div class="message" id="${uniqueId}">${value}</div>
          </div>
        </div>
      `

    )

  }
  

  const handleSubmit = async (e) => {

    e.preventDefault(); // because the default action after a form is submitted is to reload the page which we do not want
    const data = new FormData(form);

    data.get('prompt');
    form.reset();

    const uniqueId = generateUniqueId();
    chatContainer.innerHTML += chatstripe(true, "", uniqueId);
    chatContainer.scrollTop = chatContainer.scrollHeight;
    const messageDiv = document.getElementById(uniqueId);
    loader(messageDiv);

    const response = await fetch('https://npc-game.onrender.com/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        prompt:data.get('prompt')
      })
    })
    clearInterval(loadInterval);
    messageDiv.innerHTML = '';

    if(response.ok){
      const data = await response.json();
      const parsedData = data.bot.trim();
      typeText(messageDiv, parsedData);
    } else {
      const err = await response.text();
      messageDiv.innerHTML = "Something went wrong";
      alert(err);
      console.log(err);
    }
  }

  form.addEventListener('submit', handleSubmit);
  form.addEventListener('keyup', (e) => {
    if(e.keyCode === 13) {
        handleSubmit(e);
    }
  })

  






















  const preform = document.querySelector('preform');
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");

  const CANVAS_WIDTH = canvas.width = 600;
  const CANVAS_HEIGHT = canvas.height = 500;

  const playerImage = new Image();
  playerImage.src = 'assets/Transparent PNG/00_idle/skeleton-00_idle_00.png'

  let gameSpeed =0.01;
  const backgroundLayer1 = new Image();
  backgroundLayer1.src ='assets/PNG/platformer_background_3/Layers/layer01_Ground.png'
  const backgroundLayer2 = new Image();
  backgroundLayer2.src ='assets/PNG/platformer_background_3/Layers/layer02_Trees.png'
  const backgroundLayer3 = new Image();
  backgroundLayer3.src ='assets/PNG/platformer_background_3/Layers/layer03_Hills_1.png'
  const backgroundLayer4 = new Image();
  backgroundLayer4.src ='assets/PNG/platformer_background_3/Layers/layer04_Hills_2.png'
  const backgroundLayer5 = new Image();
  backgroundLayer5.src ='assets/PNG/platformer_background_3/Layers/layer05_Clouds.png'
  const backgroundLayer6 = new Image();
  backgroundLayer6.src ='assets/PNG/platformer_background_3/Layers/layer06_Rocks.png'
  const backgroundLayer7 = new Image();
  backgroundLayer7.src ='assets/PNG/platformer_background_3/Layers/layer07_Sky.png'



  class Layer{
    constructor(image, speedModifier){
      this.x=0;
      this.y=0;
      this.width=600;
      this.height =500;
      this.x2 =this.width;
      this.image= image;
      this.speedModifier= speedModifier;
      this.speed = gameSpeed * this.speedModifier

    }
    update(){
      this.speed = gameSpeed* this.speedModifier;
      if (this.x <= -this.width){
        this.x = this.width +this.x2 - this.speed;

      }
      if (this.x2 <= -this.width){
        this.x2 = this.width +this.x - this.speed;
        
      }
      this.x = Math.floor(this.x - this.speed);
      this.x2 = Math.floor(this.x2 - this.speed)

    }
    draw(){
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
      ctx.drawImage(this.image, this.x2, this.y, this.width, this.height);

    }
  }




  const layer1 = new Layer(backgroundLayer1,0);
  const layer2 = new Layer(backgroundLayer2, 0);
  const layer3 = new Layer(backgroundLayer3,0);
  const layer4 = new Layer(backgroundLayer4, 0);
  const layer5 = new Layer(backgroundLayer5,0);
  const layer6 = new Layer(backgroundLayer6,0.1);
  const layer7 = new Layer(backgroundLayer7, 0);
  
  //const  = document.querySelector('form');
  
  const gameObjects = [layer7,layer6,layer5,layer3,layer2,layer1];
  let player_x = 100;
  let player_y = 240;
  let enemy_x = 300;
  let enemy_y = 300;


  function form_appear(){
    form.style.display = 'flex';
    form.style.left = window.innerWidth/2 - (CANVAS_WIDTH/2) + player_x -50 + "px" ;
    form.style.top = window.innerHeight/2 - (CANVAS_HEIGHT/2) + player_y - 40+ "px";
  }

  function enemy_form_appear(){
    //chatContainer.innerHTML=""
    //const uniqueId_2 = generateUniqueId();
    //chatContainer.innerHTML += chatstripe(true, "", uniqueId_2);
    chatContainer.style.left = window.innerWidth/2 - (CANVAS_WIDTH/2) + enemy_x -50 + "px" ;
    chatContainer.style.top = window.innerHeight/2 - (CANVAS_HEIGHT/2) + enemy_y - 90+ "px";
  }
  

  function proxProp(isProx, value, uniqueId) {
    return (
        `
        <div class="wrapper ${isProx && 'prox'}">
          <div class="chat">
            <div class="message" id="${uniqueId}">${value}</div>
          </div>
        </div>
      `

    )

  }










  function positionChat(){
    chatContainer.style.left = window.innerWidth/2 - (CANVAS_WIDTH/2) + enemy_x -30 + "px" ;
    chatContainer.style.top = window.innerHeight/2 - (CANVAS_HEIGHT/2) + enemy_y - 50+ "px";
  }


  form.style.display = 'none';
  function animate(){
    ctx.clearRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT);
    gameObjects.forEach(object => {
      object.update();
      object.draw();
    });
    if(enemy_x - player_x <= 200){
      
      //const uniqueId_1 = generateUniqueId();
      //chatContainer.innerHTML = ""
      //chatContainer.innerHTML += proxProp(true, "PRESS 'X' TO TALK", uniqueId_1);
      //positionChat()
      document.addEventListener('keydown', function(event) {
        const key = event.key.toLowerCase()
        if (key === 'x') {
          
          enemy_form_appear()
          form_appear()
        }
      });
    } else{
      form.style.display = 'none';
    }
    ctx.drawImage(playerImage, player_x,player_y, 200, 184 );
    ctx.fillRect(300,300,100,100);
    requestAnimationFrame(animate);
    
  }
  animate();

