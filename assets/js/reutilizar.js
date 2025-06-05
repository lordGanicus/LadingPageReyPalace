document.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await fetch("../assets/paginas/headerTop.html");
    const data = await res.text();
    document.getElementById("headerTop").innerHTML = data;
  } catch (error) {
    console.error("Error al cargar navbar:", error);
  }
  try {
    const res = await fetch("../assets/paginas/headerBottom.html");
    const data = await res.text();
    document.getElementById("headerBottom").innerHTML = data;
  } catch (error) {
    console.error("Error al cargar navbar:", error);
  }
  try {
    const res = await fetch("../assets/paginas/fotter.html");
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

  window.addEventListener("scroll", function () {
    if (window.scrollY >= 200) {
      header.classList.add("active");
      goTopBtn.classList.add("active");
    } else {
      header.classList.remove("active");
      goTopBtn.classList.remove("active");
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
  try {
    const mainSlider = document.getElementById("mainSlider");
    const mainSlides = document.querySelectorAll(".main-slide");
    const miniSlides = document.querySelectorAll(".mini-slide");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    if (
      mainSlider &&
      mainSlides.length > 0 &&
      miniSlides.length > 0 &&
      prevBtn &&
      nextBtn
    ) {
      let currentIndex = 0;
      const slideCount = mainSlides.length;
      let slideInterval;

      function updateSliders(index) {
        mainSlides.forEach((slide) => slide.classList.remove("active"));
        mainSlides[index].classList.add("active");

        miniSlides.forEach((slide) => slide.classList.remove("active"));
        miniSlides[index].classList.add("active");

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

      function nextSlide() {
        currentIndex = (currentIndex + 1) % slideCount;
        updateSliders(currentIndex);
      }

      function prevSlide() {
        currentIndex = (currentIndex - 1 + slideCount) % slideCount;
        updateSliders(currentIndex);
      }

      nextBtn.addEventListener("click", nextSlide);
      prevBtn.addEventListener("click", prevSlide);

      miniSlides.forEach((slide, index) => {
        slide.addEventListener("click", () => {
          currentIndex = index;
          updateSliders(currentIndex);
        });
      });

      function startSlideShow() {
        slideInterval = setInterval(nextSlide, 5000);
      }

      function stopSlideShow() {
        clearInterval(slideInterval);
      }

      startSlideShow();

      mainSlider.addEventListener("mouseenter", stopSlideShow);
      mainSlider.addEventListener("mouseleave", startSlideShow);

      document
        .querySelector(".mini-slider-container")
        ?.addEventListener("mouseenter", stopSlideShow);
      document
        .querySelector(".mini-slider-container")
        ?.addEventListener("mouseleave", startSlideShow);

      window.addEventListener("resize", function () {
        updateSliders(currentIndex);
      });
    }
  } catch (error) {
    console.error("Error en slider de habitaciones:", error);
  }
});

/**************slider para salones */
document.addEventListener("DOMContentLoaded", function () {
  try {
    const mainSlider = document.getElementById("mainSlider");
    const mainSlides = document.querySelectorAll(".main-slide");
    const miniSlides = document.querySelectorAll(".mini-slide");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    if (
      mainSlider &&
      mainSlides.length > 0 &&
      miniSlides.length > 0 &&
      prevBtn &&
      nextBtn
    ) {
      let currentIndex = 0;
      const slideCount = mainSlides.length;
      let slideInterval;

      function updateSliders(index) {
        mainSlides.forEach((slide) => slide.classList.remove("active"));
        mainSlides[index].classList.add("active");

        miniSlides.forEach((slide) => slide.classList.remove("active"));
        miniSlides[index].classList.add("active");

        const sliderRect = mainSlider.getBoundingClientRect();
        const isInView =
          sliderRect.top >= 0 &&
          sliderRect.bottom <=
            (window.innerHeight || document.documentElement.clientHeight);

        if (isInView && miniSlides[index]) {
          const parent = miniSlides[index].parentElement;
          const slideTop = miniSlides[index].offsetTop;
          parent.scrollTo({
            top: slideTop - 10,
            behavior: "smooth",
          });
        }
      }

      function nextSlide() {
        currentIndex = (currentIndex + 1) % slideCount;
        updateSliders(currentIndex);
      }

      function prevSlide() {
        currentIndex = (currentIndex - 1 + slideCount) % slideCount;
        updateSliders(currentIndex);
      }

      nextBtn.addEventListener("click", nextSlide);
      prevBtn.addEventListener("click", prevSlide);

      miniSlides.forEach((slide, index) => {
        slide.addEventListener("click", () => {
          currentIndex = index;
          updateSliders(currentIndex);
        });
      });

      function startSlideShow() {
        slideInterval = setInterval(nextSlide, 5000);
      }

      function stopSlideShow() {
        clearInterval(slideInterval);
      }

      startSlideShow();

      mainSlider.addEventListener("mouseenter", stopSlideShow);
      mainSlider.addEventListener("mouseleave", startSlideShow);

      document
        .querySelector(".mini-slider-vertical")
        ?.addEventListener("mouseenter", stopSlideShow);
      document
        .querySelector(".mini-slider-vertical")
        ?.addEventListener("mouseleave", startSlideShow);

      window.addEventListener("resize", function () {
        updateSliders(currentIndex);
      });
    }
  } catch (error) {
    console.error("Error en slider de salones:", error);
  }
});

/***********Slider para los paquetes en la seccion de index*************/
document.addEventListener("DOMContentLoaded", function () {
  try {
    const slider = document.querySelector(".romantic-slider");
    const slides = document.querySelectorAll(".romantic-slide");
    const prevBtns = document.querySelectorAll(".romantic-prev-btn");
    const nextBtns = document.querySelectorAll(".romantic-next-btn");
    const currentSlides = document.querySelectorAll(".romantic-current-slide");
    const totalSlides = document.querySelector(".romantic-total-slides");

    if (
      slider &&
      slides.length > 0 &&
      prevBtns.length > 0 &&
      nextBtns.length > 0
    ) {
      let currentIndex = 0;
      const total = slides.length;
      let autoSlideInterval;
      const slideDuration = 5000;

      function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
          goToSlide((currentIndex + 1) % total);
        }, slideDuration);
      }

      function goToSlide(index) {
        currentIndex = index;
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;
        updateCounters();
      }

      function updateCounters() {
        currentSlides.forEach((counter) => {
          counter.textContent = currentIndex + 1;
        });
        if (totalSlides) {
          totalSlides.textContent = total;
        }
      }

      nextBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
          clearInterval(autoSlideInterval);
          goToSlide((currentIndex + 1) % total);
          startAutoSlide();
        });
      });

      prevBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
          clearInterval(autoSlideInterval);
          goToSlide((currentIndex - 1 + total) % total);
          startAutoSlide();
        });
      });

      updateCounters();
      startAutoSlide();

      slider.addEventListener("mouseenter", () => {
        clearInterval(autoSlideInterval);
      });

      slider.addEventListener("mouseleave", () => {
        clearInterval(autoSlideInterval);
        startAutoSlide();
      });
    }
  } catch (error) {
    console.error("Error en slider romántico:", error);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  try {
    const petalsContainer = document.getElementById("petals");
    if (petalsContainer) {
      for (let i = 0; i < 12; i++) {
        const petal = document.createElement("div");
        petal.classList.add("pr-petal");

        const size = Math.random() * 20 + 15;
        petal.style.width = `${size}px`;
        petal.style.height = `${size}px`;
        petal.style.left = `${Math.random() * 100}%`;
        petal.style.bottom = `-${size}px`;
        petal.style.animationDuration = `${Math.random() * 10 + 10}s`;
        petal.style.animationDelay = `${Math.random() * 5}s`;
        petal.style.opacity = Math.random() * 0.5 + 0.3;

        petalsContainer.appendChild(petal);
      }
    }

    if (document.querySelector(".splide")) {
      new Splide(".splide", {
        type: "fade",
        rewind: true,
        autoplay: true,
        interval: 6000,
        pauseOnHover: false,
        pauseOnFocus: false,
        speed: 1200,
        easing: "ease-in-out",
        arrows: true,
        pagination: true,
        classes: {
          arrows: "splide__arrows",
          arrow: "splide__arrow",
          prev: "splide__arrow--prev",
          next: "splide__arrow--next",
          pagination: "splide__pagination",
          page: "splide__pagination__page",
        },
      }).mount();
    }
  } catch (error) {
    console.error("Error en efectos decorativos:", error);
  }
});

/*******Salones*******/
document.addEventListener("DOMContentLoaded", function () {
  try {
    const cards = document.querySelectorAll(".salon-card");
    if (cards.length > 0) {
      function checkScroll() {
        cards.forEach((card) => {
          const cardTop = card.getBoundingClientRect().top;
          const windowHeight = window.innerHeight;

          if (cardTop < windowHeight - 100) {
            card.style.animationPlayState = "running";
          }
        });
      }

      checkScroll();
      window.addEventListener("scroll", checkScroll);
    }
  } catch (error) {
    console.error("Error en animación de salones:", error);
  }
});
document.addEventListener("DOMContentLoaded", function () {
  // Inicialización de todos los sliders
  const sliders = document.querySelectorAll(".splide");

  sliders.forEach((slider) => {
    new Splide(slider, {
      type: "fade",
      rewind: true,
      autoplay: true,
      interval: 5000,
      arrows: false,
      pagination: false,
      height: "350px",
    }).mount();
  });
});
