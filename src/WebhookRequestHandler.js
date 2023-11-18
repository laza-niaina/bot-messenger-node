const { EventDispatcher } = require('node-event-dispatcher');


class WebhookRequestHandler {

  constructor() {
    this.request = ServerRequest.fromGlobals(); // Assuming ServerRequest is properly defined
    this.dispatcher = new EventDispatcher();
  }

  dispatch() {
    if (!this.isValidCallbackRequest() && !this.isVerifyTokenRequest()) return;

    let event;
    if (this.isVerifyTokenRequest()) {
      event = CallbackEventFactory.createForVerify(this.getParams());
    } else {
      event = CallbackEventFactory.create(this.getDecodedBody());
    }

    this.dispatcher.dispatch(event, event.getName());
  }

  addSubscriber(subscriber) {
    this.dispatcher.addSubscriber(subscriber);
  }

  isVerifyTokenRequest() {
    if (this.request.getMethod() !== "GET") return false;

    const params = this.request.getQueryParams();
    if (!params['hub_verify_token'] || !params['hub_mode'] || !params['hub_challenge']) {
      return false;
    }

    return true;
  }

  getParams() {
    return this.request.getQueryParams();
  }

  isValidCallbackRequest() {
    const decoded = this.getDecodedBody();

    const object = decoded['object'] || null;
    const entry = decoded['entry'] || null;

    return object === 'page' && entry !== null;
  }

  getDecodedBody() {
    const body = this.getRequest().getBody().toString();
    return JSON.parse(body);
  }

  getRequest() {
    return this.request;
  }
}

module.exports = WebhookRequestHandler;
