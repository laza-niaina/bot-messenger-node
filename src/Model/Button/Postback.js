const Button = require('./Button');
const ButtonValidators = require('../Validators/ButtonValidators');

class Postback extends Button {
  constructor(title, payload) {
    ButtonValidators.validateTitleSize(title);
    ButtonValidators.validatePayload(payload);

    super(Button.TYPE_POSTBACK);

    this.title = title;
    this.payload = payload;
  }

  getTitle() {
    return this.title;
  }

  getPayload() {
    return this.payload;
  }

  /**
   * @inheritDoc
   */
  jsonSerialize() {
    const json = super.jsonSerialize();
    json.title = this.title;
    json.payload = this.payload;
    return json;
  }
}

module.exports = Postback;
