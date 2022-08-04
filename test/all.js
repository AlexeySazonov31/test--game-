// ----  moveTo   ------------------------------------------------

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




// ----  moveToDynamic   ------------------------------------------------

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




// ----  rotateElem (canvas)(2D)   ------------------------------------------------

function rotateElem(speed, duration) {
  // (  [.. -5 .. +5 ..], sec  )  speed(direction(+/-)) and time control

  let x = 1;

  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");

  let angle = 0;

  let timerId = setInterval(() => {
    ctx.clearRect(0, 0, 1280, 720);
    angle = angle + speed;
    ctx.save();
    ctx.lineWidth = 50;
    ctx.translate(200, 200);
    ctx.rotate(angle * (Math.PI / 180));
    ctx.strokeRect(-25, -25, 50, 50);
    ctx.restore();

    if (x >= duration * 100) {
      clearInterval(timerId);
    } else {
      x++;
    }
  }, 10);
}
rotateElem(-2, 2); // control




// ----  IndexedMap   ------------------------------------------------

class IndexedMap {
  #arr = [];

  getCollection() {
    return this.#arr;
  }
  showCollection() {
    console.log(this.#arr);
  }

  /*
      [
        {
          index: '',
          key: '',
          value: '',
        },
        {
          ...
        },
       ]
      */
  set(key, value) {
    let found = false;
    for (let elem of this.#arr) {
      if (elem.key === key) {
        elem.value = value;
        found = true;
      }
    }
    if (!found) {
      let obj = {
        index: this.#arr.length,
        key: key,
        value: value,
      };
      this.#arr.push(obj);
    }
    return this;
  }

  has(key) {
    let found = false;
    for (let elem of this.#arr) {
      if (elem.key === key) {
        found = true;
      }
    }
    return found;
  }

  hasIndex(index) {
    let found = false;
    for (let elem of this.#arr) {
      if (elem.index == index) {
        found = true;
      }
    }
    return found;
  }
  get(key) {
    let found = null;
    for (let elem of this.#arr) {
      if (elem.key === key) {
        found = elem.value;
      }
    }
    if (found === null) {
      throw new Error(`element with key: ${key} - not found`);
    }
    return found;
  }

  getByIndex(index) {
    let found = null;
    for (let elem of this.#arr) {
      if (elem.index == index) {
        found = elem.value;
      }
    }
    if (found === null) {
      throw new Error(`element with index: ${index} - not found`);
    }
    return found;
  }

  remove(key) {
    let success = false;
    for (let elem of this.#arr) {
      if (elem.key === key) {
        this.#arr.splice(elem.index, 1);
        success = true;
      }
    }
    if (success) {
      let i = 0;
      for (let elem of this.#arr) {
        elem.index = i++;
      }
    } else {
      throw new Error(`element with key: ${key} - not found`);
    }
    console.log(this.#arr);

    return this;
  }

  size() {
    // starting from 1 !
    return this.#arr.length;
  }

  union(maps) {
    // for arrays of objects with key: [{ key: '', }] and
    let foundKey = false;
    for (let elem of maps) {
      console.log(elem);

      if (!elem.key) {
        foundKey = true;
      }
    }
    if (foundKey) {
      throw new Error("Merge failed, key not found");
    }
    for (let elem of maps) {
      let found = false;
      for (let thisElem of this.#arr) {
        //key matching check
        if (thisElem.key === elem.key) {
          found = true;
        }
      }
      if (!found) {
        this.set(elem.key, elem.value ? elem.value : "");
      } else {
        throw new Error("key match");
      }
    }
    return this;
  }

  forEach(func) {
    for (let elem of this.#arr) {
      func(elem.value, elem.key, elem.index);
    }
    return this;
  }

  uniq() {
    let arr = [];
    for (let elem of this.#arr) {
      arr.push(elem.value);
    }
    return [...new Set(arr)];
  }

  uniqKeys() {
    let arr = [];
    for (let elem of this.#arr) {
      arr.push(elem.key);
    }
    return arr;
  }

  reverseIndexes() {
    this.#arr.sort(() => -1);
    return this;
  }

  removeAt(index, count = 1) {
    if (index > this.#arr.length - 1) {
      throw new Error(
        `collection has no element with index: ${index}, collection length: ${this.size()}`
      );
    } else {
      this.#arr.splice(index, count);
    }

    return this;
  }
}
