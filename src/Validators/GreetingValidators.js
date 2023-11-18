 class GreetingValidators {
  /**
   * Validate text size
   *
   * @param {string} text
   * @throws {Error} if the text size exceeds the limit
   */
  static validateTextSize(text) {
    if (text.length > 160) {
      throw new Error('The text field should not exceed 160 characters.');
    }
  }
}

module.exports = GreetingValidators;
