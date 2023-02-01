const video = document.querySelector("#video");
const destinos = document.querySelectorAll(".puzzle div");
const imgs = document.querySelectorAll(".puzzleImages img");
const reiniciar = document.querySelector("#reiniciar")

/* EVENTOS VIDEO */
document.addEventListener("click", (e) => {
    const et = e.target;
    if (et.matches("#play")) {
        video.play();
        let videoDuration = document.querySelector("#videoControls p");
        const duration = video.duration / 60;
        const minutes = Math.trunc(duration);
        const minutesOff = duration - minutes;
        const seconds = Math.trunc(minutesOff * 60);
        videoDuration.innerText = `Duración total del video: ${minutes}:${seconds} `;
    }
    if (et.matches("#stop")) {
        video.pause();
    }
});

/* FUNCIONES DRAG AND DROP */
const comienzaDrag = (e) => {
    const img = e.target.src;

    if (img[0] == "h") {
        let newURL = img.slice(0, 21)
        let srcImg = img.replace(newURL, "..");
        e.dataTransfer.setData("text", srcImg);
        console.log(srcImg)
    } else {
        e.dataTransfer.setData("text", img);
    }
    
};

const finDrag = (e) => {
    const ocultar = e.target;
    ocultar.style.display = "none";
};

const preventDefault = (e) => {
    e.preventDefault();
};

const dropImg = (e) => {
    const destino = e.target
    let nuevaImagen = e.dataTransfer.getData("text");
    destino.innerHTML = `<img src= "${nuevaImagen}" style = "width:100% ; margin: 0px" >`;
    destino.style.backgroundImage = "none"
    destino.style.margin = "0px"
};

for (let i = 0; i < imgs.length; i++) {
    imgs[i].addEventListener("dragstart", comienzaDrag);
    imgs[i].addEventListener("dragend", finDrag);
}

for (let i = 0; i < destinos.length; i++) {
    const divTarget = destinos[i];
    divTarget.addEventListener("dragover", preventDefault);
    divTarget.addEventListener("drop", dropImg);
}


reiniciar.addEventListener("click", () => {
    window.location.reload()
})