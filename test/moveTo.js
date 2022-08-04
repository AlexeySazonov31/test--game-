//---------- rectilinear uniform motion (two axles)

function moveTo(fromX, toX, fromY, toY, duration, speed) {
  // ( px, px, px, px, sec, number of frames per second )
  let arr = [];

  let arrX = uniformRectilinearMotion(fromX, toX, duration, speed);
  let arrY = uniformRectilinearMotion(fromY, toY, duration, speed);

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

//---------- rectilinear uniform motion (three axles)
function moveTo3D(fromX, toX, fromY, toY, fromZ, toZ, duration, speed) {
  let arr = [];

  let arrX = uniformRectilinearMotion(fromX, toX, duration, speed);
  let arrY = uniformRectilinearMotion(fromY, toY, duration, speed);
  let arrZ = uniformRectilinearMotion(fromZ, toZ, duration, speed);

  for (let i = 0; i < arrX.length; i++) {
    let obj = {
      x: arrX[i],
      y: arrY[i],
      z: arrZ[i],
      speed: speed,
    };
    arr.push(obj);
  }

  return arr;
}

// --help functions--
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

console.log(moveTo(10, 200, 10, 300, 5, 20));
console.log(moveTo3D(10, 200, 10, 300, 100, 300, 5, 20));
