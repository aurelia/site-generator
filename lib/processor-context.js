exports.ProcessorContext = class {
  constructor() {
    let id = 0;

    function getNextId() {
      return ++id;
    }

    this.searchIndex = {
      articles: {
        data: [],
        add(item) {
          item.id = getNextId();
          this.data.push(item);
        }
      },
      api: {
        data: [],
        add(item) {
          item.id = getNextId();
          this.data.push(item);
        }
      }
    };
  }
}
