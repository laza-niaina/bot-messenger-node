const CallbackEvent = require('./CallbackEvent'); // Assurez-vous d'ajuster le chemin selon votre structure de dossier

class PostbackEvent extends CallbackEvent {
  static NAME = "postback_event";

  constructor(sender, recipient, postback) {
    super(sender, recipient);
    this.postback = postback;
  }

  /**
   * Get the value of postback
   * @return {Postback}
   */
  getPostback() {
    return this.postback;
  }

  getName() {
    return PostbackEvent.NAME;
  }
}

module.exports = PostbackEvent;
