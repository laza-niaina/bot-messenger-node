const CallbackEvent = require('./CallbackEvent'); // Assurez-vous d'ajuster le chemin selon votre structure de dossier

class MessageEvent extends CallbackEvent {
  static NAME = "message_event";

  constructor(sender, recipient, message) {
    super(sender, recipient);
    this.message = message;
  }

  /**
   * Get the value of message
   * @return {Message}
   */
  getMessage() {
    return this.message;
  }

  getName() {
    return MessageEvent.NAME;
  }
}

module.exports = MessageEvent;
