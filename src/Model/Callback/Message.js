class Message {
  /**
   * @param {string|null} text
   * @param {string|null} quickReplyPayload
   * @param {Array|null} attachments
   */
  constructor(text, quickReplyPayload, attachments) {
    this.text = text;
    this.quickReplyPayload = quickReplyPayload;
    this.attachments = attachments;
  }

  /**
   * @return {boolean}
   */
  hasAttachment() {
    return this.attachments !== null && this.attachments.length > 0;
  }

  /**
   * @return {boolean}
   */
  hasQuickReply() {
    return this.quickReplyPayload !== null;
  }

  /**
   * @return {boolean}
   */
  hasText() {
    return this.text !== null;
  }

  /**
   * @param {Object} data
   * @return {Message}
   */
  static create(data) {
    const text = data.text || null;
    const attachments = data.attachments || [];
    const quickReply = data.quick_reply ? data.quick_reply.payload : null;

    return new Message(text, quickReply, attachments);
  }

  /**
   * @return {string|null}
   */
  getText() {
    return this.text;
  }

  /**
   * @return {string|null}
   */
  getQuickReplyPayload() {
    return this.quickReplyPayload;
  }

  /**
   * @return {Array|null}
   */
  getAttachments() {
    return this.attachments;
  }
}

module.exports = Message;
