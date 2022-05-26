import BookAdderTestHarness from "../TestTools/BookAdderTestHarness";
import StatsPresenter from "./StatsPresenter";

describe("stats", () => {
  it("should show last added book", async () => {
    let lastAddedViewModel = null;
    let bookAdderTestHarness = new BookAdderTestHarness();
    await bookAdderTestHarness.init(() => {});
    await bookAdderTestHarness.addBook();
    await new StatsPresenter().load((generatedVm) => {
      lastAddedViewModel = generatedVm;
    });
    expect(lastAddedViewModel).toBe("A Sample");
  });

  it("should show total books", async () => {
    let bookCount = 0;
    bookCount = await new StatsPresenter().getBookCount();
    expect(bookCount).toBe(6);
  });
});
