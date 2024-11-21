
const ball1=document.querySelector('#ball1');
const ball2=document.querySelector('#ball2');
const ball3=document.querySelector('#ball3');

const img1=document.querySelector('.img1');
const img2=document.querySelector('.img2');
const img3=document.querySelector('.img3');

const moveRight = [
    { transform: 'translateX(0)' },
    { transform: 'translateX(150vh)' }
  ];
  
  const moveTiming = {
    duration: 2000,
    iterations: 1,
    fill: 'forwards'
  };

const endTumbling=[
    { transform: 'rotate(0) scale(1)' },
    { transform: 'rotate(360deg) scale(0)' }
]
const endTiming = {
    duration: 2000,
    iterations: 1,
    fill: 'forwards'
};

async function startMoving() {
    await ball1.animate(moveRight, moveTiming).finished;
    await img1.animate(endTumbling, endTiming);
  }

async function startMoving2() {
    await ball2.animate(moveRight, moveTiming).finished;
    await img2.animate(endTumbling, endTiming);
  }

async function startMoving3() {
    await ball3.animate(moveRight, moveTiming).finished;
    await img3.animate(endTumbling, endTiming);
  }

async function startSequence() {
    await startMoving();
    await startMoving2();
    await startMoving3();
}

startSequence();