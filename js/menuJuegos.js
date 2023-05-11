var volver = document.querySelector(".volver");
var buscaminas = document.querySelector(".buscaminas");
var snake = document.querySelector(".snake");
var wordle = document.querySelector(".wordle");
const track = document.getElementById("image-track");

buscaminas.addEventListener("click", ()=>{
  window.location.href ="../html/buscaminas.html"
})

snake.addEventListener("click", ()=>{
  window.location.href ="../html/snake.html"
})

wordle.addEventListener("click", ()=>{
  window.location.href ="../html/wordle.html"
})
volver.addEventListener("click", () => {
    window.location.href = "../index.html";
  });

  window.addEventListener("load", () => {
    const loader = document.querySelector(".loader");
  
    loader.classList.add("loader-hidden");
  
    loader.addEventListener("transitioned", () => {
      document.body.removeChild("loader");
    });
  });
  
  window.onmousedown = e =>{
    track.dataset.mouseDownAt = e.clientX;
  }

  window.onmouseup = () =>{
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = track.dataset.percentage;
  }

  window.onmousemove = e =>{
    if(track.dataset.mouseDownAt === "0") return;

    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
          maxDelta = window.innerWidth / 2;

          const percentage = (mouseDelta / maxDelta) * -100,
          nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
          nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
    
    console.log(nextPercentage)
    track.dataset.percentage = nextPercentage;

    //track.style.transform = `translate(${nextPercentage}%, -50%)`;
    track.animate({
      transform: `translate(${nextPercentage}%,-50%)`
    }, {duration:1200,fill:"forwards"});
    
    for(const image of track.getElementsByClassName("imagen")){
      // image.style.objectPosition = `${nextPercentage - 100}% 50%`;
      image.animate(
        {
          objectPosition: `${100+nextPercentage}% center`
        }, {duration : 1200, fill: "forwards"}
      );
    }
  }

