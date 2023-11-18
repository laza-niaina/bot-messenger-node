const { RequestOptions } = require('axios');
const Client = require('./Client'); 
const MessagingType = require('./Types/MessagingType'); 
const NotificationType = require('./Types/NotificationType'); 
const RequestOptionsFactory = require('./Helpers/RequestOptionsFactory'); 
const PersonasFactory = require('./Helpers/PersonasFactory'); 
const ResponseHandler = require('./Helpers/ResponseHandler');
const Message = require('./Model/Message');

class Messenger {
  constructor(client) {
    this.client = client;
  }

  setActionStatus(recipient, actionType) {
    const options = RequestOptionsFactory.createForTyping(recipient, actionType);
    const response = this.client.send("POST", "/me/messages", options);
    return this.decodeResponse(response);
  }

  sendMessage(recipient, message, personasId = null, messageType = MessagingType.RESPONSE, notificationType = NotificationType.REGULAR) {
    message = this.createMessage(message);
    const options = RequestOptionsFactory.createForMessage(recipient, message, personasId, messageType, notificationType);
    const response = this.client.send("POST", "/me/messages", options);
    return this.decodeResponse(response);
  }

  static create(token) {
    const client = new Client(token);
    return new this(client);
  }

  addPersonas(personas) {
    const options = {
      [RequestOptions.FORM_PARAMS]: personas.jsonSerialize(),
    };
    const response = this.client.send("POST", "/me/personas", options);
    return this.decodeResponse(response);
  }

  deletePersonas(personasId) {
    const response = this.client.send("DELETE", `/${personasId}`);
    return this.decodeResponse(response);
  }

  getPersonas(personasId) {
    const response = this.client.send("GET", `/${personasId}`);
    const data = this.decodeResponse(response);
    return PersonasFactory.createOne(data);
  }

  getAllPersonas() {
    const response = this.client.send("GET", "/me/personas");
    const data = this.decodeResponse(response);
    return PersonasFactory.createList(data);
  }

  setMessengerOptions(props) {
    const options = {
      [RequestOptions.JSON]: props,
    };
    const response = this.client.send("POST", "/me/messenger_profile", options);
    return this.decodeResponse(response);
  }

  deleteMessengerOptions(props) {
    const options = RequestOptionsFactory.createForDeleteProperties(props);
    const response = this.client.send("DELETE", "/me/messenger_profile", options);
    return this.decodeResponse(response);
  }

  createMessage(message) {
    if (message instanceof Message) {
      return message;
    }

    if (typeof message === 'string' || message instanceof Attachment) {
      return new Message(message);
    }
  }
}

module.exports = Messenger;
