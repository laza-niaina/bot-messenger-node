const VerifyEvent = require('./VerifyEvent');
const MessageEvent = require('./MessageEvent');
const PostbackEvent = require('./PostbackEvent');
const Message = require('./Message');
const Postback = require('./Postback')
const Verify = require('./Verify');

class CallbackEventFactory {

  /**
   * @param {Object} data
   * @returns {CallbackEvent}
   */
  static create(data) {
    const entry = data.entry[0];
    const messaging = entry.messaging[0];
    const sender = messaging.sender.id;
    const recipient = messaging.recipient.id;
    const event = messaging.message
      ? new MessageEvent(sender, recipient, Message.create(messaging.message))
      : new PostbackEvent(sender, recipient, Postback.create(messaging.postback));

    return event;
  }

  /**
   * @param {Object} data
   * @returns {VerifyEvent}
   */
  static createForVerify(data) {
    const event = new VerifyEvent(Verify.create(data));
    return event;
  }
}

module.exports = CallbackEventFactory;
