const axios = require('axios');
const assert = require('assert');

class SendApi {
  constructor(page_access_token, page_id = null) {
    this.__graph_version = '18.0';
    this.__def_api_url = `https://graph.facebook.com/v${this.__graph_version}/me`;
    this.__alt_api_url = page_id === null ? null : `https://graph.facebook.com/v${this.__graph_version}/${page_id}`;
    this.__page_id = page_id;
    this.__default_endpoint = '/messages';
    this.__page_access_token = page_access_token;
  }

  get_def_api_url() {
    return this.__def_api_url;
  }

  get_alt_api_url() {
    return this.__alt_api_url;
  }

  get_page_id() {
    return this.__page_id;
  }

  get_def_endpoint() {
    return this.__default_endpoint;
  }

  get_access_token() {
    return this.__page_access_token;
  }

  get_graph_version() {
    return this.__graph_version;
  }

 send_text(recipient_id, message, messaging_type = 'RESPONSE', notification_type = 'REGULAR', tag = null) {
  const request_body = {
    recipient: {
      id: recipient_id
    },
    message: {
      text: message
    }
  };
 /* if (messaging_type === 'MESSAGE_TAG') {
    if (['ACCOUNT_UPDATE', 'CONFIRMED_EVENT_UPDATE', 'CUSTOMER_FEEDBACK', 'HUMAN_AGENT', 'POST_PURCHASE_UPDATE'].includes(tag)) {
      request_body.tag = tag;
    } else {
      throw new Error("Value of param messaging_type must be 'ACCOUNT_UPDATE', 'CONFIRMED_EVENT_UPDATE', 'CUSTOMER_FEEDBACK', 'HUMAN_AGENT', or 'POST_PURCHASE_UPDATE'");
    }
  }*/
  try {
    const response = await axios.post(this.get_def_api_url() + this.get_def_endpoint(), request_body, {
      params: {
        access_token: this.get_access_token()
      }
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to send message: " + error.message);
  }
	    }

  send_image(attachment_url, recipient_id, is_reusable = 'false') {
    return this.__send_attachment('image', attachment_url, recipient_id, is_reusable);
  }

	send_video(attachment_url, recipient_id, is_reusable = 'false') {
			return this.__send_attachment('video', attachment_url, recipient_id, is_reusable);
		}

		send_audio(attachment_url, recipient_id, is_reusable = 'false') {
			return this.__send_attachment('audio', attachment_url, recipient_id, is_reusable);
		}

		send_file(attachment_url, recipient_id, is_reusable = 'false') {
			return this.__send_attachment('file', attachment_url, recipient_id, is_reusable);
		}

		send_generic(elements, recipient_id, image_aspect_ratio = 'horizontal', quick_replies = null) {
			const request_body = {
				recipient: {
					id: recipient_id
				},
				message: {
					attachment: {
						type: 'template',
						payload: {
							template_type: 'generic',
							image_aspect_ratio: image_aspect_ratio,
							elements: elements
						}
					}
				}
			};
			if (quick_replies !== null) {
				assert(Array.isArray(quick_replies), `type of param quick_replies must be a list , not ${typeof quick_replies}`);
				assert(quick_replies.length > 0, 'param quick_replies must be non empty');
				request_body.message.quick_replies = quick_replies;
			}
			return axios.post(this.get_def_api_url() + this.get_def_endpoint(),request_body, {
				params: {
					access_token: this.get_access_token()
				},
			});
		}

		mark_seen(recipient_id) {
			return this.__send_sender_actions('mark_seen', recipient_id);
		}

		typing_on_message(recipient_id) {
			return this.__send_sender_actions('typing_on', recipient_id);
		}

		typing_off_message(recipient_id) {
			return this.__send_sender_actions('typing_off', recipient_id);
		}

		send_buttons(text, buttons, recipient_id) {
			const request_body = {
				recipient: {
					id: recipient_id
				},
				message: {
					attachment: {
						type: 'template',
						payload: {
							template_type: 'button',
							text: text,
							buttons: buttons
						}
					}
				}
			};
			return axios.post(this.get_def_api_url() + this.get_def_endpoint(),request_body, {
				params: {
					access_token: this.get_access_token()
				}
			});
		}

	__send_sender_actions(sender_action, recipient_id) {
			if (this.get_alt_api_url() === null) {
					throw new Error("The page id is not defined for this instance.");
			}

			const request_body = {
					recipient: {
							id: recipient_id
					},
					sender_action: sender_action
			};

			return axios.post(
					this.get_alt_api_url() + this.get_def_endpoint(),request_body,
					{
							params: {
									access_token: this.get_access_token()
							}
					});
	}

	__send_saved(attachment_id, attachment_type, recipient_id) {
			const request_body = {
					recipient: {
							id: recipient_id
					},
					message: {
							attachment: {
									type: attachment_type,
									payload: {
											attachment_id: attachment_id
									}
							}
					}
			};

			return axios.post(
					this.get_def_api_url() + this.get_def_endpoint(),request_body,
					{
							params: {
									access_token: this.get_access_token()
							}
					})
	}

	__send_local(asset_type, file_location, recipient_id, is_reusable = "true", mimetype = null) {
	
			console.log(mimetype);

			const request_body = new MultipartEncoder({
					recipient: { id: recipient_id },
					message: {
							attachment: {
									type: asset_type,
									payload: {
											is_reusable: is_reusable
									}
							}
					},
					filedata: fs.createReadStream(file_location),
					mimetype: mimetype
			});
			const headers = {
					"content-type": request_body.getContentType()
			};

			return axios(
					this.get_def_api_url() + this.get_def_endpoint(),
					{method:"POST",
							params: {
									access_token: this.get_access_token()
							},
							data: request_body,
							headers: headers
					}).json();
	}

	__send_attachment(attachment_type, attachment_url, recipient_id, is_reusable = "false") {
			const request_body = {
					recipient: {
							id: recipient_id
					},
					message: {
							attachment: {
									type: attachment_type,
									payload: {
											url: attachment_url,
											is_reusable: is_reusable
									}
							}
					}
			};

			return axios.post(
					this.get_def_api_url() + this.get_def_endpoint(),request_body,
					{
							params: {
									access_token: this.get_access_token()
							}
					})
	}
async send_quick_replies(recipientId, quickReplies,messageText="Choose options: ") {
    const messageData = {
        recipient: {
            id: recipientId,
        },
        message: {
            text: messageText,
            quick_replies: quickReplies
        },
    };
			return await axios(this.__def_api_url+"/messages",
					{method:"POST",
						params: {
									access_token: this.get_access_token()
							},data:messageData});
	
	
}
send_batch_image(image_urls, recipient_id) {
			if (this.get_page_id() === null) {
					throw new Error("The page id is not defined for this instance.");
			}

			const batch_request_body = [];
			for (let image_url of image_urls) {
					const request_body = {
							method: "POST",
							relative_url: `${this.get_page_id()}` + this.get_def_endpoint(),
							body: new URLSearchParams({
									recipient: { id: recipient_id },
									message: {
											attachment: {
													type: "image",
													payload: {
															url: image_url,
															is_reusable: "true"
													}
											}
									}
							}).toString()
					};
					batch_request_body.push(request_body);
			}
			const request_body = {
					batch: batch_request_body
			};

			return axios.post(
					`https://graph.facebook.com/${this.get_graph_version()}`,
					{
							params: {
									access_token: this.get_access_token()
							},
					 request_body
					});
	}
}

module.exports = {SendApi};
