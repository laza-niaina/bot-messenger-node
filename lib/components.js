const { ButtonType } = require('./constants');

class Elements {
		constructor() {
				this.elements = [];
		}

		add_element(element) {
				this.elements.push(element);
		}

		get_content() {
				return this.elements;
		}
}
class Element {
		constructor(title = "An element of a generic message.", subtitle = null, image_url = null, buttons = []) {
				// Validate input types
				if (typeof title !== 'string') {
						throw new Error(`Type of param title must be string, not ${typeof title}`);
				}

				if (title === "") {
						throw new Error("Param title must be non-empty");
				}

				this.__title = title;
				this.__subtitle = subtitle;
				this.__image_url = image_url;
				this.__buttons = buttons || [];

				if (this.__image_url === null || this.__buttons.length === 0) {
						console.warn("WARNING: Param image_url and buttons must be non-empty.");
				}
		}

		set_title(title) {
				if (typeof title !== 'string') {
						throw new Error(`Type of param title must be string, not ${typeof title}`);
				}

				if (title === "") {
						throw new Error("Param title must be non-empty");
				}

				this.__title = title;
		}

		set_subtitle(subtitle) {
				if (typeof subtitle !== 'string') {
						throw new Error(`Type of param subtitle must be string, not ${typeof subtitle}`);
				}

				this.__subtitle = subtitle;
		}

		set_image_url(image_url) {
				if (typeof image_url !== 'string') {
						throw new Error(`Type of param image_url must be string, not ${typeof image_url}`);
				}

				this.__image_url = image_url;
		}

		add_button(button) {
				if (!button || typeof button !== 'object') {
						throw new Error(`Type of param button must be object, not ${typeof button}`);
				}

				this.__buttons.push(button);
		}

		get_content() {
				if (this.__subtitle === null) {
						return {
								title: this.__title,
								image_url: this.__image_url,
								buttons: this.__buttons
						};
				}

				return {
						title: this.__title,
						subtitle: this.__subtitle,
						image_url: this.__image_url,
						buttons: this.__buttons
				};
		}
}
class Buttons {
		/**
		 * A list of Button objects.
		 * @constructor
		 */
		constructor() {
				this.__buttons = [];
		}

		/**
		 * Add a Button object's content to the list.
		 * @param {object} button - The content of the Button object.
		 */
		add_button(button) {
				if (!button || typeof button !== 'object') {
						throw new Error(`Type of param button must be object, not ${typeof button}`);
				}

				this.__buttons.push(button);
		}

		get_content() {
				return this.__buttons;
		}
}
class Button {
		constructor(button_type = ButtonType.POSTBACK, title = "Button") {
				this.__type = button_type;
				this.__title = title;

				if (this.__type === ButtonType.POSTBACK) {
						this.__payload = "<DEVELOPER_DEFINED_PAYLOAD>";
				} else if (this.__type === ButtonType.WEB_URL) {
						this.__url = "<DEVELOPER_DEFINED_URL>";
				}
		}

		set_title(title) {
				this.__title = title;
		}

		set_payload(payload) {
				this.__payload = payload;
		}

		set_url(url) {
				this.__url = url;
		}

		get_content() {
				if (this.__type === ButtonType.POSTBACK) {
						return {
								"type": this.__type,
								"title": this.__title,
								"payload": this.__payload
						};
				}
				return {
						"type": this.__type,
						"title": this.__title,
						"url": this.__url
				};
		}
}

class QuickReplies {
		constructor() {
				this.__quick_replies = [];
		}

		add_quick_reply(quick_reply) {
				this.__quick_replies.push(quick_reply);
		}

		get_content() {
				return this.__quick_replies;
		}
}

class QuickReply {
		constructor(title = "Quick reply", payload = "<DEVELOPER_DEFINED_PAYLOAD>", image_url) {
				this.title = title;
				this.payload = payload;
				this.image_url = image_url;
		}

		set_title(title) {
				this.title = title;
		}

		set_payload(payload) {
				this.payload = payload;
		}

		set_image_url(image_url) {
				this.image_url = image_url;
		}

		get_content() {
				if (this.image_url === null) {
						return {
			          "content_type": "text",
								"title": this.title,
								"payload": this.payload
						};
				}
				return {
						"content_type": "text",
						"title": this.title,
						"payload": this.payload,
						"image_url": this.image_url
				};
		}
}

class PersistentMenu {
		constructor(default_locale_menu) {
				this.__persistent_menus = [
						{
								"locale": "default",
								"composer_input_disabled": "false",
								"call_to_actions": default_locale_menu
						}
				];
		}

		add_locale(language_code, menu) {
				this.__persistent_menus.push({
						"locale": language_code,
						"composer_input_disabled": "false",
						"call_to_actions": menu
				});
		}

		get_content() {
				return this.__persistent_menus;
		}
}
module.exports = {
	Elements,
	Element,
	Button,
	Buttons,
	QuickReplies,
	QuickReply,
	PersistentMenu
};