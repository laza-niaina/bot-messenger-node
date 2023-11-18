class ButtonValidators {
  /**
   * Validate button title size
   *
   * @param {string} title
   * @throws {Error} if the title exceeds 20 characters
   */
  static validateTitleSize(title) {
    if (title.length > 20) {
      throw new Error('The button title field should not exceed 20 characters.');
    }
  }

  /**
   * Validate web URL
   *
   * @param {string} url
   * @throws {Error} if the URL is not valid
   */
  static validateWebUrl(url) {
    if (!/^https?:\/\//.test(url)) {
      throw new Error('The button URL field should be a valid URL.');
    }
  }

  /**
   * Validate payload size
   *
   * @param {string} payload
   * @throws {Error} if the payload exceeds 1000 characters
   */
  static validatePayload(payload) {
    if (payload.length > 1000) {
      throw new Error('Payload should not exceed 1000 characters.');
    }
  }

  /**
   * Validate phone number
   *
   * @param {string} phoneNumber
   * @throws {Error} if the phone number is invalid
   */
  static validatePhoneNumber(phoneNumber) {
    if (!phoneNumber.startsWith('+')) {
      throw new Error(`The phone number "${phoneNumber}" seems to be invalid. Please check the documentation to format the phone number.`);
    }
  }
}

module.exports = ButtonValidators;
