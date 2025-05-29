document.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await fetch("/assets/paginas/headerTop.html");
    const data = await res.text();
    document.getElementById("headerTop").innerHTML = data;
  } catch (error) {
    console.error("Error al cargar navbar:", error);
  }
  try {
    const res = await fetch("/assets/paginas/headerBottom.html");
    const data = await res.text();
    document.getElementById("headerBottom").innerHTML = data;
  } catch (error) {
    console.error("Error al cargar navbar:", error);
  }
  try {
    const res = await fetch("/assets/paginas/fotter.html");
    const data = await res.text();
    document.getElementById("fotterID").innerHTML = data;
  } catch (error) {
    console.error("Error al cargar fotter:", error);
  }

  ("use strict");

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
});
document.addEventListener("DOMContentLoaded", function () {
  const mainSlider = document.getElementById("mainSlider");
  const mainSlides = document.querySelectorAll(".main-slide");
  const miniSlides = document.querySelectorAll(".mini-slide");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  let currentIndex = 0;
  const slideCount = mainSlides.length;
  let slideInterval;

  // Función para actualizar los sliders
  function updateSliders(index) {
    // Actualizar main slider
    mainSlides.forEach((slide) => slide.classList.remove("active"));
    mainSlides[index].classList.add("active");

    // Actualizar mini slider
    miniSlides.forEach((slide) => slide.classList.remove("active"));
    miniSlides[index].classList.add("active");

    // Scroll mini slider para mostrar la imagen activa
    if (miniSlides[index]) {
      miniSlides[index].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }

  // Función para avanzar al siguiente slide
  function nextSlide() {
    currentIndex = (currentIndex + 1) % slideCount;
    updateSliders(currentIndex);
  }

  // Función para retroceder al slide anterior
  function prevSlide() {
    currentIndex = (currentIndex - 1 + slideCount) % slideCount;
    updateSliders(currentIndex);
  }

  // Event listeners para los botones
  nextBtn.addEventListener("click", nextSlide);
  prevBtn.addEventListener("click", prevSlide);

  // Event listeners para los mini slides
  miniSlides.forEach((slide, index) => {
    slide.addEventListener("click", () => {
      currentIndex = index;
      updateSliders(currentIndex);
    });
  });

  // Auto slide
  function startSlideShow() {
    slideInterval = setInterval(nextSlide, 5000);
  }

  function stopSlideShow() {
    clearInterval(slideInterval);
  }

  // Iniciar el slideshow
  startSlideShow();

  // Pausar al interactuar
  mainSlider.addEventListener("mouseenter", stopSlideShow);
  mainSlider.addEventListener("mouseleave", startSlideShow);

  // Pausar al interactuar con mini slider
  document
    .querySelector(".mini-slider-container")
    .addEventListener("mouseenter", stopSlideShow);
  document
    .querySelector(".mini-slider-container")
    .addEventListener("mouseleave", startSlideShow);

  // Actualizar al cambiar tamaño de ventana
  window.addEventListener("resize", function () {
    updateSliders(currentIndex);
  });
});
