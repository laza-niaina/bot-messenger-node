const Template = require('./../Template');
const TemplateValidators = require('./../../../Validators/TemplateValidators');

class Button extends Template {
  constructor(text = 'Some text', buttons = []) {
    TemplateValidators.validateButtons(buttons);
    super(Template.TYPE_BUTTON);
    this.text = text;
    this.buttons = buttons;
  }

  toJSON() {
    const json = super.toJSON();
    json.payload.text = this.text;
    json.payload.buttons = this.buttons;
    return json;
  }

  getText() {
    return this.text;
  }

  setText(text) {
    this.text = text;
    return this;
  }

  getButtons() {
    return this.buttons;
  }

  setButtons(buttons) {
    TemplateValidators.validateButtons(buttons);
    this.buttons = buttons;
    return this;
  }
}

module.exports = Button;
