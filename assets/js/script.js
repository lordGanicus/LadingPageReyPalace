"use strict";

const overlay = document.querySelector("[data-overlay]");
const navOpenBtn = document.querySelector("[data-nav-open-btn]");
const navbar = document.querySelector("[data-navbar]");
const navCloseBtn = document.querySelector("[data-nav-close-btn]");
const navLinks = document.querySelectorAll("[data-nav-link]");

const navElemArr = [navOpenBtn, navCloseBtn, overlay];

const navToggleEvent = function (elem) {
  for (let i = 0; i < elem.length; i++) {
    elem[i].addEventListener("click", function () {
      navbar.classList.toggle("active");
      overlay.classList.toggle("active");
    });
  }
};

navToggleEvent(navElemArr);
navToggleEvent(navLinks);

const header = document.querySelector("[data-header]");
const goTopBtn = document.querySelector("[data-go-top]");
const goWhatsBtn = document.querySelector("[data-go-whatsapp]");

window.addEventListener("scroll", function () {
  if (window.scrollY >= 200) {
    header.classList.add("active");
    goTopBtn.classList.add("active");
    goWhatsBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    goTopBtn.classList.remove("active");
    goWhatsBtn.classList.remove("active");
  }
});

document.querySelectorAll(".popular-card").forEach((card) => {
  let currentIndex = 0;
  const images = card.querySelectorAll(".card-img img");
  const maxIndex = images.length - 1;
  let autoSlideRef;
  const prevButton = card.querySelector(".prev");
  const nextButton = card.querySelector(".next");

  const showImage = (index) => {
    images.forEach((img) => {
      img.classList.remove("active");
      img.addEventListener("transitionend", () => {
        prevButton.style.visibility = "visible";
        nextButton.style.visibility = "visible";
      });
    });
    images[index].classList.add("active");
  };

  const nextImage = () => {
    prevButton.style.visibility = "hidden";
    nextButton.style.visibility = "hidden";
    currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
    showImage(currentIndex);
  };

  const prevImage = () => {
    prevButton.style.visibility = "hidden";
    nextButton.style.visibility = "hidden";
    currentIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1;
    showImage(currentIndex);
  };

  card.querySelector(".prev").addEventListener("click", () => {
    prevImage();
    resetAutoSlide();
  });

  card.querySelector(".next").addEventListener("click", () => {
    nextImage();
    resetAutoSlide();
  });

  const startAutoSlide = () => {
    autoSlideRef = setInterval(nextImage, 3000);
  };

  const stopAutoSlide = () => {
    clearInterval(autoSlideRef);
  };

  const resetAutoSlide = () => {
    stopAutoSlide();
    startAutoSlide();
  };

  startAutoSlide();

  card.addEventListener("mouseenter", stopAutoSlide);
  card.addEventListener("mouseleave", startAutoSlide);
});

var heroSwiper = new Swiper(".hero-swiper", {
  loop: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});
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
