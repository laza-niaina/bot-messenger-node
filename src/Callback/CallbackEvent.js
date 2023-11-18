const { EventEmitter } = require('events');

class CallbackEvent extends EventEmitter {

  constructor(sender, recipient) {
    super();
    this.sender = sender;
    this.recipient = recipient;
  }

  getSender() {
    return this.sender;
  }

  getRecipient() {
    return this.recipient;
  }
}

module.exports = CallbackEvent;
