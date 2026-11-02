/*
  Placeholder portraits drawn in SVG.
  Six Bay Area house styles, each rendered two ways:
    - "photo":      flat, crisp, like a snapshot
    - "watercolor": wobbly washes, ink linework, paper grain, ragged edges
  Replace these with real portraits once you have them (see README).
*/
(function () {
  const GROUND = 340;

  // shape helpers: {t: tag, a: attributes, noInk: skip ink outline}
  const R = (x, y, width, height, fill, extra = {}) => ({ t: "rect", a: { x, y, width, height, fill, ...extra } });
  const P = (points, fill, extra = {}) => ({ t: "polygon", a: { points, fill, ...extra } });
  const D = (d, fill, extra = {}) => ({ t: "path", a: { d, fill, ...extra } });
  const C = (cx, cy, r, fill, extra = {}) => ({ t: "circle", a: { cx, cy, r, fill, ...extra } });
  const E = (cx, cy, rx, ry, fill, extra = {}) => ({ t: "ellipse", a: { cx, cy, rx, ry, fill, ...extra } });
  const L = (x1, y1, x2, y2, stroke, w = 1.5) => ({ t: "line", a: { x1, y1, x2, y2, stroke, "stroke-width": w }, line: true });
  const soft = (s) => ({ ...s, noInk: true });

  const roundTree = (cx, h, r, leaf, trunk = "#6b5440") => [
    R(cx - 4, GROUND - h, 8, h, trunk),
    C(cx - r * 0.55, GROUND - h - r * 0.1, r * 0.75, leaf),
    C(cx + r * 0.5, GROUND - h, r * 0.7, leaf),
    C(cx, GROUND - h - r * 0.6, r * 0.85, leaf),
  ];
  const redwood = (cx, h, w, leaf) => [
    R(cx - 3, GROUND - 20, 6, 20, "#5a3f2e"),
    P(`${cx - w},${GROUND - 15} ${cx},${GROUND - h} ${cx + w},${GROUND - 15}`, leaf),
    P(`${cx - w * 0.8},${GROUND - h * 0.45} ${cx},${GROUND - h * 1.05} ${cx + w * 0.8},${GROUND - h * 0.45}`, leaf),
  ];
  const shrub = (cx, w, h, fill) => [E(cx, GROUND - h / 2 + 4, w / 2, h / 2, fill)];
  const windowPane = (x, y, w, h, frame, glass, mull = true) => {
    const s = [R(x, y, w, h, frame), R(x + 4, y + 4, w - 8, h - 8, glass)];
    if (mull) s.push(L(x + w / 2, y + 4, x + w / 2, y + h - 4, frame, 2.5), L(x + 4, y + h / 2, x + w - 4, y + h / 2, frame, 2.5));
    return s;
  };

  const STYLES = {
    victorian: {
      label: "Victorian",
      where: "San Francisco",
      sky: "#a9c8de",
      lawn: "#7f9b63",
      door: 362,
      shapes: () => {
        const body = "#7fa7b8", trim = "#f3ede0", roof = "#4e5a66", door = "#8e3b46", glass = "#36495a", gold = "#e3b657";
        return [
          // neighbors
          R(96, 168, 112, 172, "#d9c7a3"), R(104, 160, 104, 10, "#efe6d4"),
          ...windowPane(122, 190, 30, 56, "#efe6d4", glass, false), ...windowPane(162, 190, 30, 56, "#efe6d4", glass, false),
          ...windowPane(130, 268, 54, 46, "#efe6d4", glass, false),
          R(392, 152, 112, 188, "#b9c9a8"), R(392, 144, 112, 10, "#efe6d4"),
          ...windowPane(410, 176, 32, 58, "#efe6d4", glass, false), ...windowPane(454, 176, 32, 58, "#efe6d4", glass, false),
          ...windowPane(420, 262, 60, 50, "#efe6d4", glass, false),
          // main house
          R(208, 140, 184, 200, body),
          P("196,146 300,50 404,146", body),
          P("196,146 300,50 404,146 390,146 300,64 210,146", trim),
          D("M282 128 V104 A18 18 0 0 1 318 104 V128 Z", trim),
          D("M288 124 V106 A12 12 0 0 1 312 106 V124 Z", glass),
          R(200, 140, 200, 10, trim),
          C(300, 82, 5, gold),
          // bay window (upper)
          R(220, 162, 98, 90, trim),
          ...windowPane(228, 172, 24, 62, trim, glass, false),
          ...windowPane(257, 172, 24, 62, trim, glass, false),
          ...windowPane(286, 172, 24, 62, trim, glass, false),
          R(216, 156, 106, 8, gold),
          ...windowPane(338, 170, 36, 64, trim, glass),
          R(204, 252, 192, 10, trim),
          // lower level
          R(208, 262, 184, 78, "#6f94a5"),
          ...windowPane(226, 274, 92, 46, trim, glass, false),
          L(256, 278, 256, 316, trim, 2), L(288, 278, 288, 316, trim, 2),
          R(340, 266, 44, 66, trim), R(346, 272, 32, 60, door), C(372, 304, 2.5, gold),
          R(336, 332, 52, 4, trim), R(330, 336, 64, 4, trim),
          // brackets
          P("214,150 224,150 214,160", trim), P("386,150 376,150 386,160", trim),
          ...shrub(220, 34, 16, "#5f7f4a"), ...shrub(318, 30, 14, "#6b8a52"),
        ];
      },
    },

    eichler: {
      label: "Eichler",
      where: "Peninsula & South Bay",
      sky: "#b5d3e6",
      lawn: "#8aa66b",
      door: 277,
      shapes: () => {
        const wood = "#cdb48a", wood2 = "#b99e72", roof = "#3a3f44", glass = "#2f3d45", orange = "#e07b39", post = "#4a4f55";
        const slats = [];
        for (let x = 112; x <= 240; x += 12) slats.push(L(x, 246, x, 336, wood2, 2));
        return [
          ...roundTree(520, 70, 40, "#7a9a5c"),
          R(100, 234, 400, 106, "#e6dccb"),
          R(104, 242, 146, 98, wood),
          ...slats,
          R(258, 262, 36, 78, orange), C(286, 302, 2.5, "#3a3f44"),
          R(300, 246, 192, 94, glass),
          L(348, 246, 348, 340, post, 3), L(396, 246, 396, 340, post, 3), L(444, 246, 444, 340, post, 3),
          L(300, 290, 492, 290, post, 1.5),
          R(250, 238, 6, 102, post), R(494, 238, 6, 102, post),
          P("66,226 534,204 534,220 66,242", roof),
          // agaves + gravel planter
          soft(R(300, 330, 190, 10, "#c9c3b6")),
          P("320,332 326,312 330,332", "#6f8f7a"), P("326,332 336,316 338,332", "#6f8f7a"), P("332,332 340,308 344,332", "#6f8f7a"),
          P("430,332 436,314 440,332", "#6f8f7a"), P("436,332 446,318 448,332", "#6f8f7a"),
          ...shrub(80, 40, 18, "#6b8a52"),
        ];
      },
    },

    craftsman: {
      label: "Craftsman bungalow",
      where: "Berkeley & Oakland",
      sky: "#b0cde0",
      lawn: "#7c9860",
      door: 300,
      shapes: () => {
        const body = "#8c9a6e", body2 = "#7a885e", trim = "#efe6d2", roof = "#5a4636", stone = "#8b8178", door = "#6b4226", glass = "#33424c";
        const shingles = [];
        for (let y = 140; y <= 186; y += 9) shingles.push(L(300 - (y - 122) * 1.9, y, 300 + (y - 122) * 1.9, y, body, 1.2));
        return [
          ...roundTree(74, 80, 42, "#6e8f52"),
          R(138, 192, 324, 148, body),
          P("104,200 300,104 496,200", roof),
          P("164,192 300,124 436,192", body2),
          ...shingles,
          ...windowPane(278, 148, 44, 28, trim, glass, false),
          R(132, 192, 336, 8, trim),
          // porch roof
          P("166,252 300,204 434,252", roof),
          R(170, 250, 260, 10, trim),
          // windows + door
          ...windowPane(222, 272, 48, 42, trim, glass),
          ...windowPane(330, 272, 48, 42, trim, glass),
          R(280, 266, 40, 74, trim), R(285, 271, 30, 69, door),
          ...windowPane(289, 276, 22, 16, door, glass, false),
          // tapered columns on stone piers
          P("186,260 200,260 204,302 182,302", trim), R(176, 302, 34, 38, stone),
          P("400,260 414,260 418,302 396,302", trim), R(390, 302, 34, 38, stone),
          R(270, 336, 60, 4, stone),
          ...shrub(236, 36, 16, "#5f7f4a"), ...shrub(364, 36, 16, "#5f7f4a"),
        ];
      },
    },

    spanish: {
      label: "Spanish Revival",
      where: "Peninsula & Marin",
      sky: "#aecfe3",
      lawn: "#86a066",
      door: 445,
      shapes: () => {
        const stucco = "#f1e6d3", stucco2 = "#e6d7bf", tile = "#b5532f", tile2 = "#9c4426", iron = "#3d2f27", door = "#6e3b2a", glass = "#3a4954", green = "#3f6f5a";
        const tiles = [];
        for (let x = 166; x <= 384; x += 14) tiles.push(L(x, 174, x - 4, 204, tile2, 1.5));
        return [
          E(92, 250, 16, 92, "#3f5b3a"), R(89, 330, 6, 10, "#5a3f2e"),
          R(120, 200, 290, 140, stucco),
          P("106,206 150,170 384,170 426,206", tile),
          ...tiles,
          R(398, 146, 94, 194, stucco2),
          P("388,152 445,110 502,152", tile),
          // arched window with iron grille
          D("M170 326 V266 A36 36 0 0 1 242 266 V326 Z", iron),
          D("M175 326 V267 A31 31 0 0 1 237 267 V326 Z", glass),
          L(206, 236, 206, 326, iron, 2), L(175, 290, 237, 290, iron, 2),
          // shuttered window
          ...windowPane(284, 230, 46, 56, iron, glass),
          R(266, 230, 16, 56, green), R(332, 230, 16, 56, green),
          // tower window + arched door
          D("M432 196 V182 A13 13 0 0 1 458 182 V196 Z", glass),
          D("M423 340 V282 A22 22 0 0 1 467 282 V340 Z", door),
          C(458, 312, 2.5, "#d9b45a"),
          // bougainvillea
          C(400, 200, 13, "#c2417a"), C(412, 216, 11, "#d24f89"), C(394, 222, 10, "#b8396f"), C(406, 236, 8, "#c2417a"),
          ...shrub(300, 70, 16, "#6b8a52"),
        ];
      },
    },

    farmhouse: {
      label: "Modern farmhouse",
      where: "Tri-Valley & North Bay",
      sky: "#b3d0e2",
      lawn: "#89a468",
      door: 441,
      shapes: () => {
        const white = "#f4f2ec", roof = "#2b2e33", frame = "#2b2e33", pane = "#7f939f", wood = "#9b6b43";
        const battens = [];
        for (let x = 164; x <= 360; x += 14) battens.push(L(x, 196, x, 336, "#dedad0", 1.5));
        return [
          ...roundTree(80, 60, 36, "#9aa88a", "#6b5e50"),
          P("136,198 260,90 384,198", roof),
          P("150,196 260,104 370,196", white),
          R(150, 190, 220, 150, white),
          ...battens,
          ...windowPane(244, 126, 32, 44, frame, pane),
          ...windowPane(178, 220, 48, 70, frame, pane),
          ...windowPane(276, 220, 70, 104, frame, pane),
          P("360,246 441,196 534,246", roof),
          P("370,244 441,206 524,244", white),
          R(370, 240, 154, 100, white),
          R(424, 270, 34, 70, wood),
          C(468, 286, 4, "#e8c46a"),
          ...windowPane(386, 268, 28, 44, frame, pane, false), ...windowPane(474, 268, 36, 44, frame, pane),
          R(416, 336, 50, 4, "#c9c3b6"),
          ...shrub(210, 60, 18, "#6b8a52"), ...shrub(500, 36, 16, "#6b8a52"),
        ];
      },
    },

    hillside: {
      label: "Hillside modern",
      where: "Oakland Hills & Marin",
      sky: "#b7d2e4",
      lawn: "#7f9a5e",
      door: 300,
      hills: true,
      shapes: () => {
        const cedar = "#a9774f", cedar2 = "#93653f", light = "#e9e4da", roof = "#3a3f44", glass = "#33434d", deck = "#6b5a48";
        const boards = [];
        for (let y = 182; y <= 244; y += 8) boards.push(L(230, y, 248, y, cedar2, 1.2), L(452, y, 470, y, cedar2, 1.2));
        return [
          ...redwood(70, 190, 34, "#3f5e45"), ...redwood(112, 150, 28, "#4b6b4f"), ...redwood(540, 170, 30, "#3f5e45"),
          R(160, 250, 220, 90, light),
          R(230, 172, 240, 78, cedar),
          ...boards,
          R(220, 162, 262, 10, roof),
          R(250, 182, 200, 52, glass),
          L(300, 182, 300, 234, roof, 2), L(350, 182, 350, 234, roof, 2), L(400, 182, 400, 234, roof, 2),
          R(178, 266, 96, 56, glass), L(226, 266, 226, 322, roof, 2),
          R(286, 270, 30, 70, deck),
          R(380, 250, 92, 4, deck), L(388, 254, 388, 340, deck, 3), L(464, 254, 464, 340, deck, 3),
          L(380, 236, 472, 236, deck, 2), L(392, 236, 392, 250, deck, 1.5), L(412, 236, 412, 250, deck, 1.5), L(432, 236, 432, 250, deck, 1.5), L(452, 236, 452, 250, deck, 1.5),
          ...shrub(340, 50, 18, "#6b8a52"),
        ];
      },
    },
  };

  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const attrs = (a) => Object.entries(a).map(([k, v]) => `${k}="${esc(v)}"`).join(" ");
  const draw = (s, override = {}) => `<${s.t} ${attrs({ ...s.a, ...override })}/>`;

  let counter = 0;

  function houseSVG(styleKey, mode = "watercolor", opts = {}) {
    const style = STYLES[styleKey];
    const id = `h${++counter}`;
    const seed = opts.seed ?? (Object.keys(STYLES).indexOf(styleKey) + 3);
    const shapes = style.shapes();
    const label = opts.ariaLabel || `${style.label} home, ${mode === "photo" ? "photo" : "watercolor portrait"}`;
    const doorX = style.door;
    const path = `${doorX - 14},${GROUND} ${doorX + 14},${GROUND} ${doorX + 40},420 ${doorX - 40},420`;
    const hills = style.hills ? `<polygon points="0,300 140,240 330,262 600,212 600,340 0,340" fill="#a7b993"/>` : "";

    if (mode === "photo") {
      return `<svg viewBox="0 0 600 420" role="img" aria-label="${esc(label)}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
        <defs><linearGradient id="${id}-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${style.sky}"/><stop offset="1" stop-color="#eef4f7"/></linearGradient>
        <linearGradient id="${id}-shade" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity=".08"/><stop offset="1" stop-color="#000" stop-opacity=".12"/></linearGradient></defs>
        <rect width="600" height="420" fill="url(#${id}-sky)"/>
        ${hills}
        <rect y="${GROUND}" width="600" height="80" fill="${style.lawn}"/>
        <rect y="392" width="600" height="28" fill="#cfcac0"/>
        <polygon points="${path}" fill="#d8d2c6"/>
        <g stroke="rgba(0,0,0,.18)" stroke-width=".8">${shapes.map((s) => draw(s)).join("")}</g>
        <rect width="600" height="420" fill="url(#${id}-shade)"/>
      </svg>`;
    }

    // watercolor
    const fillPass = shapes
      .map((s) => (s.line ? draw(s, { "stroke-opacity": 0.7 }) : draw(s, { "fill-opacity": 0.9, stroke: s.a.fill, "stroke-width": 2.5, "stroke-opacity": 0.55 })))
      .join("");
    const inkPass = shapes
      .filter((s) => !s.noInk)
      .map((s) => draw(s, { fill: "none", stroke: "#3d3229", "stroke-width": s.line ? 0.9 : 1.1, "stroke-opacity": 0.7 }))
      .join("");
    const signature = opts.family
      ? `<text x="570" y="404" text-anchor="end" font-family="Caveat, 'Segoe Script', cursive" font-size="22" fill="#4a3b2f" fill-opacity=".85">${esc(opts.family)}${opts.year ? ` · Est. ${esc(opts.year)}` : ""}</text>`
      : "";

    return `<svg viewBox="0 0 600 420" role="img" aria-label="${esc(label)}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <defs>
        <filter id="${id}-wc" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="3" seed="${seed}" result="n"/>
          <feDisplacementMap in="SourceGraphic" in2="n" scale="7" xChannelSelector="R" yChannelSelector="G" result="d"/>
          <feGaussianBlur in="d" stdDeviation="0.7"/>
        </filter>
        <filter id="${id}-ink" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.06" numOctaves="2" seed="${seed + 7}" result="n"/>
          <feDisplacementMap in="SourceGraphic" in2="n" scale="2.5" xChannelSelector="R" yChannelSelector="G"/>
        </filter>
        <filter id="${id}-wash" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="3" seed="${seed + 2}" result="n"/>
          <feDisplacementMap in="SourceGraphic" in2="n" scale="60" xChannelSelector="R" yChannelSelector="G" result="d"/>
          <feGaussianBlur in="d" stdDeviation="6"/>
        </filter>
        <filter id="${id}-paper">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" seed="${seed}" stitchTiles="stitch"/>
          <feColorMatrix type="matrix" values="0 0 0 0 .42  0 0 0 0 .36  0 0 0 0 .3  0 0 0 .12 0"/>
        </filter>
        <filter id="${id}-edge" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="3" seed="${seed + 4}" result="n"/>
          <feDisplacementMap in="SourceGraphic" in2="n" scale="45" xChannelSelector="R" yChannelSelector="G" result="d"/>
          <feGaussianBlur in="d" stdDeviation="5"/>
        </filter>
        <mask id="${id}-mask"><rect x="38" y="30" width="524" height="370" rx="40" fill="#fff" filter="url(#${id}-edge)"/></mask>
      </defs>
      <rect width="600" height="420" fill="#f8f4ec"/>
      <g mask="url(#${id}-mask)">
        <ellipse cx="300" cy="150" rx="300" ry="150" fill="${style.sky}" fill-opacity=".45" filter="url(#${id}-wash)"/>
        ${style.hills ? `<g filter="url(#${id}-wash)" opacity=".7">${hills}</g>` : ""}
        <ellipse cx="300" cy="372" rx="290" ry="44" fill="${style.lawn}" fill-opacity=".55" filter="url(#${id}-wash)"/>
        <polygon points="${path}" fill="#d8d0c0" fill-opacity=".55" filter="url(#${id}-wc)"/>
        <g filter="url(#${id}-wc)" style="mix-blend-mode:multiply">${fillPass}</g>
        <g filter="url(#${id}-ink)">${inkPass}</g>
      </g>
      <rect width="600" height="420" filter="url(#${id}-paper)"/>
      ${signature}
    </svg>`;
  }

  window.Houses = { STYLES, houseSVG };
})();
