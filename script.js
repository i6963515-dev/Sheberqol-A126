const categoryButtons = document.querySelectorAll('.category-chip');
const cards = [...document.querySelectorAll('.product-card')];
const searchInput = document.getElementById('searchInput');
const emptyState = document.getElementById('emptyState');
const cartMessage = document.getElementById('cartMessage');
const contrastBtn = document.getElementById('contrastBtn');
let selectedCategory = 'Барлығы';
let cartCount = 0;

function filterProducts() {
  const query = searchInput.value.trim().toLocaleLowerCase('kk');
  let visibleCount = 0;
  cards.forEach(card => {
    const matchesCategory = selectedCategory === 'Барлығы' || card.dataset.category === selectedCategory;
    const matchesSearch = card.dataset.name.toLocaleLowerCase('kk').includes(query);
    card.hidden = !(matchesCategory && matchesSearch);
    if (!card.hidden) visibleCount++;
  });
  emptyState.hidden = visibleCount !== 0;
}
categoryButtons.forEach(button => button.addEventListener('click', () => {
  selectedCategory = button.dataset.category;
  categoryButtons.forEach(item => item.classList.toggle('active', item === button));
  filterProducts();
}));
searchInput.addEventListener('input', filterProducts);

document.querySelectorAll('.heart-btn').forEach(button => button.addEventListener('click', () => {
  const liked = button.classList.toggle('liked');
  button.textContent = liked ? '♥' : '♡';
  button.setAttribute('aria-pressed', String(liked));
  button.setAttribute('aria-label', liked ? 'Таңдаулылардан алып тастау' : 'Таңдаулыларға қосу');
}));
document.querySelectorAll('.add-btn').forEach(button => button.addEventListener('click', () => {
  cartCount++;
  const name = button.closest('.product-card').dataset.name;
  cartMessage.textContent = `«${name}» себетке қосылды. Себеттегі бұйым саны: ${cartCount}.`;
}));
contrastBtn.addEventListener('click', () => {
  const enabled = document.body.classList.toggle('high-contrast');
  contrastBtn.setAttribute('aria-pressed', String(enabled));
  contrastBtn.textContent = enabled ? '◐ Қалыпты көрініс' : '◐ Контраст';
});
