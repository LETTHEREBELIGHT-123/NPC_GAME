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
    console.log(text)
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
  
  function fight(tone){
    if (tone < -2){
      frame_y =0;
      frame_x = 0;
      enemy_x = enemy_x -120;
      if (loop_2===50){
        enemy_x = enemy_x +120;
      }
      
  
    }
  }
  


  

  const handleSubmit = async (e) => {

    e.preventDefault(); // because the default action after a form is submitted is to reload the page which we do not want
    const data = new FormData(form);

    data.get('prompt');
    form.reset();
    chatContainer.innerHTML=""
    const uniqueId = generateUniqueId();
    chatContainer.innerHTML += chatstripe(true, "", uniqueId);
    chatContainer.scrollTop = chatContainer.scrollHeight;
    chatContainer.style.display = 'flex';
    const messageDiv = document.getElementById(uniqueId);
    loader(messageDiv);
    console.log(enemy)

    const response = await fetch('http://localhost:5000', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        prompt:data.get('prompt'),
        enemy:enemy
      })
    })
    clearInterval(loadInterval);
    messageDiv.innerHTML = '';

    if(response.ok){
      const data = await response.json();
      const sentimentScore = data.sentiment;
      const tone = sentimentScore
      
      fight(tone)
      const parsedData = data.bot.trim();
      console.log(parsedData)
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
  const ThomasImage = new Image();
  ThomasImage.src ='assets/Teen Bot/Transparent PNG/00_idle/skeleton-00_idle_00.png'
  const playerImage = new Image();
  playerImage.src = 'assets/Transparent PNG/spritesheet/skeleton-00_idle_00.png'
  const enemyImage = new Image();
  enemyImage.src = 'assets/Minotaur_2/PNG/PNG Sequences/Idle Blinking/PineTools.com_files/spritesheet (26).png'
  
  
  const enemyImageAttack = new Image();
  enemyImageAttack.src = 'assets/Minotaur_2/PNG/PNG Sequences/Slashing/spritesheet (24).png'






  let gameSpeed =0.1;
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
  const layer5 = new Layer(backgroundLayer5,1);
  const layer6 = new Layer(backgroundLayer6,0);
  const layer7 = new Layer(backgroundLayer7, 0);
  
  //const  = document.querySelector('form');
  
  const gameObjects = [layer7,layer6,layer5,layer3,layer2,layer1];
  let player_x = 270;
  let player_y = 245;
  let enemy_x = 400;
  let enemy_y = 230;


  function form_appear(){
    form.style.display = 'flex';
    form.style.left = window.innerWidth/2 - (CANVAS_WIDTH/2) + player_x+20  + "px" ;
    form.style.top = window.innerHeight/2 - (CANVAS_HEIGHT/2) + player_y - 20+ "px";
  }

  function enemy_form_appear(){

    chatContainer.style.left = window.innerWidth/2 - (CANVAS_WIDTH/2) + enemy_x +85 + "px" ;
    chatContainer.style.top = window.innerHeight/2 - (CANVAS_HEIGHT/2) + enemy_y + "px";
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










  function positionElement(element){
    element.style.left = window.innerWidth/2 - (CANVAS_WIDTH/2) + enemy_x +75 + "px" ;
    element.style.top = window.innerHeight/2 - (CANVAS_HEIGHT/2) + enemy_y - 10+ "px";
  }
  function destroyElement(element){
    element.style.display = 'none'
  }
  function reviveElement(element){
    element.style.display = 'flex';
  }



  const Container = document.querySelector('#container');
  Container.innerHTML = "Press 'x' to interact";




  let frame_x = 0;
  let frame_y = 1;
  let cut_out_x = 200;
  let cut_out_y = 200;
  let loop = 0;
  let loop_2 =0;
  form.style.display = 'none';
  destroyElement(Container)
  let counter = 0
  let revist = 0
  let enemy = 0
  
  if(revist ==1){
    enemy_x = enemy_x -120
  }
  document.addEventListener('keydown', function(event) {
    const key = event.key.toLowerCase()
    if (key === '#') {
      enemy =1
      console.log(enemy)
    }
  });
  
  function animate(){
    ctx.clearRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT);
    gameObjects.forEach(object => {
      object.update();
      object.draw();
    });
    if(enemy_x - player_x <= 150){
      if(loop< 1){;
        reviveElement(Container)
        
      }
      positionElement(Container)
      document.addEventListener('keydown', function(event) {
        const key = event.key.toLowerCase()
        if (key === 'x') {
          loop +=3
          destroyElement(Container)
          enemy_form_appear()
          form_appear()
        }
      });
    } else{
      destroyElement(form)
      destroyElement(Container)
    }
    ctx.drawImage(playerImage, player_x,245, 195, 180  );
    ctx.drawImage(ThomasImage,  0,245, 195, 180 );
    

 
      // remember when you couldnt figure out it stopped at the wrong frame

  

    ctx.drawImage(enemyImage,frame_x*cut_out_x, frame_y*cut_out_y, cut_out_x, cut_out_y,  enemy_x,enemy_y,210,230);
    
    if(frame_y === 1){
      counter+=1
      if (counter %4 ===0){
          frame_x++
      }
      if (frame_x > 16){
        frame_x = 0
        counter = 20
      }
    }

    if (frame_y === 0){
      loop_2+=1
      if (loop_2 %2 ===0){
        frame_x ++
      }
      if(frame_x>11){
        frame_x = 11

        
      }
    }


  
    requestAnimationFrame(animate);

  }
  animate();
