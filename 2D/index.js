//---------- rectilinear uniform motion (two axles)

function moveTo(from, to, duration, speed) {
  // ( [x, y], [x, y], sec, number of frames per second )
  let arr = [];

  let arrX = uniformRectilinearMotion(from[0], to[0], duration, speed);
  let arrY = uniformRectilinearMotion(from[1], to[1], duration, speed);

  for (let i = 0; i < arrX.length; i++) {
    let obj = {
      x: arrX[i],
      y: arrY[i],
      speed: speed,
    };
    arr.push(obj);
  }

  return arr;
}

function uniformRectilinearMotion(from, to, duration, speed) {
  // (one axles)
  let arr = [];

  let NumberOfFrames = duration * speed;
  let distancePerOneFrame = (to - from) / NumberOfFrames;

  for (let i = 0; i <= NumberOfFrames; i++) {
    let x = from + i * distancePerOneFrame;
    arr.push(x);
  }

  return arr;
}

//-----------------------

//---------- rectilinear dynamic motion ( two axles )

function moveToDynamic(from, to, duration, speed, dynamicsTime) {}

function uniformlyAcceleratedRectilinearMotion(
  from,
  to,
  duration,
  speed,
  dynamicsTime = duration / 2
) {  // movement along one axis with dynamics (acceleration, braking)

  let arr = [];

  let NumberOfFrames = duration * speed;
  let S = to - from;

  if( dynamicsTime === duration / 2 ){  // only acceleration and deceleration

    let a = 2 * S / (duration*duration); // acceleration
    console.log(a);

    for( let i = 1; i <= NumberOfFrames; i++ ){
      let x;
      if( i < NumberOfFrames ){
        x = from + (a * (i*duration/NumberOfFrames * i*duration/NumberOfFrames) / 2);
        arr.push(x);
      } else {
      }

    }

  } else if( dynamicsTime < duration / 2 ) {  // acceleration, constant speed and deceleration

  } else {
    alert( 'dynamics Time (acceleration, deceleration time), cannot be more than half of the total movement time!' );
  }

  return arr;
}

console.log(uniformlyAcceleratedRectilinearMotion( 100, 200, 2, 10 ))

//-----------------------

// testing

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const sizeX = 20;
const sizeY = 20;

let array = moveTo([50, 100], [400, 200], 2, 60);

console.log(array);

function show(arr) {
  let x = 0;
  let timerId = setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.rect(arr[x].x, arr[x].y, sizeX, sizeY);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();

    if (x >= arr.length - 1) {
      clearInterval(timerId);
    } else {
      x++;
    }
  }, 1000 / arr[0].speed);
}

show(array);
