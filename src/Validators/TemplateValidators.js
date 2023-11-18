 class TemplateValidators {
  static MAX_BUTTON = 3;
  static MAX_ELEMENT = 10;
  static MAX_SUB_SIZE = 80;
  static MAX_TITLE_SIZE = 80;

  /**
   * Validate the number of buttons
   *
   * @param {Array} buttons
   * @throws {Error} if the number of buttons exceeds the limit
   */
  static validateButtons(buttons) {
    if (buttons.length > TemplateValidators.MAX_BUTTON) {
      throw new Error('A generic template cannot have more than 3 buttons');
    }
  }

  /**
   * Validate the number of elements
   *
   * @param {Array} elements
   * @throws {Error} if the number of elements exceeds the limit
   */
  static validateElements(elements) {
    if (elements.length > TemplateValidators.MAX_ELEMENT) {
      throw new Error('A generic template cannot have more than 10 bubbles');
    }
  }

  /**
   * Validate subtitle size
   *
   * @param {string} subtitle
   * @throws {Error} if the subtitle size exceeds the limit
   */
  static validateSubtitleSize(subtitle) {
    if (subtitle.length > TemplateValidators.MAX_SUB_SIZE) {
      throw new Error(`The subtitle field should not exceed ${TemplateValidators.MAX_SUB_SIZE} characters.`);
    }
  }

  /**
   * Validate title size
   *
   * @param {string} title
   * @throws {Error} if the title size exceeds the limit
   */
  static validateTitleSize(title) {
    if (title.length > TemplateValidators.MAX_TITLE_SIZE) {
      throw new Error(`The title field should not exceed ${TemplateValidators.MAX_TITLE_SIZE} characters.`);
    }
  }
}

module.exports = TemplateValidators;
