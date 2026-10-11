
document.addEventListener("DOMContentLoaded",()=>{
 const t=document.querySelector(".menu-toggle"),n=document.querySelector(".main-nav");
 if(t&&n){t.addEventListener("click",()=>{const o=n.classList.toggle("open");t.setAttribute("aria-expanded",String(o));});n.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>n.classList.remove("open")));}
 const current=location.pathname.split("/").pop()||"index.html";document.querySelectorAll(".main-nav a").forEach(a=>{const h=a.getAttribute("href");if(h===current||(h==="servicios.html"&&["paginas-web.html","branding.html","desarrollo-software.html"].includes(current)))a.classList.add("active")});
 const els=document.querySelectorAll(".reveal");if("IntersectionObserver"in window){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");io.unobserve(e.target)}}),{threshold:.12});els.forEach(e=>io.observe(e))}else els.forEach(e=>e.classList.add("visible"));
 const wa=document.createElement("a");wa.className="floating-wa";wa.href="https://wa.me/525653194281";wa.target="_blank";wa.rel="noopener";wa.textContent="WhatsApp";document.body.appendChild(wa);
 const form=document.querySelector(".quote-form");if(form)form.addEventListener("submit",()=>{const b=form.querySelector("button[type=submit]");if(b){b.disabled=true;b.textContent="Enviando..."}});
});


/* ===== Cursor personalizado Nuve Works ===== */
(() => {
  const finePointer = window.matchMedia("(pointer: fine) and (hover: hover)");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (!finePointer.matches || reducedMotion.matches) return;

  const dot = document.createElement("div");
  const ring = document.createElement("div");

  dot.className = "nuve-cursor-dot";
  ring.className = "nuve-cursor-ring";
  ring.innerHTML = '<span class="nuve-cursor-icon"></span>';

  document.body.append(dot, ring);
  document.documentElement.classList.add("nuve-custom-cursor");

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;

  const positionDot = (x, y) => {
    dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
  };

  const render = () => {
    ringX += (mouseX - ringX) * 0.16;
    ringY += (mouseY - ringY) * 0.16;

    ring.style.transform =
      `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;

    requestAnimationFrame(render);
  };

  window.addEventListener("pointermove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
    positionDot(mouseX, mouseY);

    dot.classList.add("is-visible");
    ring.classList.add("is-visible");
  }, { passive: true });

  document.addEventListener("pointerover", (event) => {
    const interactive = event.target.closest(
      "a, button, input, select, textarea, label, .service-card, .project-tile, .portfolio-card, .nw-discipline, .nw-project"
    );

    const project = event.target.closest(".project-tile, .portfolio-card, .project-cover, .nw-project");

    ring.classList.toggle("is-hovering", Boolean(interactive));
    ring.classList.toggle("is-project", Boolean(project));

    const icon = ring.querySelector(".nuve-cursor-icon");
    if (icon) icon.textContent = project ? "↗" : "";
  });

  document.addEventListener("pointerout", (event) => {
    if (!event.relatedTarget) {
      dot.classList.remove("is-visible");
      ring.classList.remove("is-visible", "is-hovering", "is-project");
    }
  });

  window.addEventListener("blur", () => {
    dot.classList.remove("is-visible");
    ring.classList.remove("is-visible", "is-hovering", "is-project");
  });

  render();
})();


/* ===== Home V2 interactions ===== */
document.addEventListener("DOMContentLoaded", () => {
  if (!document.body.classList.contains("home-v2")) return;

  const hero = document.querySelector(".nw-hero");
  const orbit = document.querySelector(".nw-hero-orbit");
  const heroMark = document.querySelector(".nw-hero-mark");
  const disciplines = document.querySelectorAll(".nw-discipline");
  const dashboard = document.querySelector(".nw-dashboard");

  // Lightweight hero motion
  if (hero && window.matchMedia("(pointer:fine)").matches) {
    hero.addEventListener("pointermove", (e) => {
      const rect = hero.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - .5;
      const y = (e.clientY - rect.top) / rect.height - .5;

      if (orbit) {
        orbit.style.transform =
          `translateY(-50%) translate(${x * 22}px, ${y * 18}px) rotate(${x * 5}deg)`;
      }

      if (heroMark) {
        heroMark.style.transform =
          `translateY(-50%) translate(${x * 16}px, ${y * 12}px)`;
      }
    });

    hero.addEventListener("pointerleave", () => {
      if (orbit) orbit.style.transform = "translateY(-50%)";
      if (heroMark) heroMark.style.transform = "translateY(-50%)";
    });
  }

  // Graphic movement inside the three disciplines
  disciplines.forEach((item) => {
    const graphic = item.querySelector(".nw-discipline-graphic");
    if (!graphic || !window.matchMedia("(pointer:fine)").matches) return;

    item.addEventListener("pointermove", (e) => {
      const rect = item.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - .5;
      const y = (e.clientY - rect.top) / rect.height - .5;
      graphic.style.marginRight = `${x * 18}px`;
      graphic.style.marginTop = `${y * 16}px`;
    });

    item.addEventListener("pointerleave", () => {
      graphic.style.marginRight = "0";
      graphic.style.marginTop = "0";
    });
  });

  // Small depth effect for AVRA mockup
  if (dashboard && window.matchMedia("(pointer:fine)").matches) {
    const avra = document.querySelector(".nw-avra");
    avra?.addEventListener("pointermove", (e) => {
      const rect = avra.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - .5;
      const y = (e.clientY - rect.top) / rect.height - .5;
      dashboard.style.transform =
        `perspective(1200px) rotateY(${-6 + x * 4}deg) rotateX(${2 - y * 3}deg) translateY(${y * 5}px)`;
    });

    avra?.addEventListener("pointerleave", () => {
      dashboard.style.transform = "perspective(1200px) rotateY(-6deg) rotateX(2deg)";
    });
  }

  // Scroll-driven orbit rotation; intentionally subtle
  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      document.documentElement.style.setProperty("--nw-scroll", `${y}`);
      if (orbit && window.matchMedia("(prefers-reduced-motion:no-preference)").matches) {
        orbit.style.rotate = `${Math.min(y * .015, 18)}deg`;
      }
      if (heroMark && window.matchMedia("(prefers-reduced-motion:no-preference)").matches) {
        heroMark.style.filter = `blur(${Math.min(y * 0.004, 1.4)}px)`;
      }
      ticking = false;
    });
  };
  window.addEventListener("scroll", onScroll, { passive: true });
});
