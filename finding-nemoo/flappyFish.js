var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d"); 
var ups = document.getElementById("button-up");
var downs = document.getElementById("button-down"); 
var lefts = document.getElementById("button-left");  
var rights = document.getElementById("button-right");    
var menu = document.getElementById("menu");      
var starts = document.getElementById("button-start");                     
var hard = document.getElementById("hard-mode");   
                        
//                        
// const webcamElement = document.getElementById('webcam'); 
// const canvasElement = document.getElementById('canvas'); 
// const snapSoundElement = document.getElementById('snapSound');
// const webcam = new Webcam(webcamElement, 'user', canvasElement, snapSoundElement);
    
// webcam.start()   
//   .then(result =>{ 
//     console.log("webcam started");
//   })  
//   .catch(err => {
//     console.log(err);     
// });     
 // load images      
  
var bird = new Image();  
var bg = new Image();  
var fg = new Image();    
var pipeNorth = new Image();
var pipeSouth = new Image();  

bird.src = "images/bird.png";
bg.src = "images/bg.png";
fg.src = "images/fg.png";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";

// variables

var gap = 155;
var constant;

var bX = 10;
var bY = 150;

var gravity = 0.1;
     
var score = 0; 
    
// audio files     
         
var fly = new Audio();    
var scor = new Audio();  

fly.src = "sounds/fly.mp3";
scor.src = "sounds/score.mp3";    

document.onkeydown = function(e) {
    switch (e.keyCode) {
//left
        case 37:
            bX -= 25;
            fly.play();
            break;
        case 65:
            bX -= 25;
            fly.play();
            break;

//up
        case 38:
            bY -= 25;
            fly.play();
            break;
        case 87:
            bY -= 25;
            fly.play();
            break;
//right
        case 39:
            bX += 25;   
            fly.play();
            break;
        case 68:
            bX += 25;
            fly.play();
            break;
//down
        case 83:
            bY += 25;
            fly.play();
            break;
        case 40:
            bY += 25;
            fly.play();
            break;
    }
};
ups.addEventListener("click", function(){  bY -= 25;
    fly.play(); });
downs.addEventListener("click", function(){  bY += 25;
    fly.play(); });
lefts.addEventListener("click", function(){  bX -= 25;
    fly.play(); });
rights.addEventListener("click", function(){  bX += 25;
    fly.play(); });

starts.addEventListener("click", function(){ let hardstart = true; draw(hardstart)  });
hard.addEventListener("click", function(){ let hardstart = false ; draw(hardstart)  });

// pipe coordinates
 
var pipe = [];   

pipe[0] = {    
    x : cvs.width,
    y : 0
};
   
// draw images
function initiate_the_game(){
     if (bg.complete) {
        ctx.drawImage(bg, 0, 0);
    } else {    
        bg.onload = function () {   
            ctx.drawImage(bg, 0, 0);      
        };
    }   
}
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  // Close the dropdown menu if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('#dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];   
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        } 
      }
    }
  }

function draw(hardstart){ 
     
    ctx.drawImage(bg,0,0);
    for(let i = 0; i < pipe.length; i++){ 
        constant = pipeNorth.height+gap;
        ctx.drawImage(pipeNorth,pipe[i].x,pipe[i].y);
        ctx.drawImage(pipeSouth,pipe[i].x,pipe[i].y+constant);
            
        if ((hardstart)){  
            pipe[i].x = (pipe[i].x - 3 - Math.floor(score/2))
        }
        if (!hardstart) {   
            pipe[i].x -=6;              
        }          
            
        if(( pipe[i].x > 150&& pipe[i].x <159) && !(pipe[i+1])){   
            pipe.push({    
                x : cvs.width,
                y : Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height
            });       
        }
         if((pipe[i].x < 9 && pipe[i].x >3)){       
            score++;        
            scor.play();  
        }
     
        // detect collision
        var is_dead = ( bX + bird.width >= pipe[i].x && 
            bX <= pipe[i].x + pipeNorth.width && 
            (bY <= pipe[i].y + pipeNorth.height || 
                bY+bird.height >= pipe[i].y+constant) )
        var game_over = false 
        if (is_dead)
                 {
         // show score
        //   if (score<5) alert(`Your score is ${score}. Practise makes perfect. Better luck next time!`)
        //   if (score>= 5) alert(`Your score is ${score}.Good job! Most people get less than 9 points!`)
   
       
           bX = 10;
           bY = 150;
           pipe = [];
  
            pipe[0] = {
                x : cvs.width,
                y : 0
            };
            score = 0;
            game_over = true
        }
        
    }
    

    ctx.drawImage(fg,0,cvs.height - fg.height+60,0,0);
    
    ctx.drawImage(bird,bX,bY);
    
    bY += gravity;
    
    ctx.fillStyle = "#000";
    ctx.font = "40px Verdana";
    ctx.fillText("Score : "+score,10,cvs.height-10);
    
    game_over ?  initiate_the_game() : requestAnimationFrame(()=> draw(hardstart));
    
}


 function playgame() {
    initiate_the_game()
}

playgame()






















