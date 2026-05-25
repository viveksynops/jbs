const header = document.getElementById("siteHeader");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.getElementById("navLinks");
const contactForm = document.querySelector(".contact-form");

const setHeaderState = () => {
  header.classList.toggle("scrolled", window.scrollY > 18);
};

window.addEventListener("scroll", setHeaderState, { passive: true });
setHeaderState();

menuToggle.addEventListener("click", () => {
  const isOpen = document.body.classList.toggle("menu-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    document.body.classList.remove("menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

if (window.gsap && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  gsap.from(".brand, .menu-toggle", {
    y: -18,
    opacity: 0,
    duration: 0.85,
    stagger: 0.045,
    ease: "power3.out"
  });

  gsap.from(".hero-copy h1, .hero-copy p, .hero-actions", {
    y: 34,
    opacity: 0,
    duration: 1,
    stagger: 0.14,
    delay: 0.18,
    ease: "power3.out"
  });

  gsap.from(".hero-visual", {
    x: 44,
    opacity: 0,
    duration: 1.15,
    delay: 0.36,
    ease: "power3.out"
  });

  gsap.to(".glass-line", {
    x: 34,
    duration: 4,
    yoyo: true,
    repeat: -1,
    ease: "sine.inOut",
    stagger: 0.4
  });
}

document.querySelectorAll(".service-card, .process-steps li").forEach((card) => {
  card.addEventListener("pointermove", (event) => {
    const bounds = card.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    card.style.setProperty("--mx", `${x}px`);
    card.style.setProperty("--my", `${y}px`);
  });
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(contactForm);
  const name = formData.get("name") || "Customer";
  const phone = formData.get("phone") || "";
  const service = formData.get("service") || "General enquiry";
  const message = formData.get("message") || "";
  const text = encodeURIComponent(
    `Hello J B S Trading & Services,\n\nName: ${name}\nPhone: ${phone}\nService Needed: ${service}\nMessage: ${message}`
  );
  window.location.href = `https://wa.me/97431214343?text=${text}`;
});
