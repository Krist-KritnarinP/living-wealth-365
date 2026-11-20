import test from 'node:test';
import assert from 'node:assert/strict';
import { ROUTES } from '../src/constants/routes.js';
import { flyToCart } from '../src/utils/flyToCart.js';

test('ROUTES.PRODUCT_DETAIL generates valid path with ID', () => {
  assert.equal(
    ROUTES.PRODUCT_DETAIL('prod-123'),
    '/earth-energy/product/prod-123'
  );
  assert.equal(ROUTES.PRODUCT_DETAIL(), '/earth-energy/product/:id');
});

test('flyToCart runs safely in headless environment without throwing', () => {
  let completed = false;
  flyToCart({
    sourceEl: null,
    imageUrl: 'https://example.com/stone.jpg',
    targetSelector: '#nav-cart-btn',
    onComplete: () => {
      completed = true;
    },
  });
  assert.equal(completed, true, 'Fallback onComplete should be called when DOM is missing');
});
