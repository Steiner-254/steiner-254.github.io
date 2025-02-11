document.addEventListener("DOMContentLoaded", function () {
  /*=======================
    Preloader Fade-out
  ========================*/
  window.addEventListener("load", function () {
    const preloader = document.getElementById("preloader");
    if (preloader) {
      preloader.classList.add("fade-out");
      setTimeout(() => {
        preloader.style.display = "none";
      }, 600);
    }
  });

  /*=======================
    Mobile Menu Toggle
  ========================*/
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".nav-menu");

  menuToggle.addEventListener("click", function () {
    navMenu.classList.toggle("active");
  });

  // Close mobile menu when a nav link is clicked
  document.querySelectorAll(".nav-menu a").forEach(link => {
    link.addEventListener("click", function () {
      if (navMenu.classList.contains("active")) {
        navMenu.classList.remove("active");
      }
    });
  });

  /*=======================
    Smooth Scrolling
  ========================*/
  document.querySelectorAll(".nav-menu a").forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  /*===============================================
    Intersection Observer for Active Nav Links
  ================================================*/
  const sections = document.querySelectorAll("section");
  const observerOptions = { root: null, threshold: 0.3 };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        document.querySelectorAll(".nav-menu a").forEach(link => {
          link.classList.remove("active");
          if (link.getAttribute("href").substring(1) === id) {
            link.classList.add("active");
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));

  /*=======================
    Scroll-to-Top Button
  ========================*/
  const scrollBtn = document.getElementById("scrollToTop");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
      scrollBtn.classList.add("show");
    } else {
      scrollBtn.classList.remove("show");
    }
    // Change background dynamically on scroll
    if (window.scrollY > 100) {
      document.body.classList.add("dynamic-bg");
    } else {
      document.body.classList.remove("dynamic-bg");
    }
  });
  if (scrollBtn) {
    scrollBtn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /*=======================
    Typed.js Initialization
  ========================*/
  var typed = new Typed("#typed-text", {
    strings: [
      "Web Application Security Expert",
      "Cybersecurity Engineer",
      "Penetration Tester",
      "Smart Contract Developer",
      "DevSecOps Specialist"
    ],
    typeSpeed: 50,
    backSpeed: 25,
    backDelay: 2000,
    loop: true
  });

  /*====================================================
    Dynamic Blog Posts Loading from JSON Array
  ====================================================*/
  const blogPosts = [
    {
      title: "Exploring Cybersecurity Trends in 2023",
      date: "Oct 10, 2023",
      image: "images/image.jpg",
      link: "https://medium.com/@Steiner254"
    },
    {
      title: "Smart Contracts: Security Best Practices",
      date: "Nov 05, 2023",
      image: "images/image.jpg",
      link: "https://medium.com/@Steiner254"
    }
  ];
  const blogContainer = document.querySelector(".blog-posts");
  if (blogContainer) {
    blogContainer.innerHTML = "";
    blogPosts.forEach((post, index) => {
      const postArticle = document.createElement("article");
      postArticle.classList.add("post");
      postArticle.setAttribute("data-aos", index % 2 === 0 ? "fade-right" : "fade-left");
      postArticle.innerHTML = `
        <img src="${post.image}" alt="${post.title}">
        <div class="post-content">
          <h3>${post.title}</h3>
          <p>${post.date}</p>
          <a href="${post.link}" target="_blank" class="read-more">Read More</a>
        </div>
      `;
      blogContainer.appendChild(postArticle);
    });
  }

  /*=======================
    Custom Cursor Effect
  ========================*/
  const customCursor = document.getElementById("custom-cursor");

  window.addEventListener("mousemove", function (e) {
    customCursor.style.left = e.clientX + "px";
    customCursor.style.top = e.clientY + "px";
  });

  document.querySelectorAll("a, button, .card, .skill-item").forEach(el => {
    el.addEventListener("mouseenter", () => {
      customCursor.style.transform = "translate(-50%, -50%) scale(2)";
      customCursor.style.backgroundColor = "rgba(30,60,114,0.2)";
    });
    el.addEventListener("mouseleave", () => {
      customCursor.style.transform = "translate(-50%, -50%) scale(1)";
      customCursor.style.backgroundColor = "transparent";
    });
  });

  /*=======================
    About Section Mouse Parallax
  ========================*/
  const heroSection = document.querySelector(".about-section");
  if (heroSection) {
    heroSection.addEventListener("mousemove", function (e) {
      const { width, height } = heroSection.getBoundingClientRect();
      const moveX = (e.clientX - width / 2) / (width / 2);
      const moveY = (e.clientY - height / 2) / (height / 2);
      heroSection.style.backgroundPosition = `${50 - moveX * 10}% ${50 - moveY * 10}%`;
    });
    heroSection.addEventListener("mouseleave", function () {
      heroSection.style.backgroundPosition = "50% 50%";
    });
  }
});
