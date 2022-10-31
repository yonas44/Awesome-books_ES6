class Store {
  constructor(title, author) {
    this.title = title;
    this.author = author;
    Store.books.push(this);
  }

  static bookRemover(index) {
    Store.books.splice(index, 1);
  }

  static books = [];
}

export default Store;
