import booksRepository from "../Books/BooksRepository";

export default class StatsPresenter {
  load = async (callback) => {
    await booksRepository.getLastAddedBook(callback);
  };

  getBookCount = async (callback) => {
    return await booksRepository.getBookCount((bookCount) => {
      callback(bookCount);
    });
  };
}
