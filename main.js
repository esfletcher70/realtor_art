(function () {
  const cfg = window.SITE_CONFIG;
  const { houseSVG, STYLES } = window.Houses;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const money = (n) => `$${n.toLocaleString("en-US")}`;

  // ---- text from config
  $$("[data-bind]").forEach((el) => { const v = cfg[el.dataset.bind]; if (v != null) el.textContent = v; });
  $$("[data-bind-email]").forEach((el) => { el.href = `mailto:${cfg.email}`; el.textContent = cfg.email; });
  document.title = `${cfg.businessName} | ${cfg.tagline}`;

  // ---- portraits
  function renderArt(el) {
    el.innerHTML = houseSVG(el.dataset.house, el.dataset.mode || "watercolor", {
      family: el.dataset.family,
      year: el.dataset.year,
      ariaLabel: el.dataset.label,
    });
  }
  $$("[data-house]").forEach(renderArt);

  // ---- gallery
  const samples = [
    { house: "victorian", family: "The Rivera Family" },
    { house: "eichler", family: "The Chen Family" },
    { house: "craftsman", family: "The Okafor Family" },
    { house: "spanish", family: "The Patel Family" },
    { house: "farmhouse", family: "The Lindqvist Family" },
    { house: "hillside", family: "The Nakamura Family" },
  ];
  const grid = $("#gallery-grid");
  samples.forEach((s) => {
    const st = STYLES[s.house];
    const tile = document.createElement("button");
    tile.type = "button";
    tile.className = "tile";
    tile.setAttribute("aria-label", `View larger: ${st.label}, ${s.family}`);
    tile.innerHTML = `<div class="art" data-house="${s.house}" data-mode="watercolor" data-family="${s.family}" data-year="${cfg.year}"></div>
      <div class="tile-meta"><strong>${st.label}</strong><span>${st.where}</span></div>`;
    renderArt(tile.querySelector(".art"));
    tile.addEventListener("click", () => openLightbox(s, st));
    grid.appendChild(tile);
  });

  const lb = $("#lightbox");
  function openLightbox(s, st) {
    const art = $(".lightbox-art", lb);
    art.innerHTML = `<div class="art" data-house="${s.house}" data-mode="watercolor" data-family="${s.family}" data-year="${cfg.year}"></div>`;
    renderArt(art.firstElementChild);
    $(".lightbox-caption", lb).textContent = `${s.family} · ${st.label}, ${st.where}`;
    if (typeof lb.showModal === "function") lb.showModal(); else lb.setAttribute("open", "");
  }
  $(".lightbox-close", lb).addEventListener("click", () => lb.close());
  lb.addEventListener("click", (e) => { if (e.target === lb) lb.close(); });

  // ---- compare slider
  const compare = $("#compare");
  const range = $("input", compare);
  const setPos = () => compare.style.setProperty("--pos", `${range.value}%`);
  range.addEventListener("input", setPos);
  setPos();

  // ---- nav toggle
  const toggle = $(".nav-toggle");
  const links = $("#nav-links");
  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") !== "true";
    toggle.setAttribute("aria-expanded", String(open));
    links.classList.toggle("open", open);
  });
  links.addEventListener("click", (e) => {
    if (e.target.closest("a")) { toggle.setAttribute("aria-expanded", "false"); links.classList.remove("open"); }
  });

  // ---- pricing cards
  const up = cfg.premiumUpgrade;
  const pricing = $("#pricing-grid");
  cfg.packages.forEach((p) => {
    const card = document.createElement("article");
    card.className = `plan${p.featured ? " featured" : ""}`;
    card.innerHTML = `${p.badge ? `<span class="badge">${p.badge}</span>` : ""}
      <p class="plan-tier">${p.tier}</p>
      <h3>${p.name}</h3>
      <p class="price">${money(p.price)} <small>${p.unit}</small></p>
      <p>${p.blurb}</p>
      <ul>${p.features.map((f) => `<li>${f}</li>`).join("")}</ul>
      ${up && up.appliesTo.includes(p.id) ? `<p class="plan-upsell"><strong>Upgrade:</strong> ${up.name.toLowerCase()} +${money(up.price)}${p.id === "collection" ? " per portrait" : ""}</p>` : ""}
      <a class="btn ${p.featured ? "btn-accent" : "btn-ghost"}" href="#order" data-pick="${p.id}">${p.cta}</a>`;
    pricing.appendChild(card);
  });

  // ---- order form
  const form = $("#order-form");
  const pkgSel = $("#pkg");
  const zip = $("#zip");
  const zipRow = $("#zip-row");
  const zipHint = $("#zip-hint");
  const btn = $("#order-btn");
  const premium = $("#premium");
  const upgradeRow = $("#upgrade-row");
  if (up) $("#upgrade-detail").textContent = up.detail;
  else upgradeRow.hidden = true;
  cfg.packages.forEach((p) => pkgSel.add(new Option(`${p.name} (${p.tier}) · ${money(p.price)}`, p.id)));

  $$("[data-pick]").forEach((a) => a.addEventListener("click", () => { pkgSel.value = a.dataset.pick; update(); }));

  const isLocal = (z) => /^\d{5}$/.test(z) && cfg.localZipPrefixes.includes(z.slice(0, 3));

  function quote() {
    const p = cfg.packages.find((x) => x.id === pkgSel.value);
    const z = zip.value.trim();
    const units = p.id === "collection" ? 5 : 1;
    const canUpgrade = !!up && up.appliesTo.includes(p.id);
    const prem = canUpgrade && premium.checked;
    const L = cfg.paymentLinks;
    const q = { p, z, ready: false, delivery: 0, deliveryText: "—", link: "", note: "", canUpgrade, prem, units, premiumCost: prem ? up.price * units : 0 };
    if (p.delivery === "none") {
      Object.assign(q, { ready: true, deliveryText: "Digital file", link: cfg.paymentLinks.digital });
    } else if (!/^\d{5}$/.test(z)) {
      q.note = "Bay Area addresses get free hand-delivery.";
    } else if (isLocal(z)) {
      Object.assign(q, { ready: true, deliveryText: "Free hand-delivery", link: p.id === "collection" ? (prem ? L.collectionPremium : L.collection) : (prem ? L.framedPremiumLocal : L.framedLocal), note: "ok:Good news: that ZIP gets free hand-delivery." });
    } else if (p.delivery === "local-or-ship") {
      Object.assign(q, { ready: true, delivery: cfg.shippingFee, deliveryText: money(cfg.shippingFee) + " shipping", link: prem ? L.framedPremiumShipped : L.framedShipped, note: `warn:Outside our delivery area, so we'll ship it for a flat ${money(cfg.shippingFee)}.` });
    } else {
      Object.assign(q, { ready: true, deliveryText: "Shipping quoted", link: "", note: "warn:Collections outside the Bay Area: we'll email you a shipping quote." });
    }
    return q;
  }

  function update() {
    const q = quote();
    zipRow.hidden = q.p.delivery === "none";
    $("#t-base").textContent = money(q.p.price);
    $("#t-delivery").textContent = q.deliveryText;
    upgradeRow.hidden = !q.canUpgrade;
    if (q.canUpgrade) $("#upgrade-title").textContent = `Add ${up.name.toLowerCase()} (+${money(up.price * q.units)}${q.units > 1 ? `, ${money(up.price)} each` : ""})`;
    $("#t-premium-row").hidden = !q.prem;
    $("#t-premium").textContent = money(q.premiumCost);
    $("#t-total").textContent = money(q.p.price + q.premiumCost + q.delivery);
    const [kind, msg] = q.note.includes(":") ? q.note.split(/:(.+)/) : ["", q.note];
    zipHint.textContent = msg || "Bay Area addresses get free hand-delivery.";
    zipHint.className = `hint ${kind}`;
    btn.disabled = !q.ready;
    btn.textContent = !q.ready ? "Enter your delivery ZIP to continue" : q.link ? "Continue to secure checkout" : "Request this order by email";
  }

  pkgSel.addEventListener("change", update);
  premium.addEventListener("change", update);
  zip.addEventListener("input", () => { zip.value = zip.value.replace(/\D/g, "").slice(0, 5); update(); });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const q = quote();
    if (!q.ready) { zip.focus(); return; }
    if (q.link) { window.location.href = q.link; return; }
    const subject = `Portrait order: ${q.p.name}`;
    const body = [
      `Package: ${q.p.name} (${money(q.p.price)})`,
      q.prem ? `Premium finish: yes (+${money(q.premiumCost)})` : null,
      q.p.delivery !== "none" ? `Delivery ZIP: ${q.z} (${q.deliveryText})` : null,
      "",
      "Home address:",
      "Family name + move-in year (for the signature):",
      "Deliver to (my office / client's door):",
      "Your name, brokerage, and phone:",
      "",
      "Please attach 1-2 photos of the front of the home.",
    ].filter((l) => l !== null).join("\n");
    window.location.href = `mailto:${cfg.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });

  pkgSel.value = (cfg.packages.find((p) => p.featured) || cfg.packages[0]).id;
  update();
})();
