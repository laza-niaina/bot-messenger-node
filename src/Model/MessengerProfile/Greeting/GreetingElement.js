const { validateTextSize } = require('./path/to/GreetingValidators');

class GreetingElement {
  constructor(text, locale = 'default') {
    validateTextSize(text);
    this.text = text;
    this.locale = locale;
  }

  jsonSerialize() {
    return {
      locale: this.locale,
      text: this.text
    };
  }
}

module.exports = GreetingElement;
