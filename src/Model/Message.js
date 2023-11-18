class Message {
  static TYPE_TEXT = "text";
  static TYPE_ATTACHMENT = "attachment";

  constructor(data) {
    if (typeof data === 'string') {
      this.type = Message.TYPE_TEXT;
    } else if (data instanceof File) {
      this.type = Message.TYPE_ATTACHMENT;
    }
    this.data = data;
    this.quickReplies = null;
  }

  addQuickReply(quickReply) {
    this.quickReplies = [...(this.quickReplies || []), quickReply];
    return this;
  }

  hasFileToUpload() {
    if (this.data instanceof File) {
      if (this.data.isRemoteFile()) return false;
      return true;
    }
    return false;
  }

  getFileStream() {
    if (!(this.data instanceof File)) {
      throw new Error("Data is not a File Object");
    }
    return this.data.getStream();
  }

  jsonSerialize() {
    return {
      [this.type]: this.data,
      quick_replies: this.quickReplies
    };
  }

  getQuickReplies() {
    return this.quickReplies;
  }

  setQuickReplies(quickReplies) {
    this.quickReplies = quickReplies;
    return this;
  }
}
