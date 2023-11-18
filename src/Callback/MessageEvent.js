const CallbackEvent = require('./CallbackEvent');
const Message = require('./Message'); 

class MessageEvent extends CallbackEvent {

  static NAME = "message_event";

  constructor(sender, recipient, message) {
    super(sender, recipient);
    this.message = message;
  }

  getMessage() {
    return this.message;
  }

  getName() {
    return MessageEvent.NAME;
  }
}

module.exports = MessageEvent;
