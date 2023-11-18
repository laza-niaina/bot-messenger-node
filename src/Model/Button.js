class Button {
  static TYPE_POSTBACK = 'postback';
  static TYPE_PHONE_NUMBER = 'phone_number';
  static TYPE_WEB_URL = 'web_url';

  /**
   * @param {string} type
   */
  constructor(type) {
    this.type = type;
  }

  jsonSerialize() {
    return {
      type: this.type,
    };
  }

  getType() {
    return this.type;
  }
}

module.exports = Button;
