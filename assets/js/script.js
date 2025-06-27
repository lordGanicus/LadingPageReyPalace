/********** Carrusel **********/
let nextDom = document.getElementById("next");
let prevDom = document.getElementById("prev");

let carouselDom = document.querySelector(".carousel");
let SliderDom = carouselDom.querySelector(".carousel .list");
let thumbnailBorderDom = document.querySelector(".carousel .thumbnail");
let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll(".item");

// Mover la primera miniatura al final al cargar
thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);

let timeRunning = 1000;
let timeAutoNext = 7000;
let runNextAuto;
let isMoving = false;

let SliderItemsDom = SliderDom.querySelectorAll(".carousel .list .item");
let thumbnails = document.querySelectorAll(".carousel .thumbnail .item");

let currentIndex = 0;

let startX = 0;
let startY = 0;
let isDragging = false;

// Función para mostrar siguiente o anterior slide
function showSlider(type) {
  if (isMoving) return;
  isMoving = true;

  // Refrescar nodos actuales
  SliderItemsDom = SliderDom.querySelectorAll(".carousel .list .item");
  thumbnails = document.querySelectorAll(".carousel .thumbnail .item");

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

// Reiniciar el tiempo del slider automático
function resetAutoNext() {
  clearTimeout(runNextAuto);
  runNextAuto = setTimeout(() => {
    showSlider("next");
  }, timeAutoNext);
}

// Botones de siguiente y anterior
nextDom.onclick = function () {
  showSlider("next");
};

prevDom.onclick = function () {
  showSlider("prev");
};

// --- Arrastrar y deslizar para mover ---
// Función al iniciar toque/click
function onMouseDown(event) {
  isDragging = true;
  startX = event.clientX || event.touches[0].clientX;
  startY = event.clientY || event.touches[0].clientY;
  carouselDom.style.cursor = "grabbing";

  // Solo prevenir en desktop
  if (event.type === "mousedown") {
    event.preventDefault();
  }
}

// Función al mover
function onMouseMove(event) {
  if (!isDragging) return;

  const currentX = event.clientX || event.touches[0].clientX;
  const currentY = event.clientY || event.touches[0].clientY;

  const moveX = currentX - startX;
  const moveY = currentY - startY;

  // Solo cambiar slide si se mueve más en X que en Y
  if (Math.abs(moveX) > Math.abs(moveY)) {
    if (Math.abs(moveX) > 80) {
      if (moveX > 0) {
        showSlider("prev");
      } else {
        showSlider("next");
      }
      isDragging = false;
    }

    // Bloquear scroll vertical solo si mueve en horizontal
    if (event.cancelable) event.preventDefault();
  }
}

// Función al soltar click o dedo
function onMouseUp() {
  isDragging = false;
  carouselDom.style.cursor = "grab";
}

// Eventos para escritorio
carouselDom.addEventListener("mousedown", onMouseDown);
carouselDom.addEventListener("mousemove", onMouseMove);
carouselDom.addEventListener("mouseup", onMouseUp);
carouselDom.addEventListener("mouseleave", () => {
  isDragging = false;
});

// Eventos para móviles
carouselDom.addEventListener("touchstart", onMouseDown);
carouselDom.addEventListener("touchmove", onMouseMove);
carouselDom.addEventListener("touchend", onMouseUp);

// Iniciar slider automático
resetAutoNext();
