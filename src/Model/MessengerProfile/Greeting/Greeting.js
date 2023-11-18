class Greeting {
  constructor(greetingElements) {
    this.greetingElements = greetingElements;
  }

  jsonSerialize() {
    return {
      greeting: this.greetingElements
    };
  }
}

module.exports = Greeting;
