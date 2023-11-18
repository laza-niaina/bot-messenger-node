const Attachment = require('./Attachment');

class Template extends Attachment {
  static TYPE_GENERIC = 'generic';
  static TYPE_BUTTON = 'button';
  static TYPE_MEDIA = 'media';
  static TYPE_RECEIPT = 'receipt';

  constructor(type) {
    super(Attachment.TYPE_TEMPLATE);
    this.type = type;
  }

  toJSON() {
    return {
      payload: {
        template_type: this.type,
      },
    };
  }
}

module.exports = Template;
