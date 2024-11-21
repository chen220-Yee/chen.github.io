// 定义弹球计数变量

const para = document.querySelector('p');
let count = 0;

// 设置画布

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// 生成随机数的函数

function random(min,max) {
  const num = Math.floor(Math.random()*(max-min)) + min;
  return num;
}

// 生成随机颜色值的函数

function randomColor() {
  const color = 'rgb(' +
                random(0, 255) + ',' +
                random(0, 255) + ',' +
                random(0, 255) + ')';
  return color;
}

// 定义 Shape 构造器

function Shape(x, y, velX, velY, exists) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.exists = exists;
}

// 定义 Ball 构造器，继承自 Shape

function Ball(x, y, velX, velY, exists, color, size) {
  Shape.call(this, x, y, velX, velY, exists);

  this.color = color;
  this.size = size;
}

Ball.prototype = Object.create(Shape.prototype);
Ball.prototype.constructor = Ball;

// 定义彩球绘制函数

Ball.prototype.draw = function() {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
};

// 定义彩球更新函数

Ball.prototype.update = function() {
  if((this.x + this.size) >= width) {
    this.velX = -(this.velX);
  }

  if((this.x - this.size) <= 0) {
    this.velX = -(this.velX);
  }

  if((this.y + this.size) >= height) {
    this.velY = -(this.velY);
  }

  if((this.y - this.size) <= 0) {
    this.velY = -(this.velY);
  }

  this.x += this.velX;
  this.y += this.velY;
};

// 定义碰撞检测函数

Ball.prototype.collisionDetect = function() {
  for(var j = 0; j < balls.length; j++) {
    if(this !== balls[j]) {
      const dx = this.x - balls[j].x;
      const dy = this.y - balls[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size && balls[j].exists) {
        balls[j].color = this.color = randomColor();
      }
    }
  }
};

//定义烟花粒子构造器
function Particle(x,y,color){
  this.x=x;
  this.y=y;
  this.velX=(Math.random()-0.5)*10;
  this.velY=(Math.random()-0.5)*10;
  this.color=color;
  this.size=Math.random()*5+2;
  this.exists=true;
}

//定义烟花粒子绘制函数
Particle.prototype.draw=function(){
  ctx.beginPath();
  ctx.fillStyle=this.color;
  ctx.arc(this.x,this.y,this.size,0,2*Math.PI);
  ctx.fill();
};

//定义烟花粒子更新函数
Particle.prototype.update=function(){
  this.x+=this.velX;
  this.y+=this.velY;
  this.size*=0.95;
  if(this.size<0.5){
    this.exists=false;
  }
};


// 定义 EvilCircle 构造器, 继承自 Shape

function EvilCircle(x, y, exists) {
  Shape.call(this, x, y, 20, 20, exists);

  this.color = 'white';
  this.size = 15;
  this.sizeChangeRate=0.2;
  this.maxSize=25;
  this.minSize=12;
}

EvilCircle.prototype = Object.create(Shape.prototype);
EvilCircle.prototype.constructor = EvilCircle;


// 定义 EvilCircle 绘制方法

EvilCircle.prototype.draw = function() {
  ctx.beginPath();
  ctx.strokeStyle = this.color;
  ctx.lineWidth = 3;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.stroke();
};


// 定义 EvilCircle 的边缘检测（checkBounds）方法

EvilCircle.prototype.checkBounds = function() {
  if((this.x + this.size) >= width) {
    this.x -= this.size;
  }

  if((this.x - this.size) <= 0) {
    this.x += this.size;
  }

  if((this.y + this.size) >= height) {
    this.y -= this.size;
  }

  if((this.y - this.size) <= 0) {
    this.y += this.size;
  }
};

//定义 EvilCircle 的大小改变方法
EvilCircle.prototype.updateSize = function() {
  this.size += this.sizeChangeRate;
  if (this.size >= this.maxSize || this.size <= this.minSize) {
      this.sizeChangeRate = -this.sizeChangeRate; // 反转大小变化方向
  }
};


// 定义 EvilCircle 控制设置（setControls）方法

EvilCircle.prototype.setControls = function() {
  window.onkeydown = e => {
    switch(e.key) {
      case 'a':
      case 'A':
      case 'ArrowLeft':
        this.x -= this.velX;
        break;
      case 'd':
      case 'D':
      case 'ArrowRight':
        this.x += this.velX;
        break;
      case 'w':
      case 'W':
      case 'ArrowUp':
        this.y -= this.velY;
        break;
      case 's':
      case 'S':
      case 'ArrowDown':
        this.y += this.velY;
        break;
    }
  };
};

// 定义 EvilCircle 冲突检测函数

EvilCircle.prototype.collisionDetect = function() {
  for(let j = 0; j < balls.length; j++) {
    if( balls[j].exists ) {
      const dx = this.x - balls[j].x;
      const dy = this.y - balls[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        balls[j].exists = false;
        count--;
        para.textContent = '剩余彩球数：' + count;

        //生成碰撞之后的烟花粒子的效果
        for(let k=0;k<30;k++){
          particles.push(new Particle(balls[j].x,balls[j].y,balls[j].color));
        }
      }
    }
  }
};

// 定义一个数组，生成并保存所有的球，

const balls = [];

while(balls.length < 25) {
  const size = random(12,25);
  let ball = new Ball(
    // 为避免绘制错误，球至少离画布边缘球本身一倍宽度的距离
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-8, 8),
    random(-8, 8),
    true,
    randomColor(),
    size
  );
  balls.push(ball);
  count++;
  para.textContent = '剩余彩球数：' + count;
}

const particles=[];

// 定义一个循环来不停地播放

let evil = new EvilCircle(random(0, width), random(0, height), true);
evil.setControls();

function loop() {
  ctx.fillStyle = 'rgba(0,0,0,0.25)';
  ctx.fillRect(0, 0, width, height);

  for(let i = 0; i < balls.length; i++) {
    if(balls[i].exists) {
      balls[i].draw();
      balls[i].update();
      balls[i].collisionDetect();
    }
  }

  for(let i=particles.length-1;i>=0;i--){
    if(particles[i].exists){
      particles[i].draw();
      particles[i].update();
    }else{
      particles.splice(i,1);
    }
  }

  evil.updateSize();
  evil.draw();
  evil.checkBounds();
  evil.collisionDetect();

  requestAnimationFrame(loop);
}

loop();
