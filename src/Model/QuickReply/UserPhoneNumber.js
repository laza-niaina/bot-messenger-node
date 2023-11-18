const QuickReply = require('./QuickReply');

class UserPhoneNumber extends QuickReply {
  constructor() {
    super(QuickReply.TYPE_USER_PHONE_NUMBER);
  }
}

module.exports = UserPhoneNumber;
