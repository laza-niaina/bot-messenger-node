// JavaScript code for Node.js

const RequestOptions = require('guzzlehttp').RequestOptions;
const Client = require('./Client');
const Attachment = require('./Attachment');
const MessagingType = require('./MessagingType');
const NotificationType = require('./NotificationType');
const Personas = require('./Personas');

class RequestOptionsFactory {

  static createForTyping(recipient, actionType) {
    const options = {};
    const data = {
      recipient: {
        id: recipient
      },
      sender_action: actionType,
    };
    options[RequestOptions.JSON] = data;
    return options;
  }

  static createForMessage(recipient, message, personasId = null, messagingType = MessagingType.RESPONSE, notificationType = NotificationType.REGULAR) {
    const options = {};
    const data = {
      messaging_type: messagingType,
      recipient: {
        id: recipient
      },
      message: message,
      persona_id: personasId,
      notification_type: notificationType,
    };

    if (message.hasFileToUpload()) {
      const type = message.getData().getType();
      let mimeType;

      switch (type) {
        case Attachment.TYPE_FILE:
          mimeType = "application/octect-stream";
          break;
        case Attachment.TYPE_AUDIO:
          mimeType = "audio/mp3";
          break;
        case Attachment.TYPE_IMAGE:
          mimeType = "image/png";
          break;
        case Attachment.TYPE_VIDEO:
          mimeType = "video/mp4";
          break;
      }

      options[RequestOptions.MULTIPART] = [
        { name: 'messaging_type', contents: messagingType },
        { name: 'recipient', contents: JSON.stringify(data.recipient) },
        { name: 'message', contents: JSON.stringify(data.message) },
        { name: 'notification_type', contents: data.notification_type },
        {
          name: 'filedata',
          contents: message.getFileStream(),
          headers: { 'Content-Type': mimeType },
        },
        { name: 'persona_id', contents: personasId }
      ];
      options[RequestOptions.TIMEOUT] = Client.DEFAULT_FILE_UPLOAD_TIMEOUT;
      return options;
    }

    options[RequestOptions.JSON] = data;
    return options;
  }

  static createForDeleteProperties(props) {
    const options = {};
    options[RequestOptions.JSON] = {
      fields: [props]
    };
    return options;
  }
}

module.exports = RequestOptionsFactory;
