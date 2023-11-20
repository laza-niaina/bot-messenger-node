const Button = require('./Button');
const ButtonValidators = require('../Validators/ButtonValidators');

class PhoneNumber extends Button {
  constructor(title, phoneNumber) {
    ButtonValidators.validateTitleSize(title);
    ButtonValidators.validatePhoneNumber(phoneNumber);

    super(Button.TYPE_PHONE_NUMBER);

    this.title = title;
    this.phoneNumber = phoneNumber;
  }

  /**
   * @inheritDoc
   */
  jsonSerialize() {
    const json = super.jsonSerialize();
    json.title = this.title;
    json.payload = this.phoneNumber;
    return json;
  }

  getTitle() {
    return this.title;
  }

  getPhoneNumber() {
    return this.phoneNumber;
  }
}

module.exports = PhoneNumber;
