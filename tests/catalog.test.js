// The product catalogue — run with `node --test`.
import test from "node:test";
import assert from "node:assert/strict";
import { products, sizes, colorways, getProduct } from "../src/data/products.js";

test("every product has what the shop and the cart need", () => {
  for (const p of products) {
    assert.match(p.slug, /^[a-z0-9-]+$/, `slug ${p.slug}`);
    assert.ok(p.name && p.color && p.blurb && p.description, `text for ${p.slug}`);
    assert.ok(Number.isFinite(p.price) && p.price > 0, `price for ${p.slug}`);
    assert.match(p.crown, /^#[0-9a-f]{6}$/i, `crown colour for ${p.slug}`);
    assert.match(p.accent, /^#[0-9a-f]{6}$/i, `accent colour for ${p.slug}`);
    assert.ok(Array.isArray(p.materials) && p.materials.length > 0, `materials for ${p.slug}`);
  }
});

test("slugs are unique, so every product page resolves", () => {
  const slugs = products.map((p) => p.slug);
  assert.equal(new Set(slugs).size, slugs.length);
  for (const s of slugs) assert.equal(getProduct(s).slug, s);
  assert.equal(getProduct("no-such-cap"), undefined);
});

test("colorways follow the catalogue", () => {
  assert.deepEqual(colorways.map((c) => c.slug), products.map((p) => p.slug));
});

test("there is at least one size", () => {
  assert.ok(sizes.length > 0);
});
