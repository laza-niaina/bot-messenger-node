class Verify {
  constructor(verifyToken, mode, challenge) {
    this.verifyToken = verifyToken;
    this.mode = mode;
    this.challenge = challenge;
  }

  static create(data) {
    const mode = data["hub_mode"];
    const verifyToken = data["hub_verify_token"];
    const challenge = data["hub_challenge"];
    return new Verify(verifyToken, mode, challenge);
  }

  getChallenge() {
    return this.challenge;
  }

  getMode() {
    return this.mode;
  }

  getVerifyToken() {
    return this.verifyToken;
  }
}

module.exports = Verify;
