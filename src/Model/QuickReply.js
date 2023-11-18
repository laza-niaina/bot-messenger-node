/**
 * Quick Replies allow you to get message recipient input by sending buttons in a message.
 * 
 * @link https://developers.facebook.com/docs/messenger-platform/reference/buttons/quick-replies?locale=en_US
 */
class QuickReply {
  /**
   * @param {string} type
   */
  constructor(type) {
    this.type = type;
  }

  /**
   * @returns {Object}
   */
  jsonSerialize() {
    return {
      content_type: this.type,
    };
  }

  /**
   * @returns {string}
   */
  getType() {
    return this.type;
  }
}

QuickReply.TYPE_TEXT = 'text';
QuickReply.TYPE_USER_PHONE_NUMBER = 'user_phone_number';
QuickReply.TYPE_USER_EMAIL = 'user_email';

module.exports = QuickReply;
