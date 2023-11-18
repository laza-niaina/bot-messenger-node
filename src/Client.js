const axios = require('axios');

class Client {
  /**
   * API BASE URI
   */
  static API_BASE_URI = 'https://graph.facebook.com/';

  /**
   * API VERSION
   */
  static API_VERSION = 'v18.0';

  /**
   * Request default timeout
   */
  static DEFAULT_TIMEOUT = 60;

  /**
   * Request default file upload timeout
   */
  static DEFAULT_FILE_UPLOAD_TIMEOUT = 500;

  /**
   * @var array
   */
  static allowedMethod = ['POST', 'GET'];

  /**
   * Page ACCESS TOKEN
   *
   * @var string
   */
  constructor(accessToken, httpClient = null) {
    this.accessToken = accessToken;
    this.client = httpClient || this.defaultHttpClient();
  }

  async send(method, uri, options = {}, body = null, query = {}, headers = {}) {
    const axiosOptions = this.buildOptions(body, query, headers, options);

    try {
      const response = await axios.request({
        method,
        url: `${Client.API_BASE_URI}${Client.API_VERSION}/${uri}`,
        ...axiosOptions,
      });

      this.lastResponse = response;
      this.validateResponse(response);

      return response;
    } catch (error) {
      throw new Error(`API Error: ${error.message}`);
    }
  }

  /**
   * @param {Object} response
   *
   * @throws {Error}
   */
  validateResponse(response) {
    if (response.status !== 200) {
      const responseData = response.data;
      const code = responseData?.error?.code || 0;
      const message = responseData?.error?.message || response.statusText;

      throw new Error(`API Error: ${message} (Code: ${code})`);
    }
  }

  /**
   * Get the last response from the API
   *
   * @return {Object|null}
   */
  getLastResponse() {
    return this.lastResponse;
  }

  /**
   * @return {Object}
   */
  getHttpClient() {
    return this.client;
  }

  /**
   * Build Options for the request
   *
   * @param {mixed} body
   * @param {Object} query
   * @param {Object} headers
   * @param {Object} options
   * @return {Object}
   */
  buildOptions(body = null, query = {}, headers = {}, options = {}) {
    // ADD Token
    query.access_token = query.access_token || this.accessToken;

    if (Array.isArray(body)) {
      body = JSON.stringify(body);
      headers['Content-Type'] = 'application/json';
    }

    return {
      data: body,
      params: query,
      headers,
      ...options,
    };
  }

  /**
   * Default HttpClient for Facebook
   *
   * @return {Object}
   */
  defaultHttpClient() {
    return axios.create({
      baseURL: `${Client.API_BASE_URI}${Client.API_VERSION}`,
      timeout: Client.DEFAULT_TIMEOUT,
    });
  }
}