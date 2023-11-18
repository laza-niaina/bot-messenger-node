class Attachment {
  static TYPE_FILE = 'file';
  static TYPE_AUDIO = 'audio';
  static TYPE_IMAGE = 'image';
  static TYPE_VIDEO = 'video';
  static TYPE_TEMPLATE = 'template';

  /**
   * @param {string} type
   * @param {Object} payload
   */
  constructor(type, payload = {}) {
    this.payload = payload;
    this.type = type;
  }

  getType() {
    return this.type;
  }

  getPayload() {
    return this.payload;
  }

  /**
   * @returns {Object}
   */
  jsonSerialize() {
    return {
      type: this.type,
      payload: this.payload,
    };
  }
}

module.exports = Attachment;
