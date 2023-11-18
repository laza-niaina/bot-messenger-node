class PersistentElement {
  constructor(buttons, locale = 'default', composerInputDisabled = false) {
    if (buttons.length > 20) {
      throw new Error('The number of buttons should be less than 20');
    }
    this.buttons = buttons;
    this.locale = locale;
    this.composerInputDisabled = composerInputDisabled;
  }

  jsonSerialize() {
    return {
      locale: this.locale,
      composer_input_disabled: this.composerInputDisabled,
      call_to_actions: this.buttons,
    };
  }

  getButtons() {
    return this.buttons;
  }

  setButtons(buttons) {
    if (buttons.length > 20) {
      throw new Error('The number of buttons should be less than 20');
    }

    this.buttons = buttons;
    return this;
  }
}

module.exports = PersistentElement;
