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

/************************slider para las habitaciones */
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
    mainSlides.forEach((slide) => slide.classList.remove("active"));
    mainSlides[index].classList.add("active");

    miniSlides.forEach((slide) => slide.classList.remove("active"));
    miniSlides[index].classList.add("active");

    // Solo hacer scroll si el slider está en pantalla
    const sliderRect = mainSlider.getBoundingClientRect();
    const inView =
      sliderRect.top >= 0 &&
      sliderRect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight);

    if (miniSlides[index] && inView) {
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
  /********** */
});
/**************************slider para el menu libro */
document.addEventListener("DOMContentLoaded", function () {
  const contenedorLibro = document.getElementById("libroInner");
  const paginasLibro = document.querySelectorAll(".pagina");
  const btnAnterior = document.getElementById("prevBtn1");
  const btnSiguiente = document.getElementById("nextBtn1");

  let indiceActual = 2; // Empezar con la imagen central
  const totalPaginas = paginasLibro.length;

  // Función para actualizar el efecto tipo libro
  function actualizarLibro() {
    paginasLibro.forEach((paginaActual, indice) => {
      paginaActual.classList.remove("active");

      const diferencia = (indice - indiceActual + totalPaginas) % totalPaginas;

      if (diferencia === 0) {
        paginaActual.style.transform = "rotateY(0deg)";
        paginaActual.style.zIndex = "6";
        paginaActual.classList.add("active");
      } else if (diferencia === 1 || diferencia === totalPaginas - 1) {
        const rotacion = diferencia === 1 ? 15 : -15;
        const desplazamiento = diferencia === 1 ? "10px" : "-10px";
        paginaActual.style.transform = `rotateY(${rotacion}deg) translateX(${desplazamiento})`;
        paginaActual.style.zIndex = "5";
      } else if (diferencia === 2 || diferencia === totalPaginas - 2) {
        const rotacion = diferencia === 2 ? 30 : -30;
        const desplazamiento = diferencia === 2 ? "20px" : "-20px";
        paginaActual.style.transform = `rotateY(${rotacion}deg) translateX(${desplazamiento})`;
        paginaActual.style.zIndex = "4";
      } else {
        paginaActual.style.transform = "rotateY(0deg) translateX(0)";
        paginaActual.style.zIndex = "3";
      }
    });
  }

  // Avanzar
  function siguientePagina() {
    indiceActual = (indiceActual + 1) % totalPaginas;
    actualizarLibro();
  }

  // Retroceder
  function anteriorPagina() {
    indiceActual = (indiceActual - 1 + totalPaginas) % totalPaginas;
    actualizarLibro();
  }

  // Eventos
  btnSiguiente.addEventListener("click", siguientePagina);
  btnAnterior.addEventListener("click", anteriorPagina);

  // Auto deslizamiento
  let intervaloDeslizamiento = setInterval(siguientePagina, 5000);

  // Pausa al pasar el mouse
  contenedorLibro.addEventListener("mouseenter", () => {
    clearInterval(intervaloDeslizamiento);
  });

  contenedorLibro.addEventListener("mouseleave", () => {
    intervaloDeslizamiento = setInterval(siguientePagina, 5000);
  });

  // Iniciar
  actualizarLibro();
});
/**************slider para salones */
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

    // Verificar si el mainSlider está visible en la pantalla
    const sliderRect = mainSlider.getBoundingClientRect();
    const isInView =
      sliderRect.top >= 0 &&
      sliderRect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight);

    // Solo hacer scroll en mini-slider si el main slider está visible
    if (isInView && miniSlides[index]) {
      const parent = miniSlides[index].parentElement;
      const slideTop = miniSlides[index].offsetTop;
      parent.scrollTo({
        top: slideTop - 10, // Ajuste opcional
        behavior: "smooth",
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
    .querySelector(".mini-slider-vertical")
    .addEventListener("mouseenter", stopSlideShow);
  document
    .querySelector(".mini-slider-vertical")
    .addEventListener("mouseleave", startSlideShow);

  // Actualizar al cambiar tamaño de ventana
  window.addEventListener("resize", function () {
    updateSliders(currentIndex);
  });
});
