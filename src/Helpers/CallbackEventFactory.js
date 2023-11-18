import { MessageEvent, PostbackEvent, VerifyEvent } from './CallbackEvents'; // Assurez-vous d'ajuster le chemin selon votre structure de dossier
import { Message, Postback, Verify } from './CallbackModels'; // Assurez-vous d'ajuster le chemin selon votre structure de dossier

class CallbackEventFactory {
  /**
   * @param {Object} data
   * @return {CallbackEvent}
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
   * @return {VerifyEvent}
   */
  static createForVerify(data) {
    const event = new VerifyEvent(Verify.create(data));
    return event;
  }
}

export default CallbackEventFactory;
