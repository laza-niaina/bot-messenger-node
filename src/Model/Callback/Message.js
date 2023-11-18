class Message {

  constructor(text, quickReplyPayload, attachments) {
    this.text = text;
    this.quickReplyPayload = quickReplyPayload;
    this.attachments = attachments;
  }

  hasAttachment() {
    return this.attachments !== null && this.attachments.length > 0;
  }

  hasQuickReply() {
    return this.quickReplyPayload !== null;
  }

  hasText() {
    return this.text !== null;
  }

  static create(data) {
    const text = data.text || null;
    const attachments = data.attachments || [];
    const quickReply = data.quick_reply ? data.quick_reply.payload : null;

    return new Message(text, quickReply, attachments);
  }

  getText() {
    return this.text;
  }

  getQuickReplyPayload() {
    return this.quickReplyPayload;
  }

  getAttachments() {
    return this.attachments;
  }
}
