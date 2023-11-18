class ApiException extends Error {
  constructor(message = '', code = 0, apiError = null) {
    super(message);
    this.name = 'ApiException';
    this.code = code;
    this.apiError = apiError;
  }

  /**
   * Get the API error information
   * @return {mixed|null}
   */
  getApiError() {
    return this.apiError;
  }
}

module.exports = ApiException;
