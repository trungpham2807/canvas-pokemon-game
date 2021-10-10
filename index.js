//checklist:
// 1. Initialize canvas (w,h, get 2d)
// 2. Initialize structure code (initialize value -> drawing -> update (loop))
// 3. Create background (sound, image)
// 4. Create character (image, movement, axis(x,y)) 
// 5. Create bullet (image,)
// 6. Create enemy (image, random, auto movement maybe can use bullet)
// 6.1. Create enemies (forEach)
// 7. Create health for character, enemy
// 8. Create collision (check collision character - enemy)
// 9. Create collision (bullet - enemy)
//10. create obstacle
//1. canvas
const canvas = document.getElementById("myCanvas");

const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth - 25;
canvas.height = window.innerHeight - 25;
console.log(canvas)


//2. structure code
////
//3. initialize variable
let bg = {};
let hero = {x: canvas.width/2,
            y: canvas.height/2,
            speed: 2,
            w: 150,
            h: 150,  
            };
let monsters =[
                {x: 1200, y: 100, w: 150, h: 150, speed: 2, xVel: 2, yVel: 2},
                {x: 0, y: 200, w: 150, h: 150, speed: 2, xVel: 2, yVel: 2},
                {x: 1200, y: 300, w: 150, h: 150, speed: 2, xVel: 2, yVel: 2},
                {x: 400, y: 100, w: 150, h: 150, speed: 2, xVel: 2, yVel: 2},
                {x: 700, y: 100, w: 150, h: 150, speed: 2, xVel: 2, yVel: 2},
                {x: 1000, y: 100, w: 150, h: 150, speed: 2, xVel: 2, yVel: 2},
            ]; 
let obstacle = {};
// let bullet = {};
//heath + heathbar
let health = 1000;
const healthBarWidth = 500;
const healthBarHeight = 30;
let HealthBarX = 500;
let HealthBarY = 20;
//enemy
// const enenimes = [];
// function Enemies(){
//     setInterval(() => {
//         const x = 100
//         const y = 100
//         const radius = 30
//         const color = 'green'
//         const velocity = {
//             x: 1,
//             y: 1,
//         }
//         Enemies.push(new Enemy(x,y, radius, color, velocity))
//         console.log(enemies);
//     },1000)
//     }
class HealthBar {
    constructor(x, y, w, h, maxHealth, color) {
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
      this.maxHealth = maxHealth;
      this.maxWidth = w;
      this.health = maxHealth;
      this.color = color;
    }
  
    show() {
      ctx.lineWidth = 4;
      ctx.strokeStyle = "#333";
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.w, this.h);
      ctx.strokeRect(this.x, this.y, this.maxWidth, this.h);
    }

  
    updateHealth(val) {
      if (val >= 0) {
        this.health = val;
        this.w = (this.health / this.maxHealth) * this.maxWidth;
      }
    }
  }
  var healthBar = new HealthBar(HealthBarX, HealthBarY, healthBarWidth, healthBarHeight, health, "green");
  
//random Range
function randomRange(min, max){
    return Math.floor(Math.random() * (max + 1 - min)) + min;
}

class Bullet {
    constructor(x,y,w,h,c,xSpeed, ySpeed){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.c = c;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
    }
    draw(){
        // bullet.image = new Image();
        // bullet.image.src = 'images/fire.jpg';
        // bullet.image.onload = function(){
        // ctx.drawImage(bullet.image, this.x, this.y);
        // }
        ctx.fillStyle = "yellow";
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }
    move(){
        // if(keysPressed['ArrowRight']){
        //     this.y = this.y + this.ySpeed;
        //     this.x = this.x + this.ySpeed; 
        // }
        this.y = this.y + this.ySpeed;
        this.x = this.x + this.ySpeed; 
        // if(this.x <= monster.x + 150 && monster.x <=this.x + 150 && this.y<= monster.y + 150 && this.y <= bullet.y + 150){
        //     alert('a')
        // }
    }
  
};
var bullets = [];
function makeBulletLeft(){
    const BULLET_SIZE = 5;
    var bulletX = hero.x + hero.w/2 - BULLET_SIZE/2;
    var bulletY = hero.y + hero.h/2 - BULLET_SIZE;
    var bulletxSpeed = 6;
    var bulletySpeed = 1;
    var bullet = new Bullet(bulletX, bulletY, BULLET_SIZE, BULLET_SIZE, "green",bulletxSpeed, bulletySpeed);
    bullets.push(bullet);
}
function makeBulletRight(){
    const BULLET_SIZE = 5;
    var bulletX = hero.x + hero.w/2 + BULLET_SIZE/2;
    var bulletY = hero.y + hero.h/2 - BULLET_SIZE;
    var bulletxSpeed = 6;
    var bulletySpeed = 1;
    var bullet = new Bullet(bulletX, bulletY, BULLET_SIZE, BULLET_SIZE, "green",bulletxSpeed, bulletySpeed);
    bullets.push(bullet);
}
function makeBulletUp(){
    const BULLET_SIZE = 5;
    var bulletX = hero.x + hero.w/2 - BULLET_SIZE/2;
    var bulletY = hero.y + hero.h/2 - BULLET_SIZE;
    var bulletxSpeed = 1;
    var bulletySpeed = 6;
    var bullet = new Bullet(bulletX, bulletY, BULLET_SIZE, BULLET_SIZE, "green",bulletxSpeed, bulletySpeed);
    bullets.push(bullet);
}
function makeBulletDown(){
    const BULLET_SIZE = 5;
    var bulletX = hero.x + hero.w/2 - BULLET_SIZE/2;
    var bulletY = hero.y + hero.h/2 + BULLET_SIZE;
    var bulletxSpeed = 1;
    var bulletySpeed = 6;
    var bullet = new Bullet(bulletX, bulletY, BULLET_SIZE, BULLET_SIZE, "green",bulletxSpeed, bulletySpeed);
    bullets.push(bullet);
}



