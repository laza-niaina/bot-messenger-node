# bot-messenger-node

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://img.shields.io/npm/v/bot-messenger-node.svg?style=flat)](https://www.npmjs.com/package/bot-messenger-node)
[![NPM Downloads](https://img.shields.io/npm/dm/bot-messenger-node.svg?style=flat)](https://www.npmjs.com/package/bot-messenger-node)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Facebook Graph API](https://img.shields.io/badge/Facebook%20API-v21.0-blue.svg)](https://developers.facebook.com/docs/graph-api)

Un toolkit complet et moderne pour interagir avec la plateforme Messenger de Facebook. Simplifiez le développement de chatbots et l'intégration de fonctionnalités Messenger dans vos applications Node.js.

## Pourquoi utiliser bot-messenger-node ?

- **Facilité d'utilisation** : API simple et intuitive, prête à l'emploi
- **Toujours à jour** : Supporte la dernière version de Facebook Graph API v21.0
- **Complet** : Couvre toutes les fonctionnalités majeures de Messenger
- **Maintenable** : Code propre, modularisé et facile à étendre
- **Lightweight** : Dépendances minimales, performance optimale

## Installation

### Via npm

```bash
npm install bot-messenger-node
```

### Via yarn

```bash
yarn add bot-messenger-node
```

## Configuration requise

- Node.js version 18 ou supérieure
- Un compte développeur Facebook
- Un Page Access Token valide

**Comment obtenir un Page Access Token :**

1. Allez sur [Facebook Developers](https://developers.facebook.com/)
2. Créez une application
3. Ajoutez le produit "Messenger"
4. Obtenez un token d'accès pour votre page

## Démarrage Rapide

### 1. Importer le package

```javascript
const { SendApi, ProfileApi, outils } = require('bot-messenger-node');
```

### 2. Initialiser l'API

```javascript
const PAGE_ACCESS_TOKEN = 'votre_page_access_token';
const sendApi = new SendApi(PAGE_ACCESS_TOKEN);
```

### 3. Envoyer un premier message

```javascript
const recipientId = 'recipient_user_id';
sendApi.send_text(recipientId, 'Bonjour ! Bienvenue sur notre service.');
```

## Fonctionnalités

### Send API (v21.0)

Envoi de messages dans toutes leurs formes :

**Messages textuels**

- Texte simple
- Textes longs avec formattage

**Médias et fichiers**

- Images (depuis URL ou fichier local)
- Vidéos
- Fichiers audio
- Documents PDF et autres fichiers

**Templates interactifs**

- Messages génériques avec cartes
- Templates avec boutons
- Réponses rapides (Quick Replies)
- Combo messages + boutons + quick replies

**Actions**

- Indicateur "écrit..." (typing)
- Marquer comme lu (seen)
- Notification push régulées

### Profile API (v21.0)

Configuration personnalisée de votre bot :

- **Welcome screen** : Message d'accueil avec bouton "Démarrer"
- **Greetings** : Messages personnalisés par langue
- **Persistent menu** : Menu principal toujours accessible
- **Custom settings** : Réglages au niveau utilisateur

### Attachment Upload API (v21.0)

Gestion avancée des pièces jointes :

- Upload d'images, vidéos, audio et fichiers
- Support URLs distantes
- Support fichiers locaux
- Attachements réutilisables

### Webhook Handler

Réception et traitement des messages entrants :

```javascript
const { Webhook } = require('bot-messenger-node');

const webhook = new Webhook({
  verify_token: 'votre_token_de_verification',
  app_secret: 'votre_app_secret',
  endpoint: '/webhook',
  port: 3000
});

// Écouter les messages reçus
webhook.on('messages', (event_type, sender_info, webhook_event) => {
  console.log('Message reçu :', webhook_event.message);

  // Répondre au message
  if (webhook_event.message && webhook_event.message.text) {
    const senderId = sender_info.value;
    const userText = webhook_event.message.text;
    sendApi.send_text(senderId, `Echo: ${userText}`);
  }
});

// Écouter les postbacks (boutons, menu persistant)
webhook.on('messaging_postbacks', (event_type, sender_info, webhook_event) => {
  console.log('Postback reçu :', webhook_event.postback);
  const senderId = sender_info.value;
  const payload = webhook_event.postback.payload;

  switch(payload) {
    case 'MENU_PRINCIPAL':
      sendApi.send_text(senderId, 'Voici notre menu principal...');
      break;
  }
});
```

## Composants Réutilisables

La bibliothèque met à disposition des objets pour faciliter la création de messages complexes :

### Elements & Element

Les éléments sont les blocs de construction des messages génériques (cartes) :

```javascript
const { SendApi, Elements, Element, Buttons, Button, POSTBACK, WEB_URL } = require('bot-messenger-node');

const sendApi = new SendApi(PAGE_ACCESS_TOKEN);

const elements = new Elements();
const buttons = new Buttons();

// Ajouter des boutons
const button1 = new Button(POSTBACK, "Menu");
button1.set_payload('MENU_ACTION');
buttons.add_button(button1.get_content());

const button2 = new Button(WEB_URL, "Visiter notre site");
button2.set_url('https://votre-site.com');
buttons.add_button(button2.get_content());

// Créer un élément (carte)
const element = new Element(
  "Découvrez nos services",
  "Nous proposons une gamme complète de solutions",
  "https://exemple.com/image.jpg",
  buttons.get_content()
);

// Ajouter plusieurs éléments
elements.add_element(element.get_content());

// Envoyer le message générique
sendApi.send_generic(elements.get_content(), recipientId);
```

### QuickReplies & QuickReply

Pour des choix rapides et efficaces :

```javascript
const { SendApi, QuickReplies, QuickReply } = require('bot-messenger-node');

const sendApi = new SendApi(PAGE_ACCESS_TOKEN);

const quickReplies = new QuickReplies();

const qr1 = new QuickReply('Choix A', 'CHOIX_A');
qr1.set_payload('CHOIX_A');
quickReplies.add_quick_reply(qr1.get_content());

const qr2 = new QuickReply('Choix B', 'CHOIX_B');
quickReplies.add_quick_reply(qr2.get_content());

sendApi.send_quick_replies(
  recipientId,
  quickReplies.get_content(),
  'Que préférez-vous ?'
);
```

### Button (Autonome)

Boutons utilisables seuls ou dans des templates :

```javascript
const { Button, POSTBACK, WEB_URL } = require('bot-messenger-node');

// Bouton postback (déclenche un événement)
const postbackBtn = new Button(POSTBACK, "Voir plus");
postbackBtn.set_payload('CLICKED_VIEW_MORE');

// Bouton URL (ouvre un lien)
const urlBtn = new Button(WEB_URL, "Notre site");
urlBtn.set_url('https://votre-site.com');

// Usage dans send_buttons()
sendApi.send_buttons(
  "Que voulez-vous faire ?",
  [postbackBtn.get_content(), urlBtn.get_content()],
  recipientId
);
```

### PersistentMenu

Menu principal accessible en permanence :

```javascript
const { ProfileApi, PersistentMenu, Button, POSTBACK } = require('bot-messenger-node');

const profileApi = new ProfileApi(PAGE_ACCESS_TOKEN);

const menu = new PersistentMenu([
  new Button(POSTBACK, "Accueil").get_content(),
  new Button(POSTBACK, "Services").get_content(),
  new Button(POSTBACK, "Contact").get_content()
]);

profileApi.setPersistentMenu(menu.get_content());

// Ajouter un menu spécifique par langue
const menuEn = [
  new Button(POSTBACK, "Home").get_content(),
  new Button(POSTBACK, "Services").get_content()
];
menu.add_locale('fr_FR', menuEn);
```

## Exemples Complets

### Exemple 1 : Bot simple de réponse automatique

```javascript
const { SendApi, Webhook } = require('bot-messenger-node');

const sendApi = new SendApi(PAGE_ACCESS_TOKEN);

const webhook = new Webhook({
  verify_token: 'my_verify_token',
  app_secret: 'your_app_secret',
  port: 3000
});

webhook.on('messages', (event, sender, event_data) => {
  if (event_data.message && event_data.message.text) {
    const text = event_data.message.text.toLowerCase();
    const senderId = sender.value;

    if (text.includes('bonjour') || text.includes('hello')) {
      sendApi.send_text(senderId, 'Bonjour ! Comment puis-je vous aider ?');
    } else if (text.includes('heure')) {
      const now = new Date();
      sendApi.send_text(senderId, `Il est ${now.getHours()}h${now.getMinutes()}`);
    } else {
      sendApi.send_text(senderId, 'Message reçu : ' + event_data.message.text);
    }
  }
});
```

### Exemple 2 : Envoi de contenu riche

```javascript
const { SendApi, Elements, Element, Buttons, Button, POSTBACK } = require('bot-messenger-node');

async function sendProductCard(recipientId) {
  const sendApi = new SendApi(PAGE_ACCESS_TOKEN);
  const elements = new Elements();

  const products = [
    {
      name: 'Premium Plan',
      subtitle: 'Pour les entreprises',
      image: 'https://example.com/premium.jpg',
      price: '$99/mois'
    },
    {
      name: 'Standard Plan',
      subtitle: 'Pour les petits business',
      image: 'https://example.com/standard.jpg',
      price: '$49/mois'
    }
  ];

  products.forEach(product => {
    const buttons = new Buttons();
    buttons.add_button(new Button(POSTBACK, "Choisir").get_content());
    buttons.add_button(new Button(POSTBACK, "En savoir plus").get_content());

    const element = new Element(
      product.name,
      `${product.subtitle} - ${product.price}`,
      product.image,
      buttons.get_content()
    );
    elements.add_element(element.get_content());
  });

  sendApi.send_generic(elements.get_content(), recipientId);
}
```

### Exemple 3 : Configuration complète du bot

```javascript
const { ProfileApi, PersistentMenu, Button, POSTBACK } = require('bot-messenger-node');

async function setupBot() {
  const profileApi = new ProfileApi(PAGE_ACCESS_TOKEN);

  // Configurer l'écran de bienvenue
  await profileApi.setWelcomeScreen('GET_STARTED_PAYLOAD', [
    { locale: 'default', text: 'Bienvenue {{user_full_name}} !' },
    { locale: 'fr_FR', text: 'Bonjour {{user_full_name}} !' }
  ]);

  // Configurer le menu persistant
  const menu = new PersistentMenu([
    new Button(POSTBACK, "📞 Contact").get_content(),
    new Button(POSTBACK, "❓ Aide").get_content(),
    new Button(POSTBACK, "🏠 Accueil").get_content()
  ]);

  await profileApi.setPersistentMenu(menu.get_content());
}
```

## API Reference

### SendApi Methods

| Méthode | Description |
|---------|-------------|
| `send_text(recipientId, message)` | Envoie un message texte |
| `send_image(url, recipientId)` | Envoie une image |
| `send_video(url, recipientId)` | Envoie une vidéo |
| `send_audio(url, recipientId)` | Envoie un fichier audio |
| `send_file(url, recipientId)` | Envoie un fichier |
| `send_generic(elements, recipientId)` | Envoie un template générique |
| `send_buttons(text, buttons, recipientId)` | Envoie un template avec boutons |
| `send_quick_replies(recipientId, quickReplies, messageText)` | Envoie avec réponses rapides |
| `typing_on_message(recipientId)` | Affiche "écrit..." |
| `typing_off_message(recipientId)` | Cache "écrit..." |
| `mark_seen(recipientId)` | Marque comme lu |

### ProfileApi Methods

| Méthode | Description |
|---------|-------------|
| `setWelcomeScreen(payload, greetings)` | Configure l'écran d'accueil |
| `setPersistentMenu(menu)` | Configure le menu persistant |
| `setUserPersistentMenu(userId, menu)` | Configure le menu pour un utilisateur |

### AttachmentUploadApi Methods

| Méthode | Description |
|---------|-------------|
| `sendRemoteImage(url)` | Upload image depuis URL |
| `sendRemoteVideo(url)` | Upload vidéo depuis URL |
| `sendRemoteAudio(url)` | Upload audio depuis URL |
| `sendRemoteFile(url)` | Upload fichier depuis URL |
| `sendLocalImage(path)` | Upload image depuis fichier local |
| `sendLocalVideo(path)` | Upload vidéo depuis fichier local |
| `sendLocalAudio(path)` | Upload audio depuis fichier local |
| `sendLocalFile(path)` | Upload fichier depuis local |

## Variables d'environnement

Configurez vos tokens via des variables d'environnement :

```bash
MESSENGER_VERIFY_TOKEN=votre_token_de_verification
MESSENGER_APP_SECRET=votre_app_secret
MESSENGER_PAGE_ACCESS_TOKEN=votre_page_access_token
PORT=3000
```

## Limitations & Points Importants

- Les user IDs retournés sont **page-scoped** (différents des app-scoped IDs de Facebook Login)
- Respectez les [politiques de Messenger](https://developers.facebook.com/docs/messenger-platform/policy/policy-overview)
- Certains messages nécessitent un `message_tag` pour l'envoi asynchrone
- Limite de 24h pour les messages utilisateur-initiés

## Dépannage

### Erreur "Invalid OAuth access token"
Vérifiez que votre token est valide et n'a pas expiré.

### Messages non livrés
Assurez-vous que :
1. L'utilisateur a interagi avec votre page
2. Votre webhook est bien configuré
3. Le token est correct

### Erreur de webhook
Vérifiez que `verify_token` correspond exactement entre votre code et la configuration Facebook.

## Développement

Pour contribuer ou modifier le package localement :

```bash
git clone https://github.com/laza-niaina/bot-messenger-node.git
cd bot-messenger-node
npm install
```

## License

MIT License - voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

**Auteur** : Laza Niaina  
**Support** : [GitHub Issues](https://github.com/laza-niaina/bot-messenger-node/issues)
