class GetStarted {
  constructor(payload) {
    this.payload = payload;
  }

  static create(payload) {
    return new GetStarted(payload);
  }

  jsonSerialize() {
    return {
      get_started: {
        payload: this.payload
      }
    };
  }

  getPayload() {
    return this.payload;
  }
}

module.exports = GetStarted;
