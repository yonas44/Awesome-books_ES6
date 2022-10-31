export const Stringifier = (Store) => {
  const updatedBooks = JSON.stringify(Store.books);
  localStorage.setItem('book', updatedBooks);
};

export const displayBook = (Store, bookHolder) => {
  while (bookHolder.hasChildNodes()) {
    bookHolder.removeChild(bookHolder.firstChild);
  }
  if (Store.books.length === 0) {
    const message = document.createElement('tr');
    message.className = 'fs-2 text-center fw-semibold';
    message.innerText = 'Your collection seems to be empty, please add books using the add-new link.';
    bookHolder.appendChild(message);
  } else {
    Store.books.map((book, index) => {
      const singleBook = document.createElement('tr');
      const title = document.createElement('td');
      title.innerText = `"${book.title}" by ${book.author}`;
      const button = document.createElement('td');
      const removeBtn = document.createElement('button');
      removeBtn.addEventListener('click', () => {
        Store.bookRemover(index);
        displayBook(Store, bookHolder);
        Stringifier(Store);
      });
      removeBtn.innerText = 'Remove';
      button.appendChild(removeBtn);
      singleBook.append(title, button);
      bookHolder.appendChild(singleBook);
      return bookHolder;
    });
  }
};

export const sectionSwitch = (val, sections) => {
  sections.forEach((section) => {
    if (section.classList.contains(val)) section.classList.add('on');
    else section.classList.remove('on');
  });
};

export const timeUpdater = () => {
  window.location.reload();
};