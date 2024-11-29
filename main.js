document.addEventListener("DOMContentLoaded", function () {
  // Header Slider Configuration
  new Splide("header .splide", {
    type: "slide",
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
      navbarItems.forEach(nav => nav.classList.remove("active"));
      item.classList.add("active");

      const category = item.getAttribute("data-category");
      productMains.forEach(main => {
        if (main.getAttribute("data-category") === category) {
          main.classList.add("active");
        } else {
          main.classList.remove("active");
        }
      });
    });
  });

  document.querySelector(".product-main").classList.add("active");
});

// faqx 
let titles = document.querySelectorAll('.faq-title');
let contents = document.querySelectorAll('.faq-content');
let plus = document.querySelectorAll('#plus'); // Corrected to querySelectorAll
let minus = document.querySelectorAll('#minus'); // Corrected to querySelectorAll

titles.forEach((title, i) => {
  title.addEventListener('click', () => {
    const content = contents[i];
    const currentPlus = plus[i];
    const currentMinus = minus[i];

    if (content.style.display === 'block') {
      content.style.display = 'none';
      // title.style.background = "white";
      // title.style.color = "#21555b";
      currentMinus.style.display = "none";
      currentPlus.style.display = "block";
    } else {
      contents.forEach(c => c.style.display = 'none');
      titles.forEach((t, index) => {
        // t.style.background = "white";
        // t.style.color = "#21555b";
        plus[index].style.display = "block";
        minus[index].style.display = "none";
      });

      content.style.display = 'block';
      // title.style.background = "green";
      // title.style.color = "white";
      currentMinus.style.display = "block";
      currentPlus.style.display = "none";
    }
  });
});

// submit form 
document.getElementById('contactForm').addEventListener('submit', async function (e) {
  e.preventDefault(); // Ngăn hành vi submit mặc định

  // Kiểm tra reCaptcha
  const captchaResponse = grecaptcha.getResponse();
  if (!captchaResponse) {
    showPopup('Please complete the reCaptcha verification.');
    return;
  }

  // Lấy dữ liệu từ form
  const body = JSON.stringify({
    name: document.getElementById('name').value.trim(),
    email: document.getElementById('email').value.trim(),
    phone: document.getElementById('phone').value.trim(),
    address: document.getElementById('address').value.trim(),
    message: document.getElementById('message').value.trim(),
    captcha: captchaResponse
  });

  try {
    const response = await fetch('https://testapi.demo.wgentech.com/notify.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: body,
      keepalive: true
    });

    const result = await response.json();
    showPopup(result.message || 'Your message has been sent successfully!');

    // Reset form nếu thành công
    if (result.success) {
      document.getElementById('contactForm').reset();
      grecaptcha.reset(); // Reset reCaptcha
    }
  } catch (error) {
    console.error('Error:', error);
    showPopup('An error occurred. Please try again later.');
  }
});

// Hàm hiển thị popup thông báo
function showPopup(message) {
  alert(message); // Thay bằng modal/popup nếu cần
}


// push email 
// Hàm kiểm tra email hợp lệ
function validateEmail(email) {
  console.log("Đang kiểm tra email: ", email);  // In email ra console để kiểm tra

  // Biểu thức chính quy kiểm tra email
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email);
}

// Hàm gửi yêu cầu fetch tới Google Sheets
async function submitEmail() {
  const emailInput = document.getElementById('email');
  const email = emailInput.value.trim();  // Xóa khoảng trắng ở đầu/cuối email

  console.log("Email lấy từ input: ", email);  // Kiểm tra giá trị email lấy từ input

  // Kiểm tra email hợp lệ
  if (!validateEmail(email)) {
    showPopup('Thank you!Data has been sent successfully.');
    return;
  }

  // Gửi dữ liệu đến Google Sheets qua Google Apps Script
  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbwlnruolAEFek8x1wUYLxocHdIuwHWrHYXSfzSXZSygslzejM-ppDe76EuK8jkKWyB4/exec', {
      method: 'POST',
      body: new URLSearchParams({
        'email': email,
      }),
    });

    const result = await response.json();
    
    if (result.status === 'success') {
      showPopup('Thành công! Cảm ơn bạn đã gửi email.');
    } else {
      showPopup('Thất bại! Vui lòng thử lại.');
    }
  } catch (error) {
    console.error('Error:', error);
    showPopup('Đã có lỗi xảy ra, vui lòng thử lại.');
  }
}

// Hàm hiển thị thông báo trong popup
function showPopup(message) {
  const popup = document.getElementById('popup');
  const popupMessage = document.getElementById('popup-message');
  popupMessage.innerHTML = message;
  popup.style.display = 'block';
}

// Hàm đóng popup
function closePopup() {
  document.getElementById('popup').style.display = 'none';
}

// Lắng nghe sự kiện submit (click button)
document.getElementById('submit-btn').addEventListener('click', function(event) {
  event.preventDefault();  // Ngừng hành động submit mặc định
  submitEmail();
});

// Lắng nghe sự kiện nhấn Enter trong input email
document.getElementById('email').addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault();  // Ngừng hành động mặc định khi nhấn Enter
    submitEmail();
  }
});

// cookie bar 
// Kiểm tra xem cookie đã được chấp nhận chưa
document.addEventListener("DOMContentLoaded", function() {
  const cookieBar = document.getElementById("cookie-bar");
  const acceptButton = document.getElementById("accept-cookies");
  const dismissButton = document.getElementById("dismiss-cookies");

  // Hiển thị cookie bar nếu chưa được chấp nhận
  if (!getCookie("cookiesAccepted")) {
    cookieBar.style.display = "flex";
  }

  // Xử lý khi nhấn "Accept"
  acceptButton.addEventListener("click", function() {
    setCookie("cookiesAccepted", "true", 180); // Lưu cookie 6 tháng
    cookieBar.style.display = "none";
  });

  // Xử lý khi nhấn "Dismiss"
  dismissButton.addEventListener("click", function() {
    cookieBar.style.display = "none";
  });
});

// Hàm đặt cookie
function setCookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
  document.cookie = `${name}=${value};expires=${d.toUTCString()};path=/`;
}

// Hàm lấy cookie
function getCookie(name) {
  const cookies = document.cookie.split("; ");
  for (let cookie of cookies) {
    const [key, value] = cookie.split("=");
    if (key === name) {
      return value;
    }
  }
  return null;
}

// popups header 
function showSaleBanner() {
  const banner = document.querySelector('.popups-sale');
  banner.classList.add('show');
}

// Hàm ẩn banner giảm giá và lưu cookie để không hiển thị lại trong 4 giờ
function hideSaleBanner() {
  const banner = document.querySelector('.popups-sale');
  banner.classList.remove('show');
  setCookie('saleBannerDismissed', 'true', 1 / 6); // Lưu cookie 4 giờ (1/6 ngày)
}

// Hàm thiết lập cookie
function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
}

// Hàm lấy giá trị cookie
function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
}

// Hàm khởi tạo banner
function initSaleBanner() {
  if (!getCookie('saleBannerDismissed')) {
    setTimeout(showSaleBanner, 3000); // Hiển thị sau 3 giây
  }
}

// Đóng banner khi nhấn nút đóng
document.querySelector('.sale-banner__close').addEventListener('click', hideSaleBanner);

// Đóng banner khi nhấn ra ngoài popup
document.addEventListener('click', function (event) {
  const banner = document.querySelector('.popups-sale');
  if (!banner.contains(event.target) && banner.classList.contains('show')) {
    hideSaleBanner();
  }
});

// Khởi tạo banner khi trang được tải
window.onload = initSaleBanner;
