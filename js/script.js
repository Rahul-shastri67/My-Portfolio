// ES module import always at the top
//  // extension .js dena better hai
// import imagesLoaded from "./images.js";

// Wait for the DOM to be fully loaded before executing scripts
document.addEventListener("DOMContentLoaded", function () {
  // ===== MOBILE MENU TOGGLE =====
  const menuBtn = document.querySelector(".menu-btn");
  const navLinks = document.querySelector(".nav-links");
  let menuOpen = false;

  if (menuBtn) {
    menuBtn.addEventListener("click", () => {
      if (!menuOpen) {
        menuBtn.classList.add("open");
        navLinks.classList.add("show");
        menuOpen = true;
        document.body.style.overflow = "hidden";
      } else {
        menuBtn.classList.remove("open");
        navLinks.classList.remove("show");
        menuOpen = false;
        document.body.style.overflow = "";
      }
    });
  }

  const navItems = document.querySelectorAll(".nav-links a");
  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      if (menuOpen) {
        menuBtn.classList.remove("open");
        navLinks.classList.remove("show");
        menuOpen = false;
        document.body.style.overflow = "";
      }
    });
  });

  const backToTopBtn = document.getElementById("backToTop");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add("show");
    } else {
      backToTopBtn.classList.remove("show");
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  const testimonialCards = document.querySelectorAll(".testimonial-card");
  const dots = document.querySelectorAll(".dot");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  let currentSlide = 0;

  function showTestimonial(index) {
    testimonialCards.forEach((card) => card.classList.remove("active"));
    dots.forEach((dot) => dot.classList.remove("active"));

    testimonialCards[index].classList.add("active");
    dots[index].classList.add("active");
    currentSlide = index;
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      currentSlide =
        (currentSlide - 1 + testimonialCards.length) % testimonialCards.length;
      showTestimonial(currentSlide);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      currentSlide = (currentSlide + 1) % testimonialCards.length;
      showTestimonial(currentSlide);
    });
  }

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showTestimonial(index);
    });
  });

  setInterval(() => {
    if (document.hasFocus() && testimonialCards.length > 0) {
      currentSlide = (currentSlide + 1) % testimonialCards.length;
      showTestimonial(currentSlide);
    }
  }, 5000);

  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const subject = document.getElementById("subject").value;
      const message = document.getElementById("message").value;

      const emailParams = { name, email, subject, message };
      console.log(emailParams);

      emailjs
        .send("service_354e4ts", "template_7mrtbba", emailParams)
        .then(() => {
          alert("Message sent successfully!");
          contactForm.reset();
        })
        .catch((error) => {
          console.error("Error sending email:", error);
          alert("Failed to send message. Please try again later.");
        });
    });
  }
});
