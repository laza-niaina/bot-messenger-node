const AbstractElement = require('./../AbstractElement');
const TemplateValidators = require('./../../../Validators/TemplateValidators');

class GenericElement extends AbstractElement {
  constructor(title = 'Some title', subtitle = '', imgUrl = null, buttons = []) {
    super(title, subtitle, imgUrl);
    TemplateValidators.validateButtons(buttons);
    this.buttons = buttons;
  }

  toJSON() {
    const json = super.toJSON();
    json.buttons = this.buttons;
    return json;
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

module.exports = GenericElement;
