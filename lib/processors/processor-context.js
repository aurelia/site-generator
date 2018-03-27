exports.ProcessorContext = class {
  constructor(moveImages = true) {
    let id = 0;

    function getNextId() {
      return ++id;
    }

    this.moveImages = moveImages;

    this.featured = {
      data: [],
      add(item) {
        this.data.push(item);
      }
    }

    this.images = {
      data: [],
      add(src, dest) {
        this.data.push({src: src, dest: dest});
      }
    };

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
