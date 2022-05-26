import httpGateway from "../Shared/HttpGateway";
import Observable from "../Shared/Observable";

class BooksRepository {
  booksPm = null;
  lastAddedBookPm = null;
  mode = "books";

  constructor() {
    this.booksPm = new Observable([]);
    this.lastAddedBookPm = new Observable("");
  }

  getBooks = async (callback) => {
    this.booksPm.subscribe(callback);
    if (this.booksPm.value.length === 0) {
      await this.loadApiData();
    } else {
      this.refreshModelData();
    }
  };

  addBook = async (programmersModel) => {
    let dto = {
      name: programmersModel.name,
      author: programmersModel.author,
      ownerId: "olakara@gmail.com"
    };
    await httpGateway.post(
      "https://api.logicroom.co/api/olakara@gmail.com/books",
      dto
    );
    await this.loadApiData();
    this.lastAddedBookPm.value = programmersModel.name;
    this.lastAddedBookPm.notify();
  };

  getLastAddedBook = async (callback) => {
    this.lastAddedBookPm.subscribe(callback);
  };

  getBookCount = async () => {
    return this.booksPm.value.length;
  };

  loadApiData = async () => {
    const dto = await httpGateway.get(
      "https://api.logicroom.co/api/olakara@gmail.com/" + this.mode
    );
    this.booksPm.value = dto.result.map((dtoItem) => {
      return dtoItem;
    });
    this.booksPm.notify();
  };

  refreshModelData = () => {
    this.booksPm.value = this.booksPm.value.map((pm) => {
      return pm;
    });
    this.booksPm.notify();
  };
}

const booksRepository = new BooksRepository();
export default booksRepository;
