const QuickReply = require('./QuickReply');
const File = require('./Attachment/File');

class Message {
  static TYPE_TEXT = "text";
  static TYPE_ATTACHMENT = "attachment";

  /**
   * @param {string|Attachment} data
   */
  constructor(data) {
    if (typeof data === 'string') {
      this.type = Message.TYPE_TEXT;
    } else if (data instanceof File) {
      this.type = Message.TYPE_ATTACHMENT;
    }
    this.data = data;
    this.quickReplies = null;

    return this;
  }

  /**
   * Add one quick reply
   *
   * @param {QuickReply} quickReply
   * @return {Message}
   */
  addQuickReply(quickReply) {
    if (this.quickReplies === null) {
      this.quickReplies = [quickReply];
      return this;
    }

    this.quickReplies = [...this.quickReplies, quickReply];
    return this;
  }

  /**
   * Is Upload
   *
   * @return {boolean}
   */
  hasFileToUpload() {
    if (this.data instanceof File) {
      if (this.data.isRemoteFile()) return false;
      return true;
    }
    return false;
  }

  /**
   * Get file resource
   *
   * @return {null|ressource}
   */
  getFileStream() {
    if (!(this.data instanceof File)) {
      throw new Error("Data is not a File Object");
    }
    return this.data.getStream();
  }

  /**
   * @return {Object}
   */
  jsonSerialize() {
    return {
      [this.type]: this.data,
      quick_replies: this.quickReplies,
    };
  }

  /**
   * Get the value of quickReplies
   *
   * @return {QuickReply[]}
   */
  getQuickReplies() {
    return this.quickReplies;
  }

  /**
   * Set the value of quickReplies
   *
   * @param {QuickReply[]} quickReplies
   * @return {Message}
   */
  setQuickReplies(quickReplies) {
    this.quickReplies = quickReplies;
    return this;
  }

  /**
   * Get the value of data
   *
   * @return {string|Attachment}
   */
  getData() {
    return this.data;
  }
}

module.exports = Message;
