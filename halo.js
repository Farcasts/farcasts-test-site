/* Halo store interactions. Cart drawer, quick-view modal, newsletter popup, sticky promo.
   No frameworks. Cart is in-memory only (demo site). Every overlay is a DOM overlay,
   never a native dialog. Product data lives in window.HALO_PRODUCTS when a page needs
   quick-view; pages without a grid simply omit it. */
(() => {
  const money = (n) => "$" + n;
  const cart = [];

  const $ = (s, r = document) => r.querySelector(s);
  const backdrop = $("#overlay-backdrop");
  const drawer = $("#cart-drawer");
  const modal = $("#quickview");

  const openOverlay = (el) => { el.setAttribute("data-open", ""); backdrop.setAttribute("data-open", ""); document.body.style.overflow = "hidden"; };
  const closeAll = () => {
    [drawer, modal].forEach((el) => el && el.removeAttribute("data-open"));
    backdrop.removeAttribute("data-open");
    document.body.style.overflow = "";
  };

  /* ---- cart ---- */
  const renderCart = () => {
    const body = $("#cart-body");
    const countEls = document.querySelectorAll(".cart-btn .count");
    countEls.forEach((c) => (c.textContent = cart.length));
    if (!cart.length) {
      body.innerHTML = '<p class="cart-empty">Your regimen is empty. Add a formula to begin.</p>';
    } else {
      body.innerHTML = cart.map((p, i) => `
        <div class="cart-line">
          <img src="${p.img}" alt="${p.name}" />
          <div>
            <div class="cl-name">${p.name}</div>
            <div class="cl-meta">${p.cat} &middot; ${p.batch}</div>
            <button class="cl-remove" data-remove="${i}">Remove</button>
          </div>
          <div class="cl-price">${money(p.price)}</div>
        </div>`).join("");
    }
    const total = cart.reduce((s, p) => s + p.price, 0);
    const sub = $("#cart-subtotal");
    if (sub) sub.textContent = money(total);
  };

  const addToCart = (p) => { cart.push(p); renderCart(); openOverlay(drawer); };

  document.addEventListener("click", (e) => {
    const add = e.target.closest("[data-add]");
    if (add) {
      addToCart({
        name: add.dataset.name, cat: add.dataset.cat, batch: add.dataset.batch,
        price: Number(add.dataset.price), img: add.dataset.img,
      });
      return;
    }
    const rm = e.target.closest("[data-remove]");
    if (rm) { cart.splice(Number(rm.dataset.remove), 1); renderCart(); return; }

    const qv = e.target.closest("[data-quickview]");
    if (qv && modal && window.HALO_PRODUCTS) {
      const p = window.HALO_PRODUCTS[qv.dataset.quickview];
      if (p) { fillQuickView(p); openOverlay(modal); }
      return;
    }
    if (e.target.closest(".cart-btn")) { renderCart(); openOverlay(drawer); return; }
    if (e.target.closest("[data-close-overlay]") || e.target === backdrop) closeAll();
  });

  /* ---- quick-view ---- */
  const fillQuickView = (p) => {
    $("#qv-img").src = p.img;
    $("#qv-img").alt = p.name;
    $("#qv-cat").textContent = p.cat;
    $("#qv-name").textContent = p.name;
    $("#qv-concern").textContent = p.concern;
    $("#qv-active").textContent = p.active;
    $("#qv-skin").textContent = p.skin;
    $("#qv-batch").textContent = p.batch;
    $("#qv-size").textContent = p.size;
    $("#qv-price").textContent = money(p.price);
    const btn = $("#qv-add");
    Object.assign(btn.dataset, { add: "", name: p.name, cat: p.cat, batch: p.batch, price: p.price, img: p.img });
  };

  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeAll(); });

  /* ---- newsletter popup: DOM overlay, dismissible, one-shot per session ---- */
  const pop = $("#newsletter-pop");
  if (pop) {
    const KEY = "halo-news-dismissed";
    if (!sessionStorage.getItem(KEY)) {
      setTimeout(() => pop.setAttribute("data-open", ""), 4200);
    }
    const dismiss = () => { pop.removeAttribute("data-open"); sessionStorage.setItem(KEY, "1"); };
    pop.querySelectorAll("[data-news-close]").forEach((b) => b.addEventListener("click", dismiss));
    const form = pop.querySelector("form");
    if (form) form.addEventListener("submit", (e) => {
      e.preventDefault();
      pop.querySelector(".np-inner").innerHTML =
        '<p class="np-done">You are on the list. Watch for the next formulation drop.</p>';
      sessionStorage.setItem(KEY, "1");
    });
  }

  /* ---- sticky promo dismiss ---- */
  const sp = $("#sticky-promo");
  if (sp) sp.querySelector(".sp-close").addEventListener("click", () => (sp.hidden = true));

  renderCart();
})();
