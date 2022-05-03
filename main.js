'use strict';

const inputItem = document.querySelector('.input__item');
const inputPrice = document.querySelector('.input__price');
const form = document.querySelector('.new-form');
const items = document.querySelector('.items');
const footerBtn = document.querySelector('.footer__button');
const totalPrice = document.querySelector('.footer-price');

let total = 0;
let id = 0;

function onAdd() {
  const text = inputItem.value;
  const price = Number(inputPrice.value);

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

  total += price;
  displayTotal(total);
}

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
          <span class="item__price" data-id=${id}>$${
    price ? Number(price).toLocaleString() : 0
  }</span>
          <button class="item__delete" >
            <i class="fa-solid fa-trash-can" data-id=${id}></i>
          </button> 
        </div>
      </div>
      <div class="item__divider"></div>`;
  ++id;
  return itemRow;
}

function displayTotal(total) {
  const totalWithComma = Number(total).toLocaleString();
  totalPrice.textContent = `${totalWithComma}`;
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  onAdd();
});

items.addEventListener('click', (event) => {
  let id = event.target.dataset.id;
  if (id) {
    const inputedPrice = document.querySelector(`.item__price[data-id="${id}"`)
      .innerHTML;
    const regex = /[^$,]/gm;
    const toBeRemovePrice = inputedPrice.match(regex);
    total -= Number(toBeRemovePrice.join(''));

    const toBeDeleted = document.querySelector(`.item__row[data-id="${id}"`);
    toBeDeleted.remove();
  }

  displayTotal(total);
});

footerBtn.addEventListener('click', () => {
  const toBeDeleted = document.querySelectorAll('.item__row');
  toBeDeleted.forEach((item) => item.remove());

  total = 0;
  displayTotal(total);
});
