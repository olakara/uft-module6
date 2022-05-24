import httpGateway from "../Shared/HttpGateway";
import Observable from "../Shared/Observable";
import AddBooksPresenter from "./AddBooksPresenter";
import booksRepository from "./BooksRepository";

import GetPublicBookStub from "../TestTools/GetPublicBooksStub";
import BookAdderTestHarness from "../TestTools/BookAdderTestHarness";

describe("add book", () => {
  it("should call api", async () => {
    let bookAdderTestHarness = new BookAdderTestHarness();
    await bookAdderTestHarness.init((generatedVM) => {});
    await bookAdderTestHarness.addBook();

    expect(httpGateway.post).toHaveBeenCalledWith(
      "https://api.logicroom.co/api/olakara@gmail.com/books",
      {
        author: "Abdel Raoof",
        name: "A Sample",
        ownerId: "olakara@gmail.com"
      }
    );
  });

  it("should load and reload books", async () => {
    let viewModel = null;
    let bookAdderTestHarness = new BookAdderTestHarness();
    await bookAdderTestHarness.init((generatedVM) => {
      viewModel = generatedVM;
    });

    expect(httpGateway.get).toHaveBeenCalledWith(
      "https://api.logicroom.co/api/olakara@gmail.com/books"
    );
    expect(viewModel[0].name).toBe("Moby Dick");
    expect(viewModel[2].name).toBe("Wind in the willows");
    expect(viewModel.length).toBe(5);

    await bookAdderTestHarness.addBook();

    expect(httpGateway.get).toHaveBeenCalledWith(
      "https://api.logicroom.co/api/olakara@gmail.com/books"
    );

    expect(viewModel.length).toBe(6);
  });
});
