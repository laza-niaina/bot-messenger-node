const QuickReply = require('./QuickReply');

class UserEmail extends QuickReply {
  constructor() {
    super(QuickReply.TYPE_USER_EMAIL);
  }
}

module.exports = UserEmail;
