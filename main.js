'use strict';

const inputItem = document.querySelector('.input__item');
const inputPrice = document.querySelector('.input__price');
const form = document.querySelector('.new-form');
const items = document.querySelector('.items');
const footerBtn = document.querySelector('.footer__button');

function onAdd() {
  const text = inputItem.value;
  const price = inputPrice.value;
  if (text === '') {
    inputItem.focus();
    return;
  } else if (isNaN(price)) {
    inputPrice.value = '';
    inputPrice.focus();
    return;
  }

  const itemRow = createItem(text, price);
  items.appendChild(itemRow);
  itemRow.scrollIntoView({ behavior: 'smooth', block: 'center' });
  inputItem.value = '';
  inputPrice.value = '';
  inputItem.focus();
  inputPrice.focus();
}

let id = 0;
function createItem(item, price) {
  const itemRow = document.createElement('li');
  itemRow.setAttribute('class', 'item__row');
  itemRow.setAttribute('data-id', id);
  itemRow.innerHTML = `
      <div class="item">
        <label class="item__checkbox">
          <input class="checkbox__default" type="checkbox">
          <span class="checkbox__new"></span>
          <span class="item__name">${item}<span>
        </label>
        <div class="wrap__price-delete">
          <span class="item__price">$${price ? price : 0}</span>
          <button class="item__delete" >
            <i class="fa-solid fa-trash-can" data-id=${id}></i>
          </button> 
        </div>
      </div>
      <div class="item__divider"></div>`;
  ++id;
  return itemRow;
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  onAdd();
});

items.addEventListener('click', (event) => {
  let id = event.target.dataset.id;
  if (id) {
    const toBeDeleted = document.querySelector(`.item__row[data-id="${id}"`);
    toBeDeleted.remove();
  }
});

footerBtn.addEventListener('click', () => {
  const toBeDeleted = document.querySelectorAll('.item__row');
  toBeDeleted.forEach((item) => item.remove());
});
