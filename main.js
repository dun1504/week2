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

document.addEventListener("DOMContentLoaded", () => {
  const navbarItems = document.querySelectorAll(".navbar li");
  const productMains = document.querySelectorAll(".product-main");

  navbarItems.forEach(item => {
    item.addEventListener("click", () => {
      // Remove 'active' from all navbar items
      navbarItems.forEach(nav => nav.classList.remove("active"));
      // Add 'active' to clicked navbar item
      item.classList.add("active");

      // Get the selected category
      const category = item.getAttribute("data-category");

      // Show only the product-main that matches the category
      productMains.forEach(main => {
        if (main.getAttribute("data-category") === category) {
          main.classList.add("active");
        } else {
          main.classList.remove("active");
        }
      });
    });
  });

  // Set default active product-main
  document.querySelector(".product-main").classList.add("active");
});
