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

function moveToDynamic(from, to, duration, speed, dynamicsTime, uniformlyAcceleratedPercentage ) {
    // ( [x, y], [x, y], sec, number of frames per second )
    let arr = [];

    let arrX = uniformlyAcceleratedRectilinearMotion(from[0], to[0], duration, speed, dynamicsTime, uniformlyAcceleratedPercentage);
    let arrY = uniformlyAcceleratedRectilinearMotion(from[1], to[1], duration, speed, dynamicsTime, uniformlyAcceleratedPercentage);
  
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

function uniformlyAcceleratedRectilinearMotion(
  from,
  to,
  duration,
  speed,
  dynamicsTime = duration / 2,
  uniformlyAcceleratedPercentage // [1-100](%)
) {  // movement along one axis with dynamics (acceleration, braking)

  let arr = [];

  let NumberOfFrames = duration * speed;
  let S = to - from;

  if( dynamicsTime === duration / 2 ){  // only acceleration and deceleration

    let a = 2 * S/2 / (duration/2*duration/2); // acceleration
    let Vlast = Math.sqrt(2*a*S/2);

    for( let i = 1; i <= NumberOfFrames / 2; i++ ){ // overclocking
        let x = from + (a * (i*duration/NumberOfFrames * i*duration/NumberOfFrames) / 2);
        arr.push(x);
    }

    for( let i = 1; i <= NumberOfFrames / 2; i++ ){ // braking
        let x = from + S/2 + (Vlast * i*duration/NumberOfFrames) + (-a * (i*duration/NumberOfFrames * i*duration/NumberOfFrames) / 2);
        arr.push(x);
    }

  } else if( dynamicsTime < duration / 2 ) {  // acceleration, constant speed and deceleration

    let unevenS = uniformlyAcceleratedPercentage/100 * S / 2; // uniformly accelerated
    let uniformS = S - unevenS*2; // uniform motion


    let NumberOfFramesOfunevenS = dynamicsTime * speed;
    let NumberOfFramesOfuniformS = NumberOfFrames - NumberOfFramesOfunevenS*2;

    console.log(NumberOfFramesOfunevenS);
    
    let a = 2 * unevenS / (dynamicsTime*dynamicsTime); // acceleration
    let Vconst = Math.sqrt(2*a*unevenS);

    for( let i = 1; i <= NumberOfFramesOfunevenS; i++ ){ // overclocking
        let x = from + (a * (i*dynamicsTime/NumberOfFramesOfunevenS * i*dynamicsTime/NumberOfFramesOfunevenS)/2);
        arr.push(x);
    }

    let distancePerOneFrame = uniformS / NumberOfFramesOfuniformS;

    for( let i = 0; i <= NumberOfFramesOfuniformS; i++ ){
         let x = to - (unevenS + uniformS) + i * distancePerOneFrame;
         arr.push(x);
    }

    for( let i = 1; i <= NumberOfFramesOfunevenS; i++ ){ // braking
        let x = from + unevenS + uniformS + (Vconst * i*dynamicsTime/NumberOfFramesOfunevenS) + (-a * (i*dynamicsTime/NumberOfFramesOfunevenS * i*dynamicsTime/NumberOfFramesOfunevenS) / 2);
        arr.push(x);
    }

  } else {
    alert( 'dynamics Time (acceleration, deceleration time), cannot be more than half of the total movement time!' );
  }

  return arr;
}

console.log(uniformlyAcceleratedRectilinearMotion( 100, 400, 6, 60, 1, 20 ))

//-----------------------

// testing

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const sizeX = 20;
const sizeY = 20;

let array = moveToDynamic([100, 20], [400, 200], 4, 60, 2, 20);

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
