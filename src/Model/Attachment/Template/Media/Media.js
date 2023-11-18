const Template = require('./../Template');
const TemplateValidators = require('./../../../Validators/TemplateValidators');

class Media extends Template {
  static TYPE_IMAGE = "image";
  static TYPE_VIDEO = "video";

  constructor(type, attachmentIdorUrl, buttons) {
    TemplateValidators.validateButtons(buttons);
    super(Template.TYPE_MEDIA);
    this.type = type;
    this.attachmentIdorUrl = attachmentIdorUrl;
    this.buttons = buttons;
  }

  toJSON() {
    const json = super.toJSON();
    const elements = {
      media_type: this.type,
      buttons: this.buttons,
    };
    if (new URL(this.attachmentIdorUrl).protocol === "https:" || new URL(this.attachmentIdorUrl).protocol === "http:") {
      elements.url = this.attachmentIdorUrl;
    } else {
      elements.attachment_id = this.attachmentIdorUrl;
    }
    json.payload.elements = [elements];
    return json;
  }
}

module.exports = Media;
