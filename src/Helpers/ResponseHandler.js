class ResponseHandler {
  /**
   * @param {Object} response
   * @return {Object}
   */
  decodeResponse(response) {
    return JSON.parse(response.body.toString());
  }
}

module.exports = ResponseHandler;
