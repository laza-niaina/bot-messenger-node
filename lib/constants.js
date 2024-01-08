const API_VERSION = "18.0";

class ButtonType {

		static get POSTBACK() {
				return "postback";
		}

		static get WEB_URL() {
				return "web_url";
		}
}

class MessagingType {

		static get RESPONSE() {
				return "RESPONSE";
		}

		static get UPDATE() {
				return "UPDATE";
		}

		static get MESSAGE_TAG() {
				return "MESSAGE_TAG";
		}
}

class NotificationType {

		static get REGULAR() {
				return "REGULAR";
		}

		static get SILENT_PUSH() {
				return "SILENT_PUSH";
		}

		static get NO_PUSH() {
				return "NO_PUSH";
		}
}

class SenderAction {
		static get MARK_SEEN() {
				return "mark_seen";
		}

		static get TYPING_ON() {
				return "typing_on";
		}

		static get TYPING_OFF() {
				return "typing_off";
		}
}

class MessageTag {
		static get ACCOUNT_UPDATE() {
				return "ACCOUNT_UPDATE";
		}

		static get CONFIRMED_EVENT_UPDATE() {
				return "CONFIRMED_EVENT_UPDATE";
		}

		static get CUSTOMER_FEEDBACK() {
				return "CUSTOMER_FEEDBACK";
		}

		static get HUMAN_AGENT() {
				return "HUMAN_AGENT";
		}

		static get POST_PURCHASE_UPDATE() {
				return "POST_PURCHASE_UPDATE";
		}
}

module.exports = {
		API_VERSION,
		ButtonType,
		MessagingType,
		NotificationType,
		SenderAction,
		MessageTag,
};
