# Real cap photos

Drop product photos here, then point each product at its file in
`src/data/products.js` by adding an `image` field, e.g.:

```js
{
  slug: 'heritage-6-panel',
  name: 'The Heritage 6-Panel',
  image: '/caps/heritage.jpg',   // <-- add this line
  ...
}
```

Suggested filenames (one per colorway):

- heritage.jpg      → The Heritage 6-Panel (Midnight)
- dune.jpg          → Dune Structured (Sand)
- olive.jpg         → Olive Field
- bordeaux.jpg      → Bordeaux Wool
- ivory.jpg         → Ivory Minimal
- slate.jpg         → Slate Performance
- navy.jpg          → Navy Heritage
- camel.jpg         → Camel Suede-Touch

Recommended: square-ish, transparent or white background, ~1000×1000px.
Until a file is added, the product shows the drawn SVG flower-cap automatically.

For the white faceless "robot/model" hero image, save it as
`/caps/model.png` — tell me and I'll wire it into the homepage hero.
```
