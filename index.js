/* eslint-disable no-unused-vars */
import Store from './modules/bookStore.js';
import {
  displayBook,
  Stringifier,
  sectionSwitch,
  timeUpdater,
} from './modules/methods.js';
import { DateTime } from './modules/luxon.js';

// Update books object from local storage

let oldBooks = localStorage.getItem('book');
if (oldBooks !== null) {
  oldBooks = JSON.parse(oldBooks);
  Store.books = oldBooks;
}

// Dynamically render the books

const title = document.querySelector('#title');
const author = document.querySelector('#author');
const form = document.querySelector('#form');
const bookHolder = document.querySelector('.book-holder');

displayBook(Store, bookHolder);

// Event listener for the book-adder form

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const book = new Store(title.value, author.value);
  displayBook(Store, bookHolder);
  Stringifier(Store);
  title.value = '';
  author.value = '';
});

// Add navigation

const time = document.querySelector('#time');
time.innerText = DateTime.now('2022-10-31T16:23:12').toLocaleString(DateTime.DATETIME_MED);
setInterval(timeUpdater, 60000);
const links = document.querySelectorAll('.links');
const sections = document.querySelectorAll('.section');
links.forEach((link) => {
  link.addEventListener('click', (event) => {
    const val = event.target.id;
    sectionSwitch(val, sections);
  });
});

window.addEventListener('hashchange', () => {
  const { hash } = window.location;
  if (hash === '#table') {
    sectionSwitch('table-holder', sections);
  } else if (hash === '#form') {
    sectionSwitch('form-section', sections);
  } else if (hash === '#contacts') {
    sectionSwitch('contacts-section', sections);
  }
});
