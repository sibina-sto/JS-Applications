import * as api from "./api.js";

const endpoints = {
  allBooks: "/jsonstore/collections/books",
  createBook: "/jsonstore/collections/books",
  updateBook: "/jsonstore/collections/books/",
  deleteBook: "/jsonstore/collections/books/",
};

export async function getAllBooks() {
  return api.get(endpoints.allBooks);
}

export async function createBook(book) {
  return api.post(endpoints.createBook, book);
}

export async function editBook(book) {
  return api.put(endpoints.updateBook + book.id, book);
}

export async function deleteBook(id) {
  return api.del(endpoints.deleteBook + id);
}
