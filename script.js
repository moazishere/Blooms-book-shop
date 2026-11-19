/* ==========================================================
   Blooms — interactions
   GSAP (+ Flip) is optional: every feature works without it,
   motion is layered on top and gated by prefers-reduced-motion.
   ========================================================== */
(() => {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  const CATALOG = window.BOOKISH_CATALOG || [];
  const GENRES = window.BOOKISH_GENRES || {};
  const byId = Object.fromEntries(CATALOG.map((b) => [b.id, b]));

  // English / Arabic helpers (i18n.js). Falls back to plain English if it failed to load.
  const L = window.BloomsLang || {
    lang: "en", rtl: false, t: (k, v = {}) => k.replace(/\{(\w+)\}/g, (_, x) => v[x]),
    onChange() {}, genre: (_, f) => f, format: (f) => f, blurb: (b) => b.blurb, locale: () => "en-US",
  };
  const t = L.t;
  const genreName = (key) => L.genre(key, GENRES[key]);

  const hasGSAP = typeof window.gsap !== "undefined";
  const hasFlip = hasGSAP && typeof window.Flip !== "undefined";
  if (hasFlip) gsap.registerPlugin(Flip);

  const reduceQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const motionOK = () => hasGSAP && !reduceQuery.matches;

  const money = (n) => `$${n.toFixed(2)}`;
  const coverSrc = (id) => `assets/covers/${id}.webp`;
  const STAR = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 2.5 2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9z" /></svg>';
  const ratingHTML = (b) => `${STAR} ${b.rating.toFixed(2)} <span>(${b.reviews.toLocaleString("en-US")})</span>`;

  const store = {
    get(key, fallback) {
      try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
    },
    set(key, value) {
      try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* storage unavailable */ }
    },
  };

  /* ---------- Toast ---------- */
  const toast = $("#toast");
  let toastTimer;
  const showToast = (message) => {
    toast.textContent = message;
    toast.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2600);
  };

  /* ==========================================================
     Header: sticky shadow, mobile menu, dropdown, filter panel
     ========================================================== */
  const header = $(".header");
  const nav = $("#mainNav");
  const menuToggle = $("#menuToggle");

  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const setMenu = (open) => {
    nav.classList.toggle("is-open", open);
    header.classList.toggle("menu-open", open);
    if (open) header.classList.remove("search-hidden");
    menuToggle.setAttribute("aria-expanded", open);
    menuToggle.setAttribute("aria-label", t(open ? "menuClose" : "menuOpen"));
  };
  menuToggle.addEventListener("click", () => setMenu(!nav.classList.contains("is-open")));

  $$(".nav > .nav__link").forEach((link) => {
    link.addEventListener("click", () => {
      $$(".nav__link").forEach((l) => l.classList.remove("is-active"));
      link.classList.add("is-active");
      if (link.tagName === "A") setMenu(false);
    });
  });
  $$(".dropdown__menu a").forEach((a) => a.addEventListener("click", () => { setDropdown(false); setMenu(false); }));

  const dropdown = $(".dropdown");
  const dropdownToggle = $(".dropdown__toggle");
  const setDropdown = (open) => {
    dropdown.classList.toggle("is-open", open);
    dropdownToggle.setAttribute("aria-expanded", open);
  };
  dropdownToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    setDropdown(!dropdown.classList.contains("is-open"));
  });

  const filterBtn = $("#filterBtn");
  const filterPanel = $("#filterPanel");
  const setFilterPanel = (open) => {
    filterPanel.hidden = !open;
    filterBtn.setAttribute("aria-expanded", open);
  };
  filterBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    setFilterPanel(filterPanel.hidden);
  });
  filterPanel.addEventListener("click", (e) => e.stopPropagation());

  document.addEventListener("click", () => {
    setDropdown(false);
    setFilterPanel(false);
  });

  /* ==========================================================
     Rendering
     ========================================================== */
  const trendingIds = ["cosmic-love", "love-is-a-war-song", "intermezzo", "water-moon", "maggie", "gate-of-the-feral-gods", "onyx-storm", "god-of-the-woods", "funny-story", "the-women"];

  const track = $("#track");
  const renderTrending = () => {
    track.innerHTML = trendingIds.map((id) => {
      const b = byId[id];
      return `
        <article class="book">
          <button class="cover-img" data-book="${b.id}" aria-label="${t("quickView", { title: b.title })}">
            <img src="${coverSrc(b.id)}" alt="" loading="lazy" width="124" height="184" />
          </button>
          <div class="book__info">
            <h3 lang="en">${b.title}</h3>
            <p class="book__author" lang="en">${b.author}</p>
            <p class="book__meta">${b.year} <span>|</span> ${L.format(b.format)}</p>
            <p class="book__rating">${ratingHTML(b)}</p>
            <p class="book__price">${money(b.price)}</p>
            <button class="btn btn--cart" data-add="${b.id}">${t("addCart")}</button>
          </div>
        </article>`;
    }).join("");
  };
  renderTrending();

  const categoryStyle = {
    fiction:    { tile: "#FFF3C2", fan: ["tomorrow-x3", "james", "the-women"] },
    mystery:    { tile: "#FFE1D3", fan: ["thursday-murder-club", "silent-patient", "god-of-the-woods"] },
    romance:    { tile: "#FCE0EC", fan: ["beach-read", "funny-story", "evelyn-hugo"] },
    fantasy:    { tile: "#E2E7FB", fan: ["babel", "fourth-wing", "project-hail-mary"] },
    nonfiction: { tile: "#DDF3E1", fan: ["educated", "braiding-sweetgrass", "atomic-habits"] },
    poetry:     { tile: "#F1E6DA", fan: ["time-is-a-mother", "devotions", "sun-and-her-flowers"] },
  };
  const genreCount = (g) => CATALOG.filter((b) => b.genre === g).length;

  const renderCategories = () => {
    $("#categoryGrid").innerHTML = Object.keys(GENRES).map((key) => {
      const { tile, fan } = categoryStyle[key];
      const name = genreName(key);
      const browse = L.rtl ? `تصفّح ${name}` : `Browse ${name.split(" ")[0].toLowerCase()}`;
      return `
        <button class="category" data-genre="${key}" style="--tile:${tile}">
          <h3>${name}</h3>
          <p>${t("inStock", { n: genreCount(key) })}</p>
          <span class="category__go">${browse}</span>
          <span class="fan" aria-hidden="true">${fan.map((id) => `<img src="${coverSrc(id)}" alt="" loading="lazy" />`).join("")}</span>
        </button>`;
    }).join("");
  };
  renderCategories();

  const tabs = $("#genreTabs");
  const renderTabs = (selected = "all") => {
    tabs.innerHTML = [["all", t("allBooks")], ...Object.keys(GENRES).map((key) => [key, genreName(key)])]
      .map(([key, name]) => `<button class="tab" role="tab" data-genre="${key}" aria-selected="${key === selected}">${name}</button>`)
      .join("");
  };
  renderTabs();

  const shelf = $("#shelf");
  shelf.innerHTML = CATALOG.map((b) => `
    <article class="card" data-id="${b.id}">
      <button class="cover-img" data-book="${b.id}">
        <img src="${coverSrc(b.id)}" alt="" loading="lazy" width="168" height="252" />
      </button>
      <h3 lang="en">${b.title}</h3>
      <p class="card__author" lang="en">${b.author}</p>
      <p class="book__rating">${ratingHTML(b)}</p>
      <div class="card__row">
        <p class="card__price">${money(b.price)}</p>
        <button class="card__add" data-add="${b.id}">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>
        </button>
      </div>
    </article>`).join("");
  const cards = $$(".card", shelf);
  // Cards are created once (Flip tracks them); only their labels change with the language
  const labelCards = () => cards.forEach((card) => {
    const b = byId[card.dataset.id];
    $(".cover-img", card).setAttribute("aria-label", t("quickView", { title: b.title }));
    $(".card__add", card).setAttribute("aria-label", t("addAria", { title: b.title }));
  });
  labelCards();

  /* ==========================================================
     Trending carousel
     ========================================================== */
  const prevBtn = $("#prevBtn");
  const nextBtn = $("#nextBtn");
  const step = () => {
    const card = $(".book", track);
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    return card ? card.offsetWidth + gap : track.clientWidth;
  };
  // In RTL the track starts at the right edge and scrollLeft runs 0 → negative
  const dirSign = () => (L.rtl ? -1 : 1);
  const updateArrows = () => {
    const max = track.scrollWidth - track.clientWidth;
    const pos = Math.abs(track.scrollLeft);
    prevBtn.disabled = pos <= 1;
    nextBtn.disabled = pos >= max - 1;
  };
  prevBtn.addEventListener("click", () => track.scrollBy({ left: -step() * dirSign() }));
  nextBtn.addEventListener("click", () => track.scrollBy({ left: step() * dirSign() }));
  track.addEventListener("scroll", updateArrows, { passive: true });
  track.addEventListener("keydown", (e) => {
    if (e.target !== track) return;
    if (e.key === "ArrowRight") { e.preventDefault(); track.scrollBy({ left: step() }); }
    if (e.key === "ArrowLeft") { e.preventDefault(); track.scrollBy({ left: -step() }); }
  });
  window.addEventListener("resize", updateArrows);

  /* ==========================================================
     Browse: genre tabs + search + format + sort (Flip reflow)
     ========================================================== */
  const searchForm = $("#searchForm");
  const searchInput = $("#searchInput");
  const browseCount = $("#browseCount");
  const shelfEmpty = $("#shelfEmpty");
  const shelfMore = $("#shelfMore");
  const showAllBtn = $("#showAll");
  const SHELF_PREVIEW = 12;
  let genre = "all";
  let expanded = false;

  const applyFilters = ({ animate = true } = {}) => {
    const query = searchInput.value.trim().toLowerCase();
    const format = $('input[name="format"]:checked').value;
    const sort = $('input[name="sort"]:checked').value;

    const state = animate && hasFlip && motionOK() ? Flip.getState(cards) : null;

    const sorted = [...cards];
    if (sort === "price") sorted.sort((a, b) => byId[a.dataset.id].price - byId[b.dataset.id].price);
    if (sort === "rating") sorted.sort((a, b) => byId[b.dataset.id].rating - byId[a.dataset.id].rating);
    if (sort === "new") sorted.sort((a, b) => byId[b.dataset.id].year - byId[a.dataset.id].year);
    sorted.forEach((card) => shelf.appendChild(card));

    // Everything that matches, in display order; only the first 12 show until "Show all"
    let matches = 0;
    sorted.forEach((card) => {
      const b = byId[card.dataset.id];
      const match =
        (genre === "all" || b.genre === genre) &&
        (format === "all" || b.format === format) &&
        (!query || `${b.title} ${b.author}`.toLowerCase().includes(query));
      if (match) matches++;
      card.hidden = !match || (!expanded && matches > SHELF_PREVIEW);
    });

    browseCount.textContent = matches === 1 ? t("bookCountOne") : t("bookCount", { n: matches });
    shelfMore.hidden = expanded || matches <= SHELF_PREVIEW;
    showAllBtn.textContent = t("showAll", { n: matches });
    shelfEmpty.hidden = matches > 0;
    $("#emptyQuery").textContent = query || (genre !== "all" ? genreName(genre) : L.format(format));

    if (state) {
      Flip.from(state, {
        duration: 0.55,
        ease: "power2.inOut",
        absolute: true,
        stagger: 0.012,
        onEnter: (els) => gsap.fromTo(els, { autoAlpha: 0, scale: 0.92 }, { autoAlpha: 1, scale: 1, duration: 0.4, delay: 0.1 }),
        onLeave: (els) => gsap.to(els, { autoAlpha: 0, scale: 0.92, duration: 0.25 }),
      });
    }
  };

  showAllBtn.addEventListener("click", () => {
    expanded = true;
    applyFilters();
    // move focus to the first newly revealed book so keyboard users land in the new content
    const next = $$(".card:not([hidden])", shelf)[SHELF_PREVIEW];
    if (next) $(".cover-img", next).focus({ preventScroll: true });
  });

  const setGenre = (g) => {
    genre = g;
    $$(".tab", tabs).forEach((t) => t.setAttribute("aria-selected", t.dataset.genre === g));
    applyFilters();
  };

  tabs.addEventListener("click", (e) => {
    const tab = e.target.closest(".tab");
    if (tab) setGenre(tab.dataset.genre);
  });
  tabs.addEventListener("keydown", (e) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const all = $$(".tab", tabs);
    const i = all.indexOf(document.activeElement);
    const forward = (e.key === "ArrowRight") !== L.rtl; // arrows follow reading direction
    const next = all[(i + (forward ? 1 : -1) + all.length) % all.length];
    next.focus();
    setGenre(next.dataset.genre);
  });

  $("#categoryGrid").addEventListener("click", (e) => {
    const cat = e.target.closest(".category");
    if (!cat) return;
    $("#browse").scrollIntoView({ behavior: reduceQuery.matches ? "auto" : "smooth" });
    setGenre(cat.dataset.genre);
  });

  let searchTimer;
  searchInput.addEventListener("input", () => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(applyFilters, 160);
  });
  filterPanel.addEventListener("change", () => applyFilters());
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    applyFilters();
    setFilterPanel(false);
    $("#browse").scrollIntoView({ behavior: reduceQuery.matches ? "auto" : "smooth" });
  });
  $("#clearFilters").addEventListener("click", () => {
    searchInput.value = "";
    $('input[name="format"][value="all"]').checked = true;
    setGenre("all");
  });

  /* Mobile: tuck the search row away while scrolling down, bring it back on scroll up.
     Only the header's background shrinks (see CSS), so the page never jumps. */
  const compactQuery = window.matchMedia("(max-width: 960px)");
  let lastY = window.scrollY;
  const onScrollSearch = () => {
    const y = window.scrollY;
    const keep = !compactQuery.matches || y < 120 || nav.classList.contains("is-open") ||
      !filterPanel.hidden || document.activeElement === searchInput;
    if (keep) {
      header.classList.remove("search-hidden");
      lastY = y;
      return;
    }
    if (Math.abs(y - lastY) < 8) return; // ignore tiny jitters
    header.classList.toggle("search-hidden", y > lastY);
    lastY = y;
  };
  window.addEventListener("scroll", onScrollSearch, { passive: true });
  compactQuery.addEventListener("change", onScrollSearch);
  searchInput.addEventListener("focus", () => header.classList.remove("search-hidden"));

  /* ==========================================================
     Cart
     ========================================================== */
  const cartBtn = $("#cartBtn");
  const cartCount = $("#cartCount");
  const drawer = $("#cartDrawer");
  const scrim = $("#scrim");
  const cartItems = $("#cartItems");
  const FREE_SHIPPING = 35;

  // { id: qty } — only keep ids that still exist in the catalogue
  let cart = Object.fromEntries(Object.entries(store.get("bookish-cart", {})).filter(([id, q]) => byId[id] && q > 0));

  const cartQty = () => Object.values(cart).reduce((a, b) => a + b, 0);
  const cartTotal = () => Object.entries(cart).reduce((sum, [id, q]) => sum + byId[id].price * q, 0);

  const renderCart = () => {
    const ids = Object.keys(cart);
    const qty = cartQty();
    const total = cartTotal();

    cartCount.textContent = qty;
    cartCount.hidden = qty === 0;
    cartBtn.setAttribute("aria-label", !qty ? t("openCart") : qty === 1 ? t("openCartOne") : t("openCartN", { n: qty }));

    cartItems.innerHTML = ids.map((id) => {
      const b = byId[id];
      return `
        <li class="line" data-id="${id}">
          <img src="${coverSrc(id)}" alt="" />
          <div>
            <h3 lang="en">${b.title}</h3>
            <p class="line__author" lang="en">${b.author}</p>
            <p class="line__price">${money(b.price * cart[id])}</p>
          </div>
          <div class="line__side">
            <div class="qty" role="group" aria-label="${t("qtyFor", { title: b.title })}">
              <button data-qty="-1" aria-label="${t("qtyDown")}">−</button>
              <output aria-live="polite">${cart[id]}</output>
              <button data-qty="1" aria-label="${t("qtyUp")}">+</button>
            </div>
            <button class="line__remove" data-remove>${t("remove")}</button>
          </div>
        </li>`;
    }).join("");

    $("#cartEmpty").hidden = ids.length > 0;
    $("#cartFoot").hidden = ids.length === 0;
    $("#shipBar").hidden = ids.length === 0;
    $("#cartSubtotal").textContent = money(total);

    const left = FREE_SHIPPING - total;
    $("#shipMsg").innerHTML = left > 0 ? t("shipAway", { amount: money(left) }) : t("shipFree");
    $("#shipBar").classList.toggle("is-free", left <= 0);
    $("#shipFill").style.transform = `scaleX(${Math.min(total / FREE_SHIPPING, 1)})`;

    store.set("bookish-cart", cart);
  };

  const bumpBadge = () => {
    cartCount.classList.remove("bump");
    void cartCount.offsetWidth; // restart animation
    cartCount.classList.add("bump");
  };

  // A copy of the cover flies from where it was clicked to the cart icon
  const flyToCart = (img) => {
    if (!img || !motionOK()) return Promise.resolve();
    const from = img.getBoundingClientRect();
    const to = cartBtn.getBoundingClientRect();
    if (!from.width) return Promise.resolve();

    const flyer = img.cloneNode();
    flyer.className = "flyer";
    Object.assign(flyer.style, { left: `${from.left}px`, top: `${from.top}px`, width: `${from.width}px`, height: `${from.height}px` });
    document.body.appendChild(flyer);

    const dx = to.left + to.width / 2 - (from.left + from.width / 2);
    const dy = to.top + to.height / 2 - (from.top + from.height / 2);
    return new Promise((resolve) => {
      const done = () => { flyer.remove(); resolve(); };
      setTimeout(done, 1200); // safety net if rAF is paused (e.g. background tab)
      gsap.timeline({ onComplete: done })
        .to(flyer, { x: dx, duration: 0.7, ease: "power1.inOut" }, 0)
        .to(flyer, { y: dy, duration: 0.7, ease: "back.in(1.4)" }, 0)
        .to(flyer, { scale: 0.12, rotation: 12, duration: 0.7, ease: "power2.in" }, 0)
        .to(flyer, { autoAlpha: 0, duration: 0.15 }, 0.58);
    });
  };

  const addToCart = (id, sourceImg, button) => {
    const b = byId[id];
    if (!b) return;
    cart[id] = (cart[id] || 0) + 1;

    if (button) {
      button.classList.add("is-added");
      if (button.classList.contains("btn--cart")) button.textContent = t("added");
      setTimeout(() => {
        button.classList.remove("is-added");
        if (button.classList.contains("btn--cart")) button.textContent = t("addCart");
      }, 1400);
    }

    // State updates immediately; the flight is decoration and only times the badge bump
    renderCart();
    flyToCart(sourceImg).then(bumpBadge);
    showToast(t("toastAdded", { title: b.title }));
  };

  // Delegated: any [data-add] button anywhere on the page
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-add]");
    if (!btn) return;
    const scope = btn.closest(".book, .card, .botm");
    const img = scope ? $(".cover-img img, .botm__cover img", scope) : null;
    addToCart(btn.dataset.add, img, btn);
  });

  cartItems.addEventListener("click", (e) => {
    const line = e.target.closest(".line");
    if (!line) return;
    const id = line.dataset.id;
    const q = e.target.closest("[data-qty]");
    if (q) {
      cart[id] = Math.min(99, cart[id] + Number(q.dataset.qty));
      if (cart[id] <= 0) delete cart[id];
    } else if (e.target.closest("[data-remove]")) {
      delete cart[id];
      showToast(t("toastRemoved", { title: byId[id].title }));
    } else return;
    renderCart();
    // keep focus inside the drawer after re-render
    const same = $(`.line[data-id="${id}"] ${q ? `[data-qty="${q.dataset.qty}"]` : ""}`, cartItems);
    (same || $("#cartClose")).focus();
  });

  let lastFocus = null;
  const setDrawer = (open) => {
    if (open) lastFocus = document.activeElement;
    drawer.classList.toggle("is-open", open);
    drawer.setAttribute("aria-hidden", !open);
    drawer.inert = !open;
    scrim.hidden = !open;
    cartBtn.setAttribute("aria-expanded", open);
    document.body.classList.toggle("is-locked", open);
    if (open) $("#cartClose").focus();
    else if (lastFocus) lastFocus.focus();
  };
  cartBtn.addEventListener("click", (e) => { e.stopPropagation(); setDrawer(true); });
  $("#cartClose").addEventListener("click", () => setDrawer(false));
  scrim.addEventListener("click", () => setDrawer(false));
  $("#cartBrowse").addEventListener("click", () => setDrawer(false));
  $("#checkoutBtn").addEventListener("click", () =>
    showToast(t("toastCheckout")));

  // Keep Tab inside the open drawer
  drawer.addEventListener("keydown", (e) => {
    if (e.key !== "Tab") return;
    const focusable = $$("button, a[href]", drawer).filter((el) => el.offsetParent !== null);
    const first = focusable[0], last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  /* ==========================================================
     Quick view
     ========================================================== */
  const qv = $("#quickView");
  const qvImg = $("#qvImg");
  const qvAdd = $("#qvAdd");

  let qvId = null;
  const openQuickView = (id) => {
    const b = byId[id];
    if (!b) return;
    qvId = id;
    qvImg.src = coverSrc(id);
    qvImg.alt = `${b.title} cover`;
    $("#qvGenre").textContent = genreName(b.genre);
    $("#qvTitle").textContent = b.title;
    $("#qvAuthor").textContent = t("by", { author: b.author });
    $("#qvRating").innerHTML = ratingHTML(b);
    $("#qvBlurb").textContent = L.blurb(b);
    $("#qvMeta").textContent = t("meta", { format: L.format(b.format), pages: b.pages, year: b.year });
    $("#qvPrice").textContent = money(b.price);
    qvAdd.dataset.id = id;
    if (!qv.open) qv.showModal();
  };

  document.addEventListener("click", (e) => {
    const trigger = e.target.closest("[data-book]");
    if (trigger) openQuickView(trigger.dataset.book);
  });
  $("#qvClose").addEventListener("click", () => qv.close());
  qv.addEventListener("click", (e) => { if (e.target === qv) qv.close(); }); // backdrop
  qvAdd.addEventListener("click", () => addToCart(qvAdd.dataset.id, qvImg, qvAdd));

  /* ==========================================================
     Community: join clubs, RSVP to events
     ========================================================== */
  // The Book Clubs section is commented out in index.html, so no .btn--join exists until it's restored.
  // State is keyed by stable ids, not the visible names, so it survives a language switch.
  const communitySyncs = [];
  const joined = new Set(store.get("bookish-joined", []));

  $$(".btn--join").forEach((btn) => {
    const club = btn.closest(".club");
    const key = club.dataset.club || $("h3", club).textContent;
    const count = $("[data-members]", club);
    const base = Number(count.textContent);
    const sync = () => {
      const on = joined.has(key);
      btn.setAttribute("aria-pressed", on);
      btn.lastChild.textContent = t(on ? "joined" : "join");
      count.textContent = base + (on ? 1 : 0);
    };
    btn.textContent = "";
    btn.append(document.createTextNode(""));
    sync();
    communitySyncs.push(sync);
    btn.addEventListener("click", () => {
      joined.has(key) ? joined.delete(key) : joined.add(key);
      store.set("bookish-joined", [...joined]);
      sync();
      if (joined.has(key)) showToast(t("toastJoined", { name: $("h3", club).textContent }));
    });
  });

  const going = new Set(store.get("bookish-rsvp", []));
  $$(".btn--rsvp").forEach((btn) => {
    const ev = btn.closest(".event");
    const key = $("time", ev).getAttribute("datetime");
    const sync = () => {
      const on = going.has(key);
      btn.setAttribute("aria-pressed", on);
      btn.lastChild.textContent = t(on ? "going" : "rsvp");
    };
    btn.textContent = "";
    btn.append(document.createTextNode(""));
    sync();
    communitySyncs.push(sync);
    btn.addEventListener("click", () => {
      going.has(key) ? going.delete(key) : going.add(key);
      store.set("bookish-rsvp", [...going]);
      sync();
      const name = $("h3", ev).textContent;
      const date = new Date(`${key}T12:00:00`)
        .toLocaleDateString(L.locale(), { weekday: L.rtl ? "long" : "short", month: L.rtl ? "long" : "short", day: "numeric" });
      showToast(going.has(key) ? t("toastGoing", { name, date }) : t("toastCancel", { name }));
    });
  });

  /* ==========================================================
     Global keys
     ========================================================== */
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    setDropdown(false);
    setFilterPanel(false);
    if (drawer.classList.contains("is-open")) setDrawer(false);
  });

  /* ==========================================================
     Hero entrance — the one orchestrated moment on the page.
     Covers slide up into their slots like books onto a shelf.
     ========================================================== */
  const releaseIntro = () => document.documentElement.classList.remove("intro");

  if (hasGSAP) {
    const mm = gsap.matchMedia();
    mm.add(
      { motion: "(prefers-reduced-motion: no-preference)", reduce: "(prefers-reduced-motion: reduce)" },
      ({ conditions }) => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        if (conditions.motion) {
          const collage = $(".hero__collage");
          collage.classList.add("is-intro"); // CSS hover transitions would fight the tween
          tl.eventCallback("onComplete", () => collage.classList.remove("is-intro"));

          tl.from(".hero__eyebrow", { y: 18, autoAlpha: 0, duration: 0.5 })
            .from(".hero__title", { y: 28, autoAlpha: 0, duration: 0.8 }, "-=0.25")
            .from(".hero__text", { y: 14, autoAlpha: 0, duration: 0.5 }, "-=0.35")
            .from(".hero .btn--primary", { y: 14, autoAlpha: 0, duration: 0.5 }, "-=0.3")
            .from(".hero__collage .tile img", {
              yPercent: 102,
              duration: 0.9,
              ease: "expo.out",
              stagger: { grid: [3, 4], from: "start", amount: 0.7 },
              clearProps: "transform", // hand hover zoom back to CSS
            }, 0.15);
        } else {
          tl.from(".hero__content > *, .hero__collage", { autoAlpha: 0, duration: 0.15 });
        }

        releaseIntro();
        const t = new URLSearchParams(location.search).get("t"); // ?t=1.2 freezes the intro for review
        if (t !== null) { tl.pause(); tl.seek(parseFloat(t)); }
      }
    );
  } else {
    releaseIntro();
  }

  /* ---------- Footer ---------- */
  $("#year").textContent = new Date().getFullYear();
  $("#newsletterForm").addEventListener("submit", (e) => {
    e.preventDefault();
    e.target.reset();
    showToast(t("toastSubscribed"));
  });

  /* ==========================================================
     Language switch (English ⇄ Arabic): re-render everything script-built
     ========================================================== */
  L.onChange(() => {
    renderTrending();
    renderCategories();
    renderTabs(genre);
    labelCards();
    applyFilters({ animate: false });
    renderCart();
    communitySyncs.forEach((sync) => sync());
    setMenu(nav.classList.contains("is-open"));
    if (qv.open && qvId) openQuickView(qvId);
    $("#year").textContent = new Date().getFullYear();
    track.scrollLeft = 0;
    updateArrows();
  });

  applyFilters({ animate: false });
  renderCart();
  updateArrows();
})();
