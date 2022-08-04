//---------- object rotation (canvas)

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
