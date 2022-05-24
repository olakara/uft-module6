import httpGateway from "../Shared/HttpGateway";
import Observable from "../Shared/Observable";
import BookListPresenter from "../Books/BookListPresenter";
import GetPublicBookStub from "./GetPublicBooksStub";
import booksRepository from "../Books/BooksRepository";
import AddBooksPresenter from "../Books/AddBooksPresenter";

export default class BookAdderTestHarness {
  async init(callback) {
    let viewModel = null;
    jest.clearAllMocks();
    booksRepository.booksPm = new Observable([]);
    httpGateway.get = jest.fn().mockImplementation((path) => {
      return GetPublicBookStub();
    });
    let bookListPresenter = new BookListPresenter();
    await bookListPresenter.load(callback);
  }

  async addBook() {
    jest.clearAllMocks();

    let addBooksPresenter = new AddBooksPresenter();
    var pivotedStub = GetPublicBookStub();
    pivotedStub.result.push(pivotedStub.result[2]);
    httpGateway.get = jest.fn().mockImplementation((path) => {
      return pivotedStub;
    });

    httpGateway.post = jest.fn();
    await addBooksPresenter.addBook("A Sample", "Abdel Raoof");
  }
}
