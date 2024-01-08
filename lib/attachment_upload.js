const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

const API_VERSION = '16.0';

class AttachmentsendApi {
		constructor(pageAccessToken) {
				this.graphVersion = API_VERSION;
				this.apiUrl = `https://graph.facebook.com/v${this.graphVersion}/me/message_attachments`;
				this.pageAccessToken = pageAccessToken;
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

		sendRemoteImage(imageUrl) {
				return this.sendRemoteAttachment('image', imageUrl);
		}

		sendRemoteVideo(videoUrl) {
				return this.sendRemoteAttachment('video', videoUrl);
		}

		sendRemoteAudio(audioUrl) {
				return this.sendRemoteAttachment('audio', audioUrl);
		}

		sendRemoteFile(fileUrl) {
				return this.sendRemoteAttachment('file', fileUrl);
		}

		sendLocalImage(imageLocation) {
				return this.sendLocalAttachment('image', imageLocation);
		}

		sendLocalVideo(videoLocation) {
				return this.sendLocalAttachment('video', videoLocation);
		}

		sendLocalAudio(audioLocation) {
				return this.sendLocalAttachment('audio', audioLocation);
		}

		sendLocalFile(fileLocation) {
				return this.sendLocalAttachment('file', fileLocation);
		}

		async sendLocalAttachment(assetType, fileLocation) {
				const mimetype = fileLocation.endsWith('.pdf') ? 'application/octet-stream' : 'image/png';

				const form = new FormData();
				form.append('message', JSON.stringify({
						attachment: {
								type: assetType,
								payload: {
										is_reusable: true,
								},
						},
				}));
				form.append('filedata', fs.createReadStream(fileLocation), { filename: fileLocation, contentType: mimetype });

				const headers = {
						...form.getHeaders(),
						'content-type': 'multipart/form-data',
				};

				const response = await axios.post(`${this.getApiUrl()}?access_token=${this.getAccessToken()}`, form, { headers });
				return response.data.attachment_id;
		}

		async sendRemoteAttachment(assetType, fileUrl) {
				const requestBody = {
						message: {
								attachment: {
										type: assetType,
										payload: {
												is_reusable: true,
												url: fileUrl,
										},
								},
						},
				};

				const response = await axios.post(`${this.getApiUrl()}?access_token=${this.getAccessToken()}`, requestBody);
				return response.data.attachment_id;
		}
}
module.exports={AttachmentsendApi};