////
//load Images
function loadImages(){
    //load image background
    bg.image = new Image();
    bg.image.onload = function(){
       
    bg.ready = true;
    };
    bg.image.src = 'images/background.jpg';
    
   

    
    //load image hero
    hero.image = new Image();
    hero.image.onload = function(){
        hero.ready = true;
    };
    hero.image.src = 'images/hero.png';
    //load image monster
    monsters.forEach((monster, i) => {
        monster.image = new Image();
        monster.image.onload = function(){
            monster.ready = true;
        };
        monster.image.src = `images/monster_${i+1}.png`;
    });

}
//key pressed
//check for key captured
let keysPressed = {};
function setupKeyboardListeners() {
	// Check for keys pressed where key represents the keycode captured
	document.addEventListener(
		'keydown',
		function (e) {
			keysPressed[e.key] = true;
		},
		false
	);

	document.addEventListener(
		'keyup',
		function (e) {
			keysPressed[e.key] = false;
		},
		false
	);
}
//Draw()
function draw(){

    if (bg.ready){
        ctx.drawImage(bg.image, 0, 0, window.innerWidth, window.innerHeight)
    }
    if(hero.ready){
        ctx.drawImage(hero.image,hero.x, hero.y, hero.w, hero.h )
    }
    monsters.forEach((monster) => {
        if(monster.ready){
            ctx.drawImage(monster.image, monster.x, monster.y, monster.w, monster.h);
        }
    })
}
//Update()
function update(){
    if (keysPressed['ArrowUp']) {
		hero.y -= 5;

	}
	if (keysPressed['ArrowDown']) {
		hero.y += 5;
	}
	if (keysPressed['ArrowLeft']) {
		hero.x -= 5;
	}
	if (keysPressed['ArrowRight']) {
		hero.x += 5;
	}
    if(keysPressed['a'] && keysPressed['ArrowLeft']){
        makeBulletLeft();
    }
    if(keysPressed['a'] && keysPressed['ArrowRight']){
        makeBulletRight();
    }
    if(keysPressed['a'] && keysPressed['ArrowUp']){
        makeBulletUp();
    }
    if(keysPressed['a'] && keysPressed['ArrowDown']){
        makeBulletDown();
    }
    // monsters.forEach((monster) => {
    //     setInterval(() => {
    //         const x = Math.random()*canvas.width;
    //         const y = Math.random() *canvas.height;
    //         const angle = Math.atan2(canvas.height/2 -y, canvas.width/2 -x)
    //         const velocity = {
    //             x: Math.cos(angle),
    //             y: Math.sin(angle)
    //         }

    //     }, 1000)
    // })

    //check if monster hit hero
    monsters.forEach((monster) => {
		if (hero.x <= monster.x + 150 && monster.x <= hero.x + 150 && hero.y <= monster.y + 150 && monster.y <= hero.y + 150) {
			// Pick a new location for the monster.
			// Note: Change this to place the monster at a new, random location.
			// monster.x = monster.x + 50;
			// monster.y = monster.y + 70;
            health -= 10;
            healthBar.updateHealth(health);    
            
            // if(bullets.x <= monster.x + 100 && monster.x <=bullets.x + 100 && bullets.y<= monster.y + 100 && monster.y <= bullets.y + 100){
            //   alert('a');
            // }
		}
 
    
   
    // bullets.forEach(function(bullet,i){
        
    //     }
    // })
       

})
monsters[1].x += monsters[1].xVel;
if(monsters[1].x >= canvas.width || monsters[1].x <=0){
    monsters[1].xVel = -monsters[1].xVel;
}
monsters[5].x += monsters[5].xVel;
if(monsters[5].x >= canvas.width || monsters[5].x <=0){
    monsters[5].xVel = -monsters[5].xVel - 3;
}
monsters[0].x += monsters[0].xVel;
if(monsters[0].x >= canvas.width || monsters[0].x <=0){
    monsters[0].xVel = -monsters[0].xVel - 5;
}

monsters[2].y += monsters[2].yVel;
if(monsters[2].y >= 600|| monsters[2].y <=0){
    monsters[2].y = monsters[2].y - 500;
    monsters[2].yVel += 1;
}
monsters[4].y += monsters[4].yVel;
if(monsters[4].y >= 800|| monsters[4].y <=0){
    monsters[4].y = monsters[4].y - 700;
    monsters[4].yVel += 1;
}
monsters[3].x += monsters[3].xVel;
monsters[3].y -= monsters[3].yVel;
if(monsters[3].x >= canvas.width && monsters[3].y >= canvas.height|| monsters[3].x <=0 && monsters[3].y <=0){
    monsters[3].y = monsters[3].y - 500;
    monsters[3].x = monsters[3].x - 500;
}

};
//main()
function main(){
    draw();
    update();
    if(bullets.length > 0){
        bullets.forEach(function(bullet,i){
            bullet.draw();
            bullet.move();
        })
    }
    healthBar.show();
    requestAnimationFrame(main);
}

//call function


var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;


loadImages();
setupKeyboardListeners();
main();



