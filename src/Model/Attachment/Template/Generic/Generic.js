const Template = require('./../Template');
const TemplateValidators = require('./../../../Validators/TemplateValidators');
const GenericElement = require('./GenericElement');

class Generic extends Template {
  constructor(elements = []) {
    TemplateValidators.validateElements(elements);

    super(Template.TYPE_GENERIC);

    this.elements = elements;
  }

  addElement(element) {
    const updatedElements = [...this.elements, element];

    TemplateValidators.validateElements(updatedElements);

    this.elements = updatedElements;
    return this;
  }

  getElements() {
    return this.elements;
  }

  toJSON() {
    const json = super.toJSON();
    json.payload.elements = this.elements;
    return json;
  }
}

module.exports = Generic;
