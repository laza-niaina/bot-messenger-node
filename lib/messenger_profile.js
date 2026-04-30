const axios = require('axios');
const { API_VERSION } = require('./constants');

class ProfileApi {
		constructor(pageAccessToken) {
				this.graphVersion = API_VERSION;
				this.apiUrl = `https://graph.facebook.com/v${this.graphVersion}/me`;
				this.pageAccessToken = pageAccessToken;
				this.globalLevelEndpoint = "/messenger_profile";
				this.userLevelEndpoint = "/custom_user_settings";
		}

		getApiUrl() {
				return this.apiUrl;
		}

		getAccessToken() {
				return this.pageAccessToken;
		}

		getGraphVersion() {
				return this.graphVersion;
		}

		setWelcomeScreen(getStartedButtonPayload, greetings = null) {
				greetings = greetings || [
						{ "locale": "default", "text": "Welcome, {{user_full_name}}!" }
				];

				const requestBody = {
						get_started: {
								payload: getStartedButtonPayload
						},
						greeting: greetings
				};

				return axios.post(
						`${this.getApiUrl()}${this.globalLevelEndpoint}`,
						{ params: { access_token: this.getAccessToken() } },
						{ json: requestBody }
				).then(response => response.data);
		}

		setUserPersistentMenu(userId, persistentMenu) {
				return axios.post(
						`${this.getApiUrl()}${this.userLevelEndpoint}`,
						{ params: { access_token: this.getAccessToken() } },
						{
								json: {
										psid: userId,
										persistent_menu: persistentMenu
								}
						}
				).then(response => response.data);
		}

		setPersistentMenu(persistentMenu) {
				return axios.post(
						`${this.getApiUrl()}${this.globalLevelEndpoint}`,
						{ params: { access_token: this.getAccessToken() } },
						{ json: { persistent_menu: persistentMenu } }
				).then(response => response.data);
		}
}

module.exports = {ProfileApi};
