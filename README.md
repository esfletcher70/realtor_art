# Threshold Portraits

Website for a Bay Area closing-gift service: AI-made watercolor portraits of a client's new home, framed and hand-delivered for real estate agents.

It's a plain static site (HTML, CSS, JavaScript) with no build step. Open `index.html` in a browser to see it.

## Files

| File | What it is |
| --- | --- |
| `index.html` | Page content and copy |
| `config.js` | **Edit this first:** business name, email, prices, Stripe links, delivery ZIP codes |
| `styles.css` | Colors, fonts, layout |
| `houses.js` | Placeholder portraits: six Bay Area house styles drawn in code (photo + watercolor versions) |
| `main.js` | Gallery, before/after slider, pricing cards, order form |
| `favicon.svg` | Browser tab icon |

## Before launch

1. **Name and email:** set `businessName`, `shortName`, `tagline` and `email` in `config.js`. The name also appears in `index.html` (title, meta tags) as a fallback; search and replace it there too.
2. **Stripe checkout:** in the Stripe Dashboard, create a Payment Link for each package and paste the URLs into `paymentLinks` in `config.js`:
   - `digital`: $69 digital file
   - `framedLocal`: $229 framed, hand-delivered (collect the shipping address in the link)
   - `framedShipped`: $269 framed + $40 shipping
   - `collection`: $999 for 5
   Turn on Stripe Tax for the framed products (California sales tax). Until a link is set, that button opens a pre-filled email instead.
3. **Real portraits:** the gallery, hero and slider use code-drawn sample houses. Once you have real portraits, swap them in. The easiest way is to replace a `<div class="art" data-house=...>` with `<div class="art"><img src="portraits/rivera.jpg" alt="..."></div>`, and change the `samples` list in `main.js` the same way.
4. **Photo rights:** only use photos you or the homeowner took, or listing photos with the photographer's OK (see the FAQ on the page).

## Publish (free) with GitHub Pages

Repo **Settings → Pages → Build and deployment → Deploy from a branch → `main` / root**. The site goes live at `https://<user>.github.io/realtor_art/`. You can add a custom domain on the same page.
