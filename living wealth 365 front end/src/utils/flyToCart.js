/**
 * 🛒 Fly-to-Cart Warp Animation Utility
 * Creates an animated particle of the product that flies along a natural arc
 * from the trigger element into the Navbar shopping cart button (#nav-cart-btn).
 */
export function flyToCart({
  sourceEl,
  imageUrl,
  targetSelector = '#nav-cart-btn',
  onComplete,
} = {}) {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    if (typeof onComplete === 'function') onComplete();
    return;
  }

  const targetEl = document.querySelector(targetSelector);
  if (!targetEl || !sourceEl) {
    if (typeof onComplete === 'function') onComplete();
    return;
  }

  const sourceRect = sourceEl.getBoundingClientRect();
  const targetRect = targetEl.getBoundingClientRect();

  // Create flying avatar / particle
  const flying = document.createElement('div');
  flying.className =
    'fixed pointer-events-none rounded-full overflow-hidden shadow-2xl z-[99999] border-2 border-secondary bg-white flex items-center justify-center';
  flying.style.width = '48px';
  flying.style.height = '48px';
  flying.style.left = `${sourceRect.left + sourceRect.width / 2 - 24}px`;
  flying.style.top = `${sourceRect.top + sourceRect.height / 2 - 24}px`;
  flying.style.boxShadow = '0 10px 30px rgba(255, 181, 59, 0.45), 0 4px 12px rgba(2, 62, 141, 0.35)';
  flying.style.willChange = 'transform, opacity';

  if (imageUrl) {
    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = 'Flying product';
    img.className = 'w-full h-full object-cover rounded-full';
    flying.appendChild(img);
  } else {
    flying.innerHTML = '<span class="text-xl">💎</span>';
  }

  document.body.appendChild(flying);

  const deltaX =
    targetRect.left + targetRect.width / 2 - (sourceRect.left + sourceRect.width / 2);
  const deltaY =
    targetRect.top + targetRect.height / 2 - (sourceRect.top + sourceRect.height / 2);

  // Smooth arc trajectory with scaling & warping
  const keyframes = [
    {
      transform: 'translate(0px, 0px) scale(1) rotate(0deg)',
      opacity: 1,
    },
    {
      transform: `translate(${deltaX * 0.35}px, ${deltaY * 0.15 - 45}px) scale(0.9) rotate(35deg)`,
      opacity: 0.95,
      offset: 0.35,
    },
    {
      transform: `translate(${deltaX * 0.72}px, ${deltaY * 0.65 - 15}px) scale(0.55) rotate(130deg)`,
      opacity: 0.85,
      offset: 0.72,
    },
    {
      transform: `translate(${deltaX}px, ${deltaY}px) scale(0.12) rotate(240deg)`,
      opacity: 0.1,
    },
  ];

  try {
    const animation = flying.animate(keyframes, {
      duration: 650,
      easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
      fill: 'forwards',
    });

    const finishHandler = () => {
      flying.remove();

      // Trigger energetic pop & gold pulse on navbar cart button
      targetEl.classList.remove('animate-cart-pulse');
      void targetEl.offsetWidth; // force reflow
      targetEl.classList.add('animate-cart-pulse');
      setTimeout(() => {
        targetEl.classList.remove('animate-cart-pulse');
      }, 600);

      if (typeof onComplete === 'function') onComplete();
    };

    animation.onfinish = finishHandler;
    animation.onerror = finishHandler;
  } catch {
    flying.remove();
    if (typeof onComplete === 'function') onComplete();
  }
}
