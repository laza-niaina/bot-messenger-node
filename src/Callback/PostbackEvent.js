const CallbackEvent = require('./CallbackEvent'); 
const Postback = require('./Postback'); 

class PostbackEvent extends CallbackEvent {

  static NAME = "postback_event";

  constructor(sender, recipient, postback) {
    super(sender, recipient);
    this.postback = postback;
  }

  getPostback() {
    return this.postback;
  }

  getName() {
    return PostbackEvent.NAME;
  }
}

module.exports = PostbackEvent;
