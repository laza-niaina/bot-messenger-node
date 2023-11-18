const { Event } = require('events'); // Assurez-vous d'ajuster le chemin selon votre structure de dossier

class VerifyEvent extends Event {
  static NAME = "verify_event";

  constructor(verify) {
    super();
    this.verify = verify;
  }

  /**
   * Get the value of verify
   * @return {Verify}
   */
  getVerify() {
    return this.verify;
  }

  getName() {
    return VerifyEvent.NAME;
  }
}

module.exports = VerifyEvent;
