const VARIANTS = ['neutral', 'info', 'success', 'warning'];

const FIXED_MAP = {
  Electronics: 'info',
  Furniture: 'warning',
  Accessories: 'neutral',
  Audio: 'info',
  Storage: 'neutral',
  Networking: 'info',
  'Smart Home': 'success',
  Lighting: 'warning',
  Appliances: 'neutral',
  Kitchen: 'warning',
  Gaming: 'success',
  Fitness: 'success',
};

function hashTo(input, modulus) {
  let h = 0;
  for (let i = 0; i < input.length; i++) {
    h = (h * 31 + input.charCodeAt(i)) & 0xffffffff;
  }
  return Math.abs(h) % modulus;
}

export function variantForCategory(category) {
  if (!category) return 'neutral';
  return FIXED_MAP[category] ?? VARIANTS[hashTo(category, VARIANTS.length)];
}
