//---------- rectilinear dynamic motion ( two axles )

function moveToDynamic( // ( px, px, px, px, sec, number of frames per second, time acceleration, [1-100](%))
  fromX,
  toX,
  fromY,
  toY,
  duration,
  speed,
  dynamicsTime,
  uniformlyAcceleratedPercentage
) {
  let arr = [];

  let arrX = uniformlyAcceleratedRectilinearMotion(
    fromX,
    toX,
    duration,
    speed,
    dynamicsTime,
    uniformlyAcceleratedPercentage
  );
  let arrY = uniformlyAcceleratedRectilinearMotion(
    fromY,
    toY,
    duration,
    speed,
    dynamicsTime,
    uniformlyAcceleratedPercentage
  );

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

//---------- rectilinear dynamic motion ( three axles )

function moveToDynamic3D( // ( px, px, px, px, px, px, sec, number of frames per second, time acceleration, [1-100](%))
  fromX,
  toX,
  fromY,
  toY,
  fromZ,
  toZ,
  duration,
  speed,
  dynamicsTime,
  uniformlyAcceleratedPercentage
) {
  let arr = [];

  let arrX = uniformlyAcceleratedRectilinearMotion(
    fromX,
    toX,
    duration,
    speed,
    dynamicsTime,
    uniformlyAcceleratedPercentage
  );
  let arrY = uniformlyAcceleratedRectilinearMotion(
    fromY,
    toY,
    duration,
    speed,
    dynamicsTime,
    uniformlyAcceleratedPercentage
  );
  let arrZ = uniformlyAcceleratedRectilinearMotion(
    fromZ,
    toZ,
    duration,
    speed,
    dynamicsTime,
    uniformlyAcceleratedPercentage
  );

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
function uniformlyAcceleratedRectilinearMotion( // movement along one axis with dynamics (acceleration, braking)
  from,
  to,
  duration,
  speed,
  dynamicsTime = duration / 2,
  uniformlyAcceleratedPercentage // [1-100](%)
) {
  let arr = [];

  let NumberOfFrames = duration * speed;
  let S = to - from;

  if (dynamicsTime === duration / 2) {
    // only acceleration and deceleration

    let a = (2 * S) / 2 / (((duration / 2) * duration) / 2); // acceleration
    let Vlast = Math.sqrt((2 * a * S) / 2);

    for (let i = 1; i <= NumberOfFrames / 2; i++) {
      // overclocking
      let x =
        from +
        (a *
          ((((i * duration) / NumberOfFrames) * i * duration) /
            NumberOfFrames)) /
          2;
      arr.push(x);
    }

    for (let i = 1; i <= NumberOfFrames / 2; i++) {
      // braking
      let x =
        from +
        S / 2 +
        (Vlast * i * duration) / NumberOfFrames +
        (-a *
          ((((i * duration) / NumberOfFrames) * i * duration) /
            NumberOfFrames)) /
          2;
      arr.push(x);
    }
  } else if (dynamicsTime < duration / 2) {
    // acceleration, constant speed and deceleration

    let unevenS = ((uniformlyAcceleratedPercentage / 100) * S) / 2; // uniformly accelerated
    let uniformS = S - unevenS * 2; // uniform motion

    let NumberOfFramesOfunevenS = dynamicsTime * speed;
    let NumberOfFramesOfuniformS = NumberOfFrames - NumberOfFramesOfunevenS * 2;

    let a = (2 * unevenS) / (dynamicsTime * dynamicsTime); // acceleration
    let Vconst = Math.sqrt(2 * a * unevenS);

    for (let i = 1; i <= NumberOfFramesOfunevenS; i++) {
      // overclocking
      let x =
        from +
        (a *
          ((((i * dynamicsTime) / NumberOfFramesOfunevenS) * i * dynamicsTime) /
            NumberOfFramesOfunevenS)) /
          2;
      arr.push(x);
    }

    let distancePerOneFrame = uniformS / NumberOfFramesOfuniformS;

    for (let i = 0; i <= NumberOfFramesOfuniformS; i++) {
      let x = to - (unevenS + uniformS) + i * distancePerOneFrame;
      arr.push(x);
    }

    for (let i = 1; i <= NumberOfFramesOfunevenS; i++) {
      // braking
      let x =
        from +
        unevenS +
        uniformS +
        (Vconst * i * dynamicsTime) / NumberOfFramesOfunevenS +
        (-a *
          ((((i * dynamicsTime) / NumberOfFramesOfunevenS) * i * dynamicsTime) /
            NumberOfFramesOfunevenS)) /
          2;
      arr.push(x);
    }
  } else {
    alert(
      "dynamics Time (acceleration, deceleration time), cannot be more than half of the total movement time!"
    );
  }

  return arr;
}

console.log(moveToDynamic(10, 10, 10, 100, 1, 60, 0.2, 10));
console.log(moveToDynamic3D(10, 50, 10, 100, 10, 200, 1, 60, 0.2, 10));
//-----------------------
