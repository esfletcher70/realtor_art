/*
  Site settings: edit this file to change the business name, contact info,
  prices, Stripe links and the local delivery area. No build step needed.
*/
window.SITE_CONFIG = {
  businessName: "Threshold Portraits",
  shortName: "Threshold",
  tagline: "Watercolor home portraits for Bay Area agents",
  email: "hello@thresholdportraits.com", // placeholder: replace with your real inbox
  phone: "", // optional, e.g. "(415) 555-0100"
  year: new Date().getFullYear(),

  // Stripe Payment Links (Stripe Dashboard -> Payment Links -> New).
  // Create one link per entry. Leave a link empty and the order button
  // falls back to a pre-filled email instead of checkout.
  paymentLinks: {
    digital: "",
    framedLocal: "",    // framed, hand-delivered in the Bay Area
    framedShipped: "",  // framed, shipped outside the delivery area (+ shipping)
    collection: "",     // 5 framed, hand-delivered
  },

  shippingFee: 40,

  // ZIP codes starting with these 3 digits get free hand-delivery.
  // Covers the nine Bay Area counties (plus a little spillover at the edges).
  localZipPrefixes: ["940", "941", "943", "944", "945", "946", "947", "948", "949", "950", "951", "954"],

  packages: [
    {
      id: "digital",
      tier: "Digital",
      name: "The Print File",
      price: 69,
      unit: "per home",
      blurb: "A high-resolution watercolor file in 48 hours. Good for a closing that's tomorrow.",
      features: ["Print-ready file, sized up to 16×20", "Proof within 48 hours", "Print it anywhere, any size"],
      delivery: "none",
      cta: "Choose digital",
    },
    {
      id: "framed",
      tier: "Framed keepsake",
      name: "The Threshold",
      price: 229,
      unit: "per home",
      featured: true,
      badge: "Most popular",
      blurb: "Printed on archival fine-art paper, matted, framed, and hand-delivered ready to hang.",
      features: ["16×20 frame with an 11×14 mat", "Your logo on the back + a handwritten card", "Free hand-delivery in the nine Bay Area counties"],
      delivery: "local-or-ship",
      cta: "Choose framed",
    },
    {
      id: "collection",
      tier: "For your pipeline",
      name: "The Collection",
      price: 999,
      unit: "for 5 homes",
      blurb: "Five framed portraits saved for your next closings, so you always have a gift ready.",
      features: ["Five framed keepsakes ($200 each)", "Priority 48-hour proofs", "Use them any time in 12 months"],
      delivery: "local",
      cta: "Reserve a collection",
    },
  ],
};
