export function addBagItem(slug: string, size: string, quantity = 1) {
  const stored = JSON.parse(localStorage.getItem('little-penguin-bag') || '[]')
  const bag = Array.isArray(stored) ? stored : []
  for (let i = 0; i < quantity; i++) bag.push({ slug, size, key: `${Date.now()}-${i}-${Math.random()}` })
  localStorage.setItem('little-penguin-bag', JSON.stringify(bag))
  window.dispatchEvent(new Event('bag-updated'))
}
