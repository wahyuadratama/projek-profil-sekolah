// --- HAMBURGER MENU ---
document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.querySelector("nav ul");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("show");
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove("show");
      }
    });

    // Close menu when clicking on a link
    navMenu.addEventListener("click", () => {
      navMenu.classList.remove("show");
    });
  }

  // --- COUNTER ANIMATION ---
  const counters = document.querySelectorAll(".stat-number");
  const animateCounter = (counter) => {
    const target = parseInt(counter.getAttribute("data-target"));
    const increment = target / 100;
    let current = 0;

    const updateCounter = () => {
      if (current < target) {
        current += increment;
        counter.textContent = Math.ceil(current);
        setTimeout(updateCounter, 20);
      } else {
        counter.textContent = target;
      }
    };

    updateCounter();
  };

  // Intersection Observer for counter animation
  const observerOptions = {
    threshold: 0.5,
    rootMargin: "0px 0px -100px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        animateCounter(counter);
        observer.unobserve(counter);
      }
    });
  }, observerOptions);

  counters.forEach((counter) => {
    observer.observe(counter);
  });

  // --- SCROLL ANIMATIONS ---
  const animateOnScroll = () => {
    const elements = document.querySelectorAll(".animate-on-scroll");

    const scrollObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animated");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    elements.forEach((element) => {
      scrollObserver.observe(element);
    });
  };

  animateOnScroll();

  // --- FLOATING ELEMENTS ---
  const createFloatingElements = () => {
    const hero = document.querySelector(".hero");
    if (hero) {
      for (let i = 0; i < 6; i++) {
        const floatingElement = document.createElement("div");
        floatingElement.className = "floating-element";
        floatingElement.style.left = Math.random() * 100 + "%";
        floatingElement.style.animationDelay = Math.random() * 10 + "s";
        floatingElement.style.animationDuration = Math.random() * 10 + 10 + "s";
        hero.appendChild(floatingElement);
      }
    }
  };

  createFloatingElements();

  // --- FORM VALIDATION ---
  const formPendaftaran = document.getElementById("formPendaftaran");
  const formKomentar = document.getElementById("formKomentar");
  const pesan = document.getElementById("pesan");

  // Form Pendaftaran (jika ada)
  if (formPendaftaran) {
    formPendaftaran.addEventListener("submit", function (e) {
      e.preventDefault();

      const nama = document.getElementById("nama").value.trim();
      const email = document.getElementById("email").value.trim();
      const telepon = document.getElementById("telepon").value.trim();
      const program = document.getElementById("program").value;

      if (!nama || !email || !telepon || !program) {
        pesan.textContent = "⚠️ Semua field wajib diisi!";
        pesan.style.color = "red";
        return;
      }

      const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
      if (!emailPattern.test(email)) {
        pesan.textContent = "⚠️ Format email tidak valid!";
        pesan.style.color = "red";
        return;
      }

      if (!/^[0-9]+$/.test(telepon)) {
        pesan.textContent = "⚠️ Nomor telepon hanya boleh angka!";
        pesan.style.color = "red";
        return;
      }

      pesan.textContent =
        "✅ Pendaftaran berhasil! Terima kasih telah mendaftar.";
      pesan.style.color = "green";
      formPendaftaran.reset();
    });
  }

  // Form Komentar (jika ada)
  if (formKomentar) {
    formKomentar.addEventListener("submit", function (e) {
      e.preventDefault();

      const nama = document.getElementById("nama").value.trim();
      const email = document.getElementById("email").value.trim();
      const subjek = document.getElementById("subjek").value.trim();
      const komentar = document.getElementById("komentar").value.trim();

      if (!nama || !email || !subjek || !komentar) {
        pesan.textContent = "⚠️ Semua field wajib diisi!";
        pesan.style.color = "red";
        return;
      }

      const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
      if (!emailPattern.test(email)) {
        pesan.textContent = "⚠️ Format email tidak valid!";
        pesan.style.color = "red";
        return;
      }

      if (komentar.length < 10) {
        pesan.textContent = "⚠️ Komentar minimal 10 karakter!";
        pesan.style.color = "red";
        return;
      }

      pesan.textContent =
        "✅ Komentar berhasil dikirim! Terima kasih atas masukan Anda.";
      pesan.style.color = "green";
      formKomentar.reset();
    });
  }
});
