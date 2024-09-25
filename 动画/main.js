const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


// 烟花粒子类
class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.radius = Math.random() * 5 + 1; // 随机半径
        this.color = color;
        this.speed = Math.random() * 6 + 2; // 随机速度
        this.angle = Math.random() * (Math.PI * 2); // 随机角度
        this.gravity = 0.05; // 重力加速度
        this.life = 255; // 生命值
        }

    update() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed + this.gravity;
        this.life -= 5; // 每次更新减少生命值
        }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color[0]}, ${this.color[1]}, ${this.color[2]}, ${this.life / 255})`;
        ctx.fill();
        ctx.closePath();
        }
    }

// 烟花类
class Firework {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.particles = [];
        this.exploded = false;

        this.colors = [
            [255, 0, 0], // 红色
            [0, 255, 0], // 绿色
            [0, 0, 255], // 蓝色
            [255, 255, 0], // 黄色
            [255, 0, 255], // 品红
            [0, 255, 255]  // 青色
        ];

        this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
    }

    explode() {
        for (let i = 0; i < 100; i++) {
            this.particles.push(new Particle(this.x, this.y, this.color));
        }
        this.exploded = true;
    }

    update() {
        if (!this.exploded) {
            this.y -= 3; // 向上移动
            if (this.y < canvas.height / 2) {
                this.explode();
            }
        }

        for (let i = 0; i < this.particles.length; i++) {
            this.particles[i].update();
            if (this.particles[i].life <= 0) {
                this.particles.splice(i, 1);
                i--;
            }
        }
    }

    draw() {
        for (let particle of this.particles) {
            particle.draw();
        }
    }
}

const fireworks = [];

function createFirework() {
    const x = Math.random() * canvas.width;
    const firework = new Firework(x, canvas.height);
    fireworks.push(firework);
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let firework of fireworks) {
        firework.update();
        firework.draw();
    }
    requestAnimationFrame(animate);
}

// 每一秒生成一个烟花
setInterval(createFirework, 1000);
animate();