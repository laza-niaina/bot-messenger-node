class Postback {
  constructor(payload, title) {
    this.payload = payload;
    this.title = title;
  }

  getPayload() {
    return this.payload;
  }

  getTitle() {
    return this.title;
  }

  static create(data) {
    return new Postback(data.payload, data.title);
  }
}

module.exports = Postback;
