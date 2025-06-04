/********************** */
$(document).ready(function () {
  // Inicializar Slick Slider
  $(".restaurante-slider").slick({
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    fade: true,
    cssEase: "cubic-bezier(0.645, 0.045, 0.355, 1)",
    arrows: true,
    prevArrow:
      '<button type="button" class="slider-btn slider-prev"><i class="fas fa-chevron-left"></i></button>',
    nextArrow:
      '<button type="button" class="slider-btn slider-next"><i class="fas fa-chevron-right"></i></button>',
    responsive: [
      {
        breakpoint: 992,
        settings: {
          arrows: false,
        },
      },
    ],
  });

  // Efecto hover en las imágenes
  $(".slider-item").hover(
    function () {
      $(this).find("img").css("transform", "scale(1.05)");
    },
    function () {
      $(this).find("img").css("transform", "scale(1)");
    }
  );

  // Animación para los elementos de contacto
  $(".contacto-item").each(function (index) {
    $(this)
      .css("opacity", 0)
      .delay(300 * index)
      .animate({ opacity: 1 }, 600);
  });

  // Efecto de carga para los botones
  $(".info-btn").each(function (index) {
    $(this)
      .css({
        opacity: 0,
        transform: "translateY(20px)",
      })
      .delay(800 + index * 200)
      .animate(
        {
          opacity: 1,
          transform: "translateY(0)",
        },
        600
      );
  });
});
