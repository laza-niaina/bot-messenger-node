class VerifyEvent {

  static NAME = "verify_event";

  constructor(verify) {
    this.verify = verify;
  }

  getVerify() {
    return this.verify;
  }

  getName() {
    return VerifyEvent.NAME;
  }
}

module.exports = VerifyEvent;
