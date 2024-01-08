# bot-messenger-node
[![npm version](https://img.shields.io/npm/v/bot-messenger-node.svg?style=flat)](https://www.npmjs.com/package/bot-messenger-node)

[![NPM
downloads](https://img.shields.io/npm/dm/bot-messenger-node.svg?style=flat)](https://www.npmjs.com/package/bot-messenger-node)

Node Wrapper to various APIs from [Facebook Messenger Platform](https://developers.facebook.com/docs/messenger-platform).


## Features

### Send API (v18.0)
 - Send text messages
 - Send attachments from a remote file (image, audio, video, file)
 - Send attachments from a local file (image, audio, video, file)
 - Send templates (generic messages)
 - Send quick replies
 - Send buttons
### Profile API (v18.0)
- Set welcome screen
- Set persistent menu
### Attachment Upload API (v16.0)
- Upload attachments from a remote file (image, audio, video, file)
- Upload attachments from a local file (image, audio video, file)
### Reusable components
Various components used when sending messages in Facebook Messenger are wrapped into Python objects to make them reusable and easy to use.
- **Elements:** used to contains various Element objects
- **Element:** a card-like component that holds various other components
- **Buttons:** used to contains various Button objects
- **Button:** button used in various other components, can also be used alone
- **QuickReplies:** used to contains various QuickReply objects
- **QuickReply:** used when sending messages accompanied with quick replies
- **PersistentMenu:** used when setting up persistent menu

## How to install
### From Npm
```bash
npm install bot-messenger-node
```

## Usage
### Send API
```javascript
const { SendApi } = require('bot-messenger-node');

const sendApi = new SendApi('<page_access_token>');
const message = '<message>';
const recipientId = '<recipient_id>';

sendApi.send_text(message, recipientId)

```
**Note**: From Facebook regarding User IDs

> These ids are page-scoped. These ids differ from those returned from Facebook Login apps which are app-scoped. You must use ids retrieved from a Messenger integration for this page in order to function properly.

##### Sending a generic template message:

> [Generic Template Messages](https://developers.facebook.com/docs/messenger-platform/implementation#receive_message) allows you to add cool elements like images, text all in a single bubble.
```javascript
const { SendApi, Elements, Element, Buttons, Button, POSTBACK } = require('bot-messenger-node');

const sendApi = new SendApi('<page_access_token>');

const elements = new Elements();
const buttons = new Buttons();

const button = new Button(POSTBACK, "My button");
buttons.add_button(button.getContent());

const element = new Element("My element", "The element's subtitle", '<image_url>', buttons.get_content());
elements.add_element(element.getContent());

sendApi.send_generic(elements.getContent(), '<recipient_id>')

```
##### Sending remote (from URL) image/audio/video/file:
```javascript
const SendApi = require('bot-messenger-node');

const sendApi = new SendApi('<page_access_token>');

// To send an image
sendApi.send_image('<image_url>', '<recipient_id>')

// To send an audio
sendApi.send_audio('<audio_url>', '<recipient_id>')

// To send a video
sendApi.send_video('<video_url>', '<recipient_id>')
// To send a file
sendApi.send_file('<file_url>', '<recipient_id>')

```

## To do
- Clarify this docs