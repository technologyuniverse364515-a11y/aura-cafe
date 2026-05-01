/* ============================================================
   MAISON NOIR — Dynamic renderer
   Pulls everything from /config/*.js (window.BUTTONS / TEXT /
   MESSAGES / IMAGES) and injects it into the page.
   ============================================================ */
(function () {
  const T = window.TEXT || {};
  const B = window.BUTTONS || {};
  const M = window.MESSAGES || {};
  const I = window.IMAGES || {};

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  const setText = (sel, val) => { const el = $(sel); if (el && val != null) el.textContent = val; };
  const setHTML = (sel, val) => { const el = $(sel); if (el && val != null) el.innerHTML = val; };

  function btn(key, classes = "btn btn-primary") {
    const b = B[key];
    if (!b) return "";
    return `<a class="${classes}" href="${b.link}">${b.text} <span class="arrow">→</span></a>`;
  }

  // ------------------------------------------------------------
  // NAV + FOOTER (rendered into every page that has the mounts)
  // ------------------------------------------------------------
  function renderNav() {
    const mount = $("#nav-mount");
    if (!mount) return;
    mount.innerHTML = `
      <nav class="nav" id="siteNav">
        <div class="container nav-inner">
          <a class="brand" href="index.html">
            <span class="brand-mark"></span>
            <span>${T.brandName || "Brand"}</span>
          </a>
          <div class="nav-links" id="navLinks">
            <a href="index.html">Home</a>
            <a href="offers.html">Offers</a>
            <a href="events.html">Events</a>
            <a href="locations.html">Locations</a>
            <div class="nav-menu-cta">
              ${btn("reserveTable", "btn btn-primary")}
            </div>
          </div>
          <div class="nav-cta">
            ${btn("reserveTable", "btn btn-primary")}
            <button class="nav-toggle" id="navToggle" aria-label="Menu"><span></span></button>
          </div>
        </div>
      </nav>`;

    // active link
    const path = location.pathname.split("/").pop() || "index.html";
    $$("#navLinks a").forEach(a => { if (a.getAttribute("href") === path) a.classList.add("active"); });

    // scroll bg
    const nav = $("#siteNav");
    const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 30);
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });

    // mobile toggle
    $("#navToggle").addEventListener("click", () => $("#navLinks").classList.toggle("open"));
    $$("#navLinks a").forEach(a => a.addEventListener("click", () => $("#navLinks").classList.remove("open")));
  }

  function renderFooter() {
    const mount = $("#footer-mount");
    if (!mount) return;
    const locLinks = (T.locations || []).map(l => `<a href="locations.html">${l.name.replace(T.brandName + " — ", "")}</a>`).join("");
    mount.innerHTML = `
      <footer>
        <div class="container">
          <div class="footer-grid">
            <div class="footer-brand">
              <a class="brand" href="index.html"><span class="brand-mark"></span><span>${T.brandName}</span></a>
              <p>${T.footerTagline || ""}</p>
            </div>
            <div class="footer-col">
              <h4>Visit</h4>
              ${locLinks}
            </div>
            <div class="footer-col">
              <h4>Discover</h4>
              <a href="offers.html">Seasonal Offers</a>
              <a href="events.html">Events</a>
              <a href="reservation.html">Reservations</a>
            </div>
            <div class="footer-col">
              <h4>Contact</h4>
              <a href="tel:+12125550199">+1 (212) 555-0199</a>
              <a href="mailto:hello@maisonnoir.cafe">hello@maisonnoir.cafe</a>
              <a href="#">Instagram</a>
              <a href="#">Press</a>
            </div>
          </div>
          <div class="footer-bottom">
            <span>${T.footerCopyright}</span>
            <span>Crafted with care in New York City</span>
          </div>
        </div>
      </footer>`;
  }

  // ------------------------------------------------------------
  // HOMEPAGE
  // ------------------------------------------------------------
  function renderHome() {
    if (!$("#home")) return;

    // Hero
    const hero = $("#hero");
    hero.innerHTML = `
      <div class="hero-media">
        <video autoplay muted loop playsinline poster="${I.heroPoster}">
          <source src="${I.heroVideo}" type="video/mp4">
        </video>
      </div>
      <div class="hero-content reveal-stagger">
        <span class="eyebrow">${T.heroEyebrow}</span>
        <h1>${T.heroTitle.replace(/\.\s*([^\.]+)\.$/, '. <span class="accent">$1</span>.')}</h1>
        <p class="subtitle">${T.heroSubtitle}</p>
        <div class="hero-ctas">
          ${btn("reserveTable", "btn btn-primary")}
          ${btn("exploreEvents", "btn btn-ghost")}
        </div>
      </div>
      <div class="hero-scroll">Scroll</div>`;

    // Marquee
    setHTML("#marquee-track", Array(2).fill(0).map(() => `
      <span>Single-Origin Espresso</span><span class="dot">◆</span>
      <span>Live Jazz Nights</span><span class="dot">◆</span>
      <span>House-Roasted Daily</span><span class="dot">◆</span>
      <span>Three NYC Locations</span><span class="dot">◆</span>
      <span>Members Quiet Hours</span><span class="dot">◆</span>
    `).join(""));

    // Story
    $("#story").innerHTML = `
      <div class="story-media reveal"><img src="${I.storyImage}" alt="Inside Maison Noir"></div>
      <div class="reveal">
        <span class="eyebrow">Our Story</span>
        <h2>${T.brandStoryTitle}</h2>
        <p>${T.brandStory}</p>
        ${btn("viewLocations", "btn btn-link")}
        <div class="story-stats">
          <div><strong>12+</strong><span>Years Roasting</span></div>
          <div><strong>3</strong><span>NYC Locations</span></div>
          <div><strong>40k</strong><span>Cups a Week</span></div>
        </div>
      </div>`;

    // Best seller
    $("#best-seller").innerHTML = `
      <div class="image" style="background-image:url('${I.bestSellerImage}')"></div>
      <div class="content reveal">
        <span class="eyebrow">${T.bestSellerLabel}</span>
        <h2>${T.bestSellerTitle}</h2>
        <p>${T.bestSellerDesc}</p>
        ${btn("visitNow", "btn btn-primary")}
      </div>`;

    // Seasonal
    $("#seasonal").innerHTML = `
      <div class="content reveal">
        <span class="eyebrow">${T.seasonalOfferLabel}</span>
        <h2>${T.seasonalOfferTitle}</h2>
        <p>${T.seasonalOfferDesc}</p>
        ${btn("viewOffers", "btn btn-primary")}
      </div>
      <div class="image" style="background-image:url('${I.seasonalImage}')"></div>`;

    // Menu
    $("#menu-grid").innerHTML = (T.menuItems || []).map(m => `
      <div class="menu-item reveal">
        <div>
          <div class="menu-name">${m.name}</div>
          <p>${m.desc}</p>
        </div>
        <div class="menu-price">${m.price}</div>
      </div>`).join("");

    // Gallery — asymmetric 5-item layout, remap from existing image pool
    const srcImgs = I.gallery || [];
    const order = [0, 2, 6, 1, 5];
    const galleryItems = order.map(i => srcImgs[i]).filter(Boolean);
    $("#gallery-grid").innerHTML = galleryItems.map((url, i) =>
      `<div class="g-item reveal"><img src="${url}" alt="Maison Noir gallery ${i + 1}" loading="lazy"></div>`).join("");

    // Testimonials
    $("#testimonials").innerHTML = (T.testimonials || []).map((t, i) => `
      <div class="testimonial reveal">
        <p>${t.quote}</p>
        <div class="testimonial-author">
          <img src="${(I.testimonialAvatars || [])[i] || ''}" alt="${t.name}">
          <div><strong>${t.name}</strong><span>${t.role}</span></div>
        </div>
      </div>`).join("");

    // FAQ
    $("#faq-list").innerHTML = (T.faqs || []).map(f => `
      <div class="faq-item">
        <button class="faq-q">${f.q}<span class="icon">+</span></button>
        <div class="faq-a"><p>${f.a}</p></div>
      </div>`).join("");

    $$("#faq-list .faq-q").forEach(q => q.addEventListener("click", () => q.parentElement.classList.toggle("open")));
  }

  // ------------------------------------------------------------
  // OFFERS PAGE
  // ------------------------------------------------------------
  function renderOffers() {
    if (!$("#offers-page")) return;
    setText("#offers-title", T.offersTitle);
    setText("#offers-subtitle", T.offersSubtitle);
    $(".page-header").style.backgroundImage = `linear-gradient(180deg, rgba(18,18,18,.85), var(--bg)), url('${I.offersHero}')`;
    $(".page-header").style.backgroundSize = "cover";
    $(".page-header").style.backgroundPosition = "center";

    $("#offers-grid").innerHTML = (T.offers || []).map(o => `
      <div class="offer-card reveal">
        <span class="offer-tag">${o.tag}</span>
        <h3>${o.title}</h3>
        <p>${o.desc}</p>
      </div>`).join("");
  }

  // ------------------------------------------------------------
  // EVENTS LIST
  // ------------------------------------------------------------
  function renderEvents() {
    if (!$("#events-page")) return;
    setText("#events-title", T.eventsTitle);
    setText("#events-subtitle", T.eventsSubtitle);
    setText("#events-headline", T.eventHeadline);

    $("#events-list").innerHTML = (T.events || []).map((e, i) => `
      <div class="event-card reveal">
        <div class="img" style="background-image:url('${(I.eventImages || [])[i % (I.eventImages || []).length] || I.eventHero}')"></div>
        <div class="body">
          <div class="date">${e.date}</div>
          <h3>${e.title}</h3>
          <p>${e.desc}</p>
          <div class="time">${e.time}</div>
        </div>
      </div>`).join("");

    $("#events-cta").innerHTML = `
      ${btn("reserveTable", "btn btn-primary")}
      ${btn("bookEvent", "btn btn-ghost")}
    `;
  }

  // ------------------------------------------------------------
  // EVENTS LANDING (single promo)
  // ------------------------------------------------------------
  function renderPromo() {
    if (!$("#promo-page")) return;
    const hero = $("#promo-hero");
    hero.style.backgroundImage = `url('${I.eventHero}')`;
    $("#promo-inner").innerHTML = `
      <span class="urgency-banner">${M.urgency}</span>
      <span class="eyebrow">${T.promoEyebrow}</span>
      <h1>${T.promoTitle}</h1>
      <p>${T.promoSubtitle}</p>
      <p>${T.promoBody}</p>
      <ul class="promo-bullets">
        ${(T.promoBullets || []).map(b => `<li>${b}</li>`).join("")}
      </ul>
      <div class="hero-ctas" style="justify-content:flex-start;margin-top:0">
        ${btn("reserveTable", "btn btn-primary")}
        ${btn("callCafe", "btn btn-ghost")}
      </div>`;
  }

  // ------------------------------------------------------------
  // RESERVATION
  // ------------------------------------------------------------
  function renderReservation() {
    if (!$("#reservation-page")) return;
    setText("#reservation-title", T.reservationTitle);
    setText("#reservation-subtitle", T.reservationSubtitle);
    $("#reservation-image").src = I.reservationImage;

    // submit handler
    const form = $("#reservation-form");
    const msg = $("#reservation-msg");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const required = ["name", "phone", "date", "time", "guests"];
      const missing = required.some(k => !String(data.get(k) || "").trim());
      msg.className = "form-msg";
      if (missing) {
        msg.textContent = M.reservationError;
        msg.classList.add("error");
        return;
      }
      msg.textContent = M.reservationSuccess;
      msg.classList.add("success");
      form.reset();
    });
  }

  // ------------------------------------------------------------
  // LOCATIONS
  // ------------------------------------------------------------
  function renderLocations() {
    if (!$("#locations-page")) return;
    setText("#locations-title", T.locationsTitle);
    setText("#locations-subtitle", T.locationsSubtitle);

    $("#locations-list").innerHTML = (T.locations || []).map(l => `
      <div class="location-card reveal">
        <iframe loading="lazy" allowfullscreen
          src="https://www.google.com/maps?q=${encodeURIComponent(l.mapQ)}&output=embed"></iframe>
        <div class="body">
          <h3>${l.name}</h3>
          <div class="meta">
            <div><strong>Address</strong> ${l.address}</div>
            <div><strong>Hours</strong> ${l.hours}</div>
            <div><strong>Phone</strong> ${l.phone}</div>
          </div>
          <div class="actions">
            <a class="btn btn-primary" href="reservation.html">Reserve <span class="arrow">→</span></a>
            <a class="btn btn-ghost" href="https://www.google.com/maps?q=${encodeURIComponent(l.mapQ)}" target="_blank" rel="noopener">Directions</a>
          </div>
        </div>
      </div>`).join("");
  }

  // ------------------------------------------------------------
  // NEWSLETTER (renders on every page that has #newsletter mount)
  // ------------------------------------------------------------
  function renderNewsletter() {
    const mount = $("#newsletter");
    if (!mount) return;
    mount.innerHTML = `
      <div class="container">
        <div class="newsletter reveal">
          <span class="eyebrow">${B.subscribe ? B.subscribe.text : "Subscribe"}</span>
          <h2>${T.newsletterTitle}</h2>
          <p>${T.newsletterSubtitle}</p>
          <form id="newsletter-form" novalidate>
            <input type="email" name="email" placeholder="your@email.com" required>
            <button type="submit" class="btn btn-primary">Subscribe <span class="arrow">→</span></button>
          </form>
          <div class="form-msg" id="newsletter-msg" style="margin:20px auto 0;max-width:520px"></div>
        </div>
      </div>`;

    const form = $("#newsletter-form");
    const msg = $("#newsletter-msg");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = form.email.value.trim();
      const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      msg.className = "form-msg";
      msg.textContent = ok ? M.subscribeSuccess : M.subscribeError;
      msg.classList.add(ok ? "success" : "error");
      if (ok) form.reset();
    });
  }

  // ------------------------------------------------------------
  // STICKY CTA
  // ------------------------------------------------------------
  function renderStickyCta() {
    const el = document.createElement("div");
    el.className = "sticky-cta";
    el.id = "stickyCta";
    el.innerHTML = `<span>${M.stickyCta}</span>${btn("reserveTable", "btn btn-primary")}`;
    document.body.appendChild(el);

    const onScroll = () => {
      const show = window.scrollY > 600;
      el.classList.toggle("show", show);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // ------------------------------------------------------------
  // EXIT INTENT POPUP
  // ------------------------------------------------------------
  function renderExitPopup() {
    if (sessionStorage.getItem("mn_popup_seen")) return;
    const overlay = document.createElement("div");
    overlay.className = "popup-overlay";
    overlay.innerHTML = `
      <div class="popup">
        <button class="close" aria-label="Close">✕</button>
        <span class="eyebrow">Exclusive</span>
        <h3>${M.exitPopupTitle}</h3>
        <p>${M.exitPopup}</p>
        <form id="popup-form" novalidate>
          <input type="email" name="email" placeholder="your@email.com" required>
          <button type="submit" class="btn btn-primary">${M.exitPopupCta} <span class="arrow">→</span></button>
        </form>
        <div class="form-msg" id="popup-msg" style="margin-top:14px"></div>
      </div>`;
    document.body.appendChild(overlay);

    const close = () => { overlay.classList.remove("show"); sessionStorage.setItem("mn_popup_seen", "1"); };
    overlay.querySelector(".close").addEventListener("click", close);
    overlay.addEventListener("click", (e) => { if (e.target === overlay) close(); });

    const form = overlay.querySelector("#popup-form");
    const msg = overlay.querySelector("#popup-msg");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.value.trim());
      msg.className = "form-msg";
      msg.textContent = ok ? M.subscribeSuccess : M.subscribeError;
      msg.classList.add(ok ? "success" : "error");
      if (ok) setTimeout(close, 1400);
    });

    // Desktop: trigger on mouseleave from top
    document.addEventListener("mouseout", (e) => {
      if (e.clientY <= 0 && !sessionStorage.getItem("mn_popup_seen")) {
        overlay.classList.add("show");
      }
    });
    // Mobile fallback: after 25s
    setTimeout(() => {
      if (!sessionStorage.getItem("mn_popup_seen")) overlay.classList.add("show");
    }, 25000);
  }

  // ------------------------------------------------------------
  // REVEAL ON SCROLL
  // ------------------------------------------------------------
  function setupReveals() {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });
    $$(".reveal, .reveal-stagger").forEach(el => io.observe(el));
  }

  // ------------------------------------------------------------
  // INIT
  // ------------------------------------------------------------
  document.addEventListener("DOMContentLoaded", () => {
    renderNav();
    renderHome();
    renderOffers();
    renderEvents();
    renderPromo();
    renderReservation();
    renderLocations();
    renderNewsletter();
    renderFooter();
    renderStickyCta();
    renderExitPopup();
    setupReveals();
  });
})();
