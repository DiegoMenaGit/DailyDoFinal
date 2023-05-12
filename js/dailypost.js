console.log("funciono")

var imagenBoton = document.querySelector(".boton_abrir_imagen")
var draganddrop_container = document.querySelector(".draganddrop_container")
var draganddrop = document.querySelector(".draganddrop")
var boton_enviar = document.querySelector(".boton_enviar")
var postear_textarea = document.querySelector("#postear_textarea")

const db = firebase.firestore();

var modalAbierto = false

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        console.log('Header is back on screen!');
      }
      else{
        console.log('Header is not on screen!')
      }
    });
  });
  
  const divToObserve = document.querySelector('.header');
  observer.observe(divToObserve);

imagenBoton.addEventListener("click", (e)=>{
    console.log("Abrir modal")
    draganddrop_container.style.display = "flex";
    setTimeout(()=>{
        modalAbierto = true;
    }, 500)
})

document.addEventListener("click", (e) => {
    if(modalAbierto){
        console.log("Super Cerrar Modal")
        if (!draganddrop.contains(e.target)) {
            draganddrop_container.style.display = "none";
            modalAbierto = false
        }
    }
});



const dragAndDrop = document.getElementById("draganddrop");
const fileInput = document.getElementById("fileinput");

dragAndDrop.addEventListener("dragenter", (event) => {
  event.preventDefault();
  dragAndDrop.classList.add("highlight");
});

dragAndDrop.addEventListener("dragover", (event) => {
  event.preventDefault();
});

dragAndDrop.addEventListener("dragleave", () => {
  dragAndDrop.classList.remove("highlight");
});

dragAndDrop.addEventListener("drop", (event) => {
  event.preventDefault();
  dragAndDrop.classList.remove("highlight");
  const files = event.dataTransfer.files;
  console.log(files);
  if (files.length > 0 && files[0].type.startsWith("image/")) {
    fileInput.files = files;
    //fileInput.value = files[0].name;
  }
});

fileInput.addEventListener("change", () => {
  if (fileInput.files.length > 0 && fileInput.files[0].type.startsWith("image/")) {
    dragAndDrop.classList.remove("highlight");
    dragAndDrop.querySelector(".text").innerHTML = fileInput.files[0].name;
  } else {
    dragAndDrop.querySelector(".text").innerHTML = "Drag and drop images here <br> or <br> Click to select images";
  }
});

boton_enviar.addEventListener("click", (e)=>{
    console.log(`${postear_textarea.value}, ${fileInput.value}`)
});