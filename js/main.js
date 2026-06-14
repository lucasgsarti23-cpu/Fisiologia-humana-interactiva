let fc = document.getElementById("fc");
let vs = document.getElementById("vs");
let rvp = document.getElementById("rvp");

function update(){

    let f = +fc.value;
    let v = +vs.value;
    let r = +rvp.value;

    let gc = (f * v) / 1000;
    let pam = (gc * r) + 60;
    let vo2 = gc * 50;

    document.getElementById("gc").innerText = gc.toFixed(1);
    document.getElementById("pam").innerText = pam.toFixed(0);
    document.getElementById("vo2").innerText = vo2.toFixed(0);

    document.getElementById("estado").innerText =
        f < 80 ? "Reposo" :
        f < 140 ? "Ejercicio" :
        "Alta demanda";

    document.getElementById("heart").style.transform =
        `scale(${1 + v / 400})`;
}

let canvas = document.getElementById("ecg");
let ctx = canvas.getContext("2d");

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

let t = 0;

function ecg(){

    ctx.fillStyle = "black";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;
    ctx.beginPath();

    let hr = +fc.value;
    let speed = hr / 60;

    for(let x = 0; x < canvas.width; x++){

        let phase = (x + t) * 0.02 * speed;

        let y =
            Math.sin(phase) * 5 +
            Math.exp(-Math.pow((phase % 6) - 3, 2)) * 40 *
            (Math.sin(phase * 0.5) * 2);

        y = canvas.height / 2 - y;

        if(x === 0){
            ctx.moveTo(x,y);
        }else{
            ctx.lineTo(x,y);
        }
    }

    ctx.stroke();

    t += 3;

    requestAnimationFrame(ecg);
}

function reset(){

    fc.value = 70;
    vs.value = 70;
    rvp.value = 20;

    update();
}

function go(id){

    document
        .getElementById(id)
        .scrollIntoView({
            behavior:"smooth"
        });
}

update();
ecg();