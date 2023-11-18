const { Event } = require('events'); // Assurez-vous d'ajuster le chemin selon votre structure de dossier

class CallbackEvent extends Event {
  constructor(sender, recipient) {
    super();
    this.sender = sender;
    this.recipient = recipient;
  }

  /**
   * Get the value of sender
   * @return {string}
   */
  getSender() {
    return this.sender;
  }

  /**
   * Get the value of recipient
   * @return {string}
   */
  getRecipient() {
    return this.recipient;
  }
}

module.exports = CallbackEvent;
