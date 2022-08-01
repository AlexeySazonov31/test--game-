const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

//---------      frame rate 10ms

const sizeX = 20;
const sizeY = 20;




//setInterval( draw, 10 );

//-----------------------

function moveTo( from, to, duration, speed ){ // ( [x, y], [x, y], sec, number of frames per second ) 
    let arr = [];

    let arrX = uniformRectilinearMotion(from[0], to[0], duration, speed);
    let arrY = uniformRectilinearMotion(from[1], to[1], duration, speed);

    for( let i = 0; i < arrX.length; i++ ){
        let obj = {
            x: arrX[i],
            y: arrY[i],
            speed: speed,
        }
        arr.push(obj);
    }

  return arr;
}



function uniformRectilinearMotion( from, to, duration, speed ){
    let arr = [];

    let NumberOfFrames = duration * speed;

    let distancePerOneFrame = (to - from) / NumberOfFrames;

    for( let i = 0; i <= NumberOfFrames; i++ ){
        let x = from + ( i * distancePerOneFrame );
        arr.push(x);
    }

    return arr;
}

//-----------------------

let array = moveTo( [50, 100], [400,200], 2, 60 );

console.log(array);

function show( arr ){
    let x = 0;
    let timerId = setInterval( () => {

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.beginPath();
        ctx.rect( arr[x].x, arr[x].y, sizeX, sizeY );
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();

        if( x >= arr.length - 1 ){
            clearInterval(timerId);
        } else {
            x++
        }
    }, 1000 / arr[0].speed );



}

show( array )






