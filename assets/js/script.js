/**********carrusel********* */
let nextDom = document.getElementById("next");
let prevDom = document.getElementById("prev");

let carouselDom = document.querySelector(".carousel");
let SliderDom = carouselDom.querySelector(".carousel .list");
let thumbnailBorderDom = document.querySelector(".carousel .thumbnail");
let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll(".item");

thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);

let timeRunning = 1000;
let timeAutoNext = 7000;

let runNextAuto;
let isMoving = false;

let SliderItemsDom = SliderDom.querySelectorAll(".carousel .list .item");
let thumbnails = document.querySelectorAll(".carousel .thumbnail .item");

let currentIndex = 0;

let startX = 0;
let isDragging = false;

function showSlider(type) {
  if (isMoving) return;
  isMoving = true;

  SliderItemsDom = SliderDom.querySelectorAll(".carousel .list .item"); // Refrescamos
  thumbnails = document.querySelectorAll(".carousel .thumbnail .item"); // Refrescamos

  if (type === "next") {
    SliderDom.appendChild(SliderItemsDom[0]);
    thumbnailBorderDom.appendChild(thumbnails[0]);
    carouselDom.classList.add("next");

    currentIndex++;
    if (currentIndex >= SliderItemsDom.length) currentIndex = 0;
  } else {
    SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
    thumbnailBorderDom.prepend(thumbnails[thumbnails.length - 1]);
    carouselDom.classList.add("prev");

    currentIndex--;
    if (currentIndex < 0) currentIndex = SliderItemsDom.length - 1;
  }

  setTimeout(() => {
    carouselDom.classList.remove("next");
    carouselDom.classList.remove("prev");
    isMoving = false;
  }, timeRunning);

  resetAutoNext();
}

function resetAutoNext() {
  clearTimeout(runNextAuto);
  runNextAuto = setTimeout(() => {
    showSlider("next");
  }, timeAutoNext);
}

nextDom.onclick = function () {
  showSlider("next");
};

prevDom.onclick = function () {
  showSlider("prev");
};

// --- Arrastrar para mover ---
// Para dispositivos de escritorio y móviles
function onMouseDown(event) {
  isDragging = true;
  startX = event.clientX || event.touches[0].clientX;
  carouselDom.style.cursor = "grabbing";
  event.preventDefault(); // Evitar el comportamiento predeterminado
}

function onMouseMove(event) {
  if (!isDragging) return;

  const moveX = (event.clientX || event.touches[0].clientX) - startX;
  if (Math.abs(moveX) > 100) {
    // Si se movió lo suficiente, cambiamos la imagen
    if (moveX > 0) {
      showSlider("prev");
    } else {
      showSlider("next");
    }
    isDragging = false; // Detener el arrastre
  }
}

function onMouseUp(event) {
  isDragging = false;
  carouselDom.style.cursor = "grab";
}

carouselDom.addEventListener("mousedown", onMouseDown);
carouselDom.addEventListener("mousemove", onMouseMove);
carouselDom.addEventListener("mouseup", onMouseUp);
carouselDom.addEventListener("mouseleave", () => {
  isDragging = false;
}); // Si el mouse sale del carrusel

// Para dispositivos táctiles
carouselDom.addEventListener("touchstart", onMouseDown);
carouselDom.addEventListener("touchmove", onMouseMove);
carouselDom.addEventListener("touchend", onMouseUp);

// Iniciar el slider auto
resetAutoNext();
