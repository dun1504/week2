document.addEventListener("DOMContentLoaded", function () {
  // Header Slider Configuration
  new Splide("header .splide", {
    type: "",
    perPage: 2, 
    autoplay: false, 
    arrows: false,
    pagination: false,
    speed: 0, 
    drag: false, 
    breakpoints: {
      768: {
        perPage: 1, 
        arrows: true,
        type: "loop", 
        autoplay: false, 
        pagination: false, 
        speed: 600, 
      },
      480: {
        perPage: 1, 
        arrows: true, 
        type: "loop", 
        autoplay: false, 
        pagination: false, 
        speed: 600, 
      },
    },
  }).mount();
});